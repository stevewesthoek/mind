"""
Lambda: Update Status
Updates metadata/status.json with current assembly status.
"""
import json
import boto3
from datetime import datetime

s3_client = boto3.client('s3')

BUCKET = 'prochat-video-dev-909439522876-eu-north-1-an'


def lambda_handler(event, context):
    """
    Update metadata/status.json with current status.

    Expected input:
    {
      "jobId": "test-001",
      "status": "assembling" or "complete",
      "assemblyStartedAt": ISO timestamp (optional),
      "assemblyCompletedAt": ISO timestamp (optional),
      "mediaConvertJobId": string (optional)
    }
    """
    job_id = event.get('jobId')
    status = event.get('status')

    if not job_id or not status:
        raise ValueError('jobId and status are required')

    try:
        status_key = f'jobs/{job_id}/metadata/status.json'

        # Read current status.json
        try:
            response = s3_client.get_object(Bucket=BUCKET, Key=status_key)
            status_data = json.loads(response['Body'].read().decode('utf-8'))
        except s3_client.exceptions.NoSuchKey:
            # Initialize if doesn't exist
            status_data = {
                'jobId': job_id,
                'status': 'pending'
            }

        # Update status
        status_data['status'] = status
        status_data['updatedAt'] = datetime.utcnow().isoformat() + 'Z'

        # Add optional fields
        if 'assemblyStartedAt' in event:
            status_data['assemblyStartedAt'] = event['assemblyStartedAt']

        if 'assemblyCompletedAt' in event:
            status_data['assemblyCompletedAt'] = event['assemblyCompletedAt']

        if 'mediaConvertJobId' in event:
            status_data['mediaConvertJobId'] = event['mediaConvertJobId']

        # Write updated status.json back to S3
        s3_client.put_object(
            Bucket=BUCKET,
            Key=status_key,
            Body=json.dumps(status_data, indent=2),
            ContentType='application/json'
        )

        return {
            'jobId': job_id,
            'status': status,
            'updated': True,
            'statusData': status_data
        }

    except Exception as e:
        raise Exception(f'Failed to update status: {str(e)}')
