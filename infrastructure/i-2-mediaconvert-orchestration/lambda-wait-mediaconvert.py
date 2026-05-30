"""
Lambda: Wait for MediaConvert Completion
Polls MediaConvert job status until completion or failure.
"""
import json
import os
import boto3
import time

# Read MediaConvert endpoint from environment
MEDIACONVERT_ENDPOINT = os.environ.get('MEDIACONVERT_ENDPOINT')
if not MEDIACONVERT_ENDPOINT:
    raise RuntimeError(
        'MEDIACONVERT_ENDPOINT environment variable not set. '
        'Set via: aws lambda update-function-configuration '
        '--function-name video-orchestrator-wait-mediaconvert '
        '--environment Variables={MEDIACONVERT_ENDPOINT=...}'
    )

mediaconvert_client = boto3.client('mediaconvert', endpoint_url=MEDIACONVERT_ENDPOINT)


def lambda_handler(event, context):
    """
    Poll MediaConvert job until completion.

    Expected input:
    {
      "mediaConvertJobId": "string",
      "jobId": "test-001",
      "maxAttempts": 120,
      "delaySeconds": 5
    }
    """
    mediaconvert_job_id = event.get('mediaConvertJobId')
    job_id = event.get('jobId')
    max_attempts = event.get('maxAttempts', 120)
    delay_seconds = event.get('delaySeconds', 5)

    if not mediaconvert_job_id:
        raise ValueError('mediaConvertJobId is required')

    try:
        attempt = 0
        while attempt < max_attempts:
            # Get job status
            response = mediaconvert_client.get_job(Id=mediaconvert_job_id)
            job = response['Job']
            status = job['Status']

            if status == 'COMPLETE':
                return {
                    'jobId': job_id,
                    'mediaConvertJobId': mediaconvert_job_id,
                    'status': status,
                    'completed': True,
                    'attempts': attempt + 1
                }

            elif status == 'FAILED':
                error_msg = job.get('ErrorMessage', 'Unknown error')
                raise Exception(f'MediaConvert job failed: {error_msg}')

            elif status in ['CANCELED', 'CANCELING']:
                raise Exception(f'MediaConvert job was canceled: {status}')

            # Job still processing, wait and retry
            attempt += 1
            if attempt < max_attempts:
                time.sleep(delay_seconds)

        # Max attempts reached
        raise Exception(f'MediaConvert job did not complete within {max_attempts} attempts ({max_attempts * delay_seconds} seconds)')

    except Exception as e:
        raise Exception(f'Failed waiting for MediaConvert job: {str(e)}')
