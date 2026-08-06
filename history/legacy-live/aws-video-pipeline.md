---
type: dashboard
status: active
---

# AWS Video Pipeline

This is the Mind-side pointer only.

Canonical dashboard and operating detail now live in Brain:

```text
/Users/Office/Repos/stevewesthoek/brain/projects/video-orchestrator/docs/aws-video-pipeline.md
```

Use the Brain document for:
- pipeline status
- channel configuration
- content profiles
- topic contract schema
- security and privacy rules
- architecture and operating commands

---

## 🧠 Brain Core API Integration

Brain Console consumes video pipeline data through Brain Core (not directly from AWS):

### Endpoints

**Pipeline Status**
```
GET /api/video-orchestrator/topic-intelligence/status
```

Returns:
```json
{
  "ok": true,
  "data": {
    "channels": [...],
    "recentJobs": [...],
    "pipelineReady": true,
    "generationStatus": "ready",
    "publishingStatus": "ready"
  }
}
```

**Channel Topics**
```
GET /api/video-orchestrator/topic-intelligence/channels/{channelId}
```

Returns channel status with ranked topic candidates:
```json
{
  "ok": true,
  "data": {
    "channelId": "says-the-bible",
    "displayName": "Says the Bible",
    "youtubeEnabled": true,
    "publishingStatus": "ready",
    "topCandidates": [...],
    "totalTopics": 5
  }
}
```

### Architecture

```
Mind (Obsidian vault)
  └─ Brain Console plugin
      └─ Calls Brain Core API
         └─ Brain Core reads from:
            ├─ video-orchestrator/cloud/channels/
            ├─ video-orchestrator/cloud/jobs/
            └─ Secrets Manager (credentials)
```

**No direct coupling between Mind and AWS.**
Brain Core is the source of truth.
