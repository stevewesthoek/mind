# I-4 Thumbnail Generation Blocker

## Status
BLOCKED - Nova Canvas API payload incompatible in current Bedrock version

## Investigation

### Available models:
- **eu-north-1:** No image generation models
- **us-east-1:** 
  - amazon.nova-canvas-v1:0 ✅ Available
  - amazon.titan-image-generator-v2:0 ✅ Available
  - stability.stable-*-v1:0 ✅ Multiple Stable Diffusion variants

### Attempted approach:
Cross-region generation (us-east-1) + canonical storage (eu-north-1), similar to I-3 video generation.

### Blocker:
Nova Canvas API validation fails with:
```
ValidationException: Malformed input request, please reformat your input and try again.
```

Tested payloads:
1. TEXT_TO_IMAGE with standard payload → FAIL (validation error)
2. Standard JSON with taskType and textToImageParams → FAIL

The exact API contract for Nova Canvas invoke-model is not clear from error messages.

## Known working approaches:
- Stable Image Upscale (takes existing image, requires input upload)
- Titan Image Generator v2 (likely different API format)
- Local thumbnail extraction from generated video via MediaConvert snapshot (alternative approach)

## Alternative approaches to pursue:
1. Extract frame from generated-001.mp4 at 3-second mark using ffmpeg
   - Files already exist in S3
   - ffmpeg can extract, resize, upload
   - Does not require new Bedrock model access
   
2. Use Titan Image Generator v2 in us-east-1
   - Different API contract, might have better docs
   - Same cross-region approach as Nova Canvas
   
3. Use MediaConvert snapshot feature
   - MediaConvert can extract frames during transcode
   - Deferred but viable for future

## Recommendation:
For MVP, use **video frame extraction** instead of text-to-image generation:
- Extract frame at 3-second mark from generated-001.mp4
- Resize to 1280x720 for YouTube
- No additional service access needed
- Faster development
- Proves thumbnail storage/metadata contract

## Blockers to resolve:
If proceeding with Bedrock image generation:
- Clarify Nova Canvas API payload format
- Or switch to Stable Image Upscale (requires input image)
- Or switch to Titan Image Generator v2 (different contract)
