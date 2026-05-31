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
    Uses expectedOutputKey from MediaConvert Lambda if available.
    Falls back to checking multiple possible output names if expectedOutputKey missing.

    Expected input (from MediaConvert Lambda):
    {
      "jobId": "test-001",
      "outputPath": "s3://bucket/path/dir/",
      "expectedOutputKey": "s3://bucket/path/dir/generated-001-final.mp4"  (optional)
    }

    Fallback checks:
    - expectedOutputKey if provided
    - generated-001-final.mp4, sample-transcoded-final.mp4
    """
    job_id = event.get('jobId')
    output_dir = event.get('outputPath')
    expected_output_key = event.get('expectedOutputKey')

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
        dest_prefix = parts[1].rstrip('/')

        # Determine which output file to verify
        source_key = None

        if expected_output_key:
            # expectedOutputKey from MediaConvert Lambda (e.g., s3://bucket/path/generated-001-final.mp4)
            source_key = expected_output_key.replace(f's3://{bucket}/', '')
        else:
            # Fallback: check multiple possible output names
            possible_outputs = [
                f'{dest_prefix}/generated-001-final.mp4',
                f'{dest_prefix}/sample-transcoded-final.mp4'
            ]

            for candidate_key in possible_outputs:
                try:
                    s3_client.head_object(Bucket=bucket, Key=candidate_key)
                    source_key = candidate_key
                    break
                except s3_client.exceptions.NoSuchKey:
                    pass

            if not source_key:
                raise Exception(
                    f'MediaConvert output not found in any expected location: {possible_outputs}'
                )

        # Verify source output exists and is not empty
        try:
            response = s3_client.head_object(Bucket=bucket, Key=source_key)
            file_size = response['ContentLength']

            if file_size == 0:
                raise Exception(f'Output file is empty: s3://{bucket}/{source_key}')

            return {
                'jobId': job_id,
                'mediaconvertOutput': f's3://{bucket}/{source_key}',
                'exists': True,
                'fileSize': file_size,
                'lastModified': response['LastModified'].isoformat(),
                'contentType': response.get('ContentType', 'video/mp4'),
                'verified': True
            }

        except s3_client.exceptions.NoSuchKey:
            raise Exception(f'MediaConvert output not found: s3://{bucket}/{source_key}')

    except Exception as e:
        raise Exception(f'Failed to verify output: {str(e)}')
