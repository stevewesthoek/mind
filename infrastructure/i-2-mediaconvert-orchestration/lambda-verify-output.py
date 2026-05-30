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

    Expected input:
    {
      "jobId": "test-001",
      "outputPath": "s3://bucket/path/file.mp4"
    }
    """
    job_id = event.get('jobId')
    output_s3_path = event.get('outputPath')

    if not job_id or not output_s3_path:
        raise ValueError('jobId and outputPath are required')

    try:
        # Parse S3 path
        # Format: s3://bucket/path/to/file.mp4
        parts = output_s3_path.replace('s3://', '').split('/', 1)
        if len(parts) != 2:
            raise ValueError(f'Invalid S3 path format: {output_s3_path}')

        bucket = parts[0]
        key = parts[1]

        # Check if file exists
        response = s3_client.head_object(Bucket=bucket, Key=key)

        file_size = response['ContentLength']
        last_modified = response['LastModified'].isoformat()
        content_type = response.get('ContentType', 'unknown')

        if file_size == 0:
            raise Exception(f'Output file is empty: {output_s3_path}')

        return {
            'jobId': job_id,
            'outputPath': output_s3_path,
            'exists': True,
            'fileSize': file_size,
            'lastModified': last_modified,
            'contentType': content_type,
            'verified': True
        }

    except s3_client.exceptions.NoSuchKey:
        raise Exception(f'Output file not found: {output_s3_path}')
    except Exception as e:
        raise Exception(f'Failed to verify output: {str(e)}')
