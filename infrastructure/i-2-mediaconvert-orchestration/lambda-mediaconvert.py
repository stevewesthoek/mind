"""
Lambda: Trigger MediaConvert Job
Creates and submits a MediaConvert job for final assembly.
"""
import json
import boto3

mediaconvert_client = boto3.client('mediaconvert', endpoint_url='https://abcdef1234567.mediaconvert.eu-north-1.amazonaws.com')


def lambda_handler(event, context):
    """
    Create and submit MediaConvert job for final assembly.

    Expected input:
    {
      "jobId": "test-001",
      "videoInput": "s3://bucket/path/video.mp4",
      "audioInput": "s3://bucket/path/audio.mp3",
      "outputPath": "s3://bucket/path/",
      "outputFilename": "test-001-final.mp4"
    }
    """
    job_id = event.get('jobId')
    video_input = event.get('videoInput')
    audio_input = event.get('audioInput')
    output_path = event.get('outputPath')
    output_filename = event.get('outputFilename')

    required = ['jobId', 'videoInput', 'audioInput', 'outputPath', 'outputFilename']
    if not all(k in event for k in required):
        raise ValueError(f'Missing required fields: {required}')

    try:
        # MediaConvert job settings
        # Extract base name from output filename to use with NameModifier
        # MediaConvert uses NameModifier to append to input name, not direct Filename
        name_modifier = output_filename.replace('.mp4', '')

        job_settings = {
            'TimecodeConfig': {
                'Source': 'ZEROBASED'
            },
            'Inputs': [
                {
                    'FileInput': video_input,
                    'AudioSelectors': {
                        'Audio Selector 1': {
                            'DefaultSelection': 'NOT_DEFAULT'
                        }
                    },
                    'VideoSelector': {
                        'Rotate': 'DEGREE_0'
                    }
                },
                {
                    'FileInput': audio_input
                }
            ],
            'OutputGroups': [
                {
                    'Name': 'File Group',
                    'Outputs': [
                        {
                            'NameModifier': '-final',
                            'VideoDescription': {
                                'CodecSettings': {
                                    'H264Settings': {
                                        'MaxBitrate': 5000000,
                                        'FramerateDenominator': 1,
                                        'FramerateNumerator': 30,
                                        'RateControlMode': 'VBR'
                                    }
                                }
                            },
                            'AudioDescriptions': [
                                {
                                    'CodecSettings': {
                                        'AacSettings': {
                                            'Bitrate': 128000,
                                            'SampleRate': 48000,
                                            'CodingMode': 'CODING_MODE_2_0'
                                        }
                                    }
                                }
                            ],
                            'ContainerSettings': {
                                'Container': 'MP4'
                            }
                        }
                    ],
                    'OutputGroupSettings': {
                        'Type': 'FILE_GROUP_SETTINGS',
                        'FileGroupSettings': {
                            'Destination': output_path
                        }
                    }
                }
            ]
        }

        # Submit job (do not pass JobTemplate if not using one)
        response = mediaconvert_client.create_job(
            Queue='default',
            UserMetadata={
                'jobId': job_id,
                'phase': 'i-2'
            },
            Role='arn:aws:iam::909439522876:role/video-orchestrator-role',
            Settings=job_settings
        )

        mediaconvert_job_id = response['Job']['Id']

        return {
            'jobId': job_id,
            'mediaConvertJobId': mediaconvert_job_id,
            'status': response['Job']['Status'],
            'created': True
        }

    except Exception as e:
        raise Exception(f'Failed to create MediaConvert job: {str(e)}')
