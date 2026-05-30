"""
Lambda: Verify Output
Verifies that the final output file exists and is accessible.
"""
import json
import boto3

s3_client = boto3.client('s3')


def lambda_handler(event, context):
    """
    Verify output file exists and is accessible.
    Rename MediaConvert output from 'sample-transcoded-final.mp4' to 'jobId-final.mp4'.

    Expected input:
    {
      "jobId": "test-001",
      "outputPath": "s3://bucket/path/dir/"  (directory destination)
    }
    """
    job_id = event.get('jobId')
    output_dir = event.get('outputPath')

    if not job_id or not output_dir:
        raise ValueError('jobId and outputPath are required')

    try:
        # Parse S3 destination directory
        # Format: s3://bucket/path/to/dir/
        dest_str = output_dir.replace('s3://', '')
        parts = dest_str.split('/', 1)
        if len(parts) != 2:
            raise ValueError(f'Invalid S3 path format: {output_dir}')

        bucket = parts[0]
        dest_prefix = parts[1]

        # MediaConvert output name based on input + NameModifier
        # Input: sample-transcoded.mp4, NameModifier: -final
        # Output: sample-transcoded-final.mp4
        mediaconvert_output = 'sample-transcoded-final.mp4'
        desired_output = f'{job_id}-final.mp4'

        source_key = f'{dest_prefix}{mediaconvert_output}'
        target_key = f'{dest_prefix}{desired_output}'

        # Check if MediaConvert output exists
        try:
            response = s3_client.head_object(Bucket=bucket, Key=source_key)
            file_size = response['ContentLength']

            if file_size == 0:
                raise Exception(f'Output file is empty: s3://{bucket}/{source_key}')

            # Copy to desired name (S3 copy is atomic rename operation)
            s3_client.copy_object(
                CopySource={'Bucket': bucket, 'Key': source_key},
                Bucket=bucket,
                Key=target_key
            )

            # Verify target file exists
            target_response = s3_client.head_object(Bucket=bucket, Key=target_key)
            target_size = target_response['ContentLength']
            last_modified = target_response['LastModified'].isoformat()
            content_type = target_response.get('ContentType', 'video/mp4')

            # Delete source if rename was successful
            s3_client.delete_object(Bucket=bucket, Key=source_key)

            return {
                'jobId': job_id,
                'mediaconvertOutput': f's3://{bucket}/{source_key}',
                'finalOutput': f's3://{bucket}/{target_key}',
                'exists': True,
                'fileSize': target_size,
                'lastModified': last_modified,
                'contentType': content_type,
                'renamed': True,
                'verified': True
            }

        except s3_client.exceptions.NoSuchKey:
            raise Exception(f'MediaConvert output not found: s3://{bucket}/{source_key}')

    except Exception as e:
        raise Exception(f'Failed to verify/rename output: {str(e)}')
