"""
Lambda: Trigger MediaConvert frame capture for thumbnail generation (I-4.2)
Runs AFTER successful video assembly (I-3) to extract thumbnail frames.
Separate job from main video assembly (lower risk).
"""
import json
import os
import boto3

mediaconvert_client = boto3.client('mediaconvert', region_name='eu-north-1')
s3_client = boto3.client('s3', region_name='eu-north-1')


def lambda_handler(event, context):
    """
    Create a MediaConvert frame capture job for thumbnail generation.

    Expected input from Step Functions:
    {
      "jobId": "test-001",
      "videoKey": "jobs/test-001/exports/generated-001-final.mp4",
      "bucket": "prochat-video-dev-909439522876-eu-north-1-an",
      "mediaConvertJobId": "1780237282541-8af0jq",
      "status": "complete"
    }

    Output: Frame capture job ID and thumbnail output location
    """
    job_id = event.get('jobId')
    video_key = event.get('videoKey')
    bucket = event.get('bucket')

    if not all([job_id, video_key, bucket]):
        raise ValueError(f'Missing required fields: jobId, videoKey, bucket')

    print(f'Creating frame capture job for: {job_id}')
    print(f'Input video: s3://{bucket}/{video_key}')

    # Get MediaConvert endpoint
    endpoints = mediaconvert_client.describe_endpoints()
    endpoint_url = endpoints['Endpoints'][0]['Url']
    print(f'MediaConvert endpoint: {endpoint_url}')

    # Get working role from environment or event
    role_arn = os.getenv('MEDIACONVERT_ROLE') or event.get('roleArn')
    if not role_arn:
        raise ValueError('MEDIACONVERT_ROLE environment variable or roleArn not provided')

    # Thumbnail output directory: jobs/{jobId}/thumbnails/
    thumbnail_output_prefix = f'jobs/{job_id}/thumbnails/'

    # Frame capture job settings
    job_settings = {
        'Inputs': [
            {
                'FileInput': f's3://{bucket}/{video_key}'
            }
        ],
        'OutputGroups': [
            {
                'Name': 'Frame Captures',
                'OutputGroupSettings': {
                    'Type': 'FILE_GROUP_SETTINGS',
                    'FileGroupSettings': {
                        'Destination': f's3://{bucket}/{thumbnail_output_prefix}'
                    }
                },
                'Outputs': [
                    {
                        'NameModifier': '-frame',
                        'ContainerSettings': {
                            'Container': 'RAW'
                        },
                        'VideoDescription': {
                            'CodecSettings': {
                                'Codec': 'FRAME_CAPTURE',
                                'FrameCaptureSettings': {
                                    'FramerateNumerator': 1,
                                    'FramerateDenominator': 1,
                                    'MaxCaptures': 4
                                }
                            },
                            'Width': 1280,
                            'Height': 720
                        }
                    }
                ]
            }
        ],
        'TimecodeConfig': {
            'Source': 'ZEROBASED'
        }
    }

    try:
        # Create job with custom endpoint
        mc = boto3.client('mediaconvert', region_name='eu-north-1', endpoint_url=endpoint_url)
        response = mc.create_job(
            Role=role_arn,
            Settings=job_settings
        )

        thumbnail_job_id = response['Job']['Id']
        status = response['Job']['Status']

        print(f'✓ Frame capture job created: {thumbnail_job_id}')
        print(f'  Status: {status}')
        print(f'  Output prefix: {thumbnail_output_prefix}')

        return {
            'jobId': job_id,
            'thumbnailJobId': thumbnail_job_id,
            'thumbnailJobStatus': status,
            'thumbnailOutputPrefix': thumbnail_output_prefix,
            'preferredFrame': f'{thumbnail_output_prefix}*.0000002.jpg',
            'normalizedThumbnailKey': f'jobs/{job_id}/thumbnails/thumbnail-001.jpg',
            'status': 'frame_capture_triggered'
        }

    except Exception as e:
        error_message = f'Failed to create frame capture job: {str(e)}'
        print(f'✗ Error: {error_message}')
        raise Exception(error_message)
