---
type: capture
source: test-fallback
para_type: project
confidence: 0.85
signal_quality: 0
created: 2026-04-18T12:30:00.000Z
status: unrouted
tags: []
---

# Test: High Confidence, Missing Signal Quality

This is a test to verify that high-confidence captures with missing signal_quality
stay in review-queue (01-inbox) instead of being archived.

Signal quality is explicitly 0 to simulate incomplete metadata.
