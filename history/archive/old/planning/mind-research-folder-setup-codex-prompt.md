# Codex Prompt — Create Mind Research Folder Structure

Copy the prompt below into Codex while working in the `mind` repo.

This is needed because the current BuildFlow write policy can update root Markdown files but blocks creating nested paths under `06-resources/**`.

```text
You are working in the `mind` repo, Steve Westhoek's personal Obsidian vault and AI-readable memory.

Goal:
Create the research folder structure inside the existing PARA folder `06-resources/` without renaming, moving, deleting, or restructuring any existing PARA folders or automation-sensitive files.

Critical boundaries:
- Do not rename or move these folders:
  - 01-inbox/
  - 02-strategy/
  - 03-projects/
  - 04-tasks/
  - 05-areas/
  - 06-resources/
  - 07-templates/
  - 08-archive/
- Do not rewrite kanban.md.
- Do not change task frontmatter in 04-tasks/.
- Do not delete anything.
- Do not move anything.
- Do not commit or push unless explicitly asked after review.
- Do not add secrets, tokens, credentials, .env files, OAuth keys, private keys, cookies, or service account JSON.

Context:
The repo now has these AI entrypoint files:
- AGENTS.md
- 00-start-here.md
- 00-current-context.md
- 00-memory-map.md

Research should live under:
- 06-resources/research/

Create this directory structure:

06-resources/research/
  README.md
  inbox/
    README.md
  sources/
    README.md
    drive-exports/
      README.md
    pdf/
      README.md
    web/
      README.md
    books/
      README.md
    papers/
      README.md
  notes/
    README.md
    bible/
      README.md
      passages/
        README.md
      topics/
        README.md
      word-studies/
        README.md
      theological-questions/
        README.md
      comparative-views/
        README.md
    theology/
      README.md
    apologetics/
      README.md
    marketing/
      README.md
    business/
      README.md
    ai/
      README.md
    books/
      README.md
    people/
      README.md
    organisations/
      README.md
  briefs/
    README.md
  reports/
    README.md
  bibliographies/
    README.md
  templates/
    README.md
    passage-study.md
    topical-study.md
    word-study.md
    source-check.md
    research-brief.md
  metadata/
    README.md
    drive-map.json
    source-ledger.json

Content requirements:

1. `06-resources/research/README.md` must explain:
   - this is the research home inside the Mind repo
   - research is exploratory/source-grounded and distinct from committed strategy
   - strategy/decisions belong in 02-strategy/
   - tasks belong in 04-tasks/
   - active projects belong in 03-projects/
   - use Git as canonical history and Google Drive as import/export/collaboration layer
   - AI should use AGENTS.md and 00-memory-map.md before writing

2. Category README files should be short and unambiguous:
   - what belongs here
   - what does not belong here
   - where promoted/final content should go

3. Template files should be practical Markdown templates with YAML frontmatter.

Use these frontmatter shapes:

Passage study template:
---
type: research-note
research_type: passage-study
status: draft
created: YYYY-MM-DD
updated: YYYY-MM-DD
passage:
tradition_scope: general
sources: []
confidence: low
---

Topical study template:
---
type: research-note
research_type: topical-study
status: draft
created: YYYY-MM-DD
updated: YYYY-MM-DD
topic:
tradition_scope: general
sources: []
confidence: low
---

Word study template:
---
type: research-note
research_type: word-study
status: draft
created: YYYY-MM-DD
updated: YYYY-MM-DD
term:
language: hebrew|greek|other
lemma:
passage:
sources: []
confidence: low
---

Source check template:
---
type: research-note
research_type: source-check
status: draft
created: YYYY-MM-DD
updated: YYYY-MM-DD
claim:
sources: []
verdict: unverified
confidence: low
---

Research brief template:
---
type: research-brief
status: draft
created: YYYY-MM-DD
updated: YYYY-MM-DD
topic:
question:
sources: []
confidence: low
---

4. `metadata/drive-map.json` must contain placeholder/example data only. Do not include real Drive IDs unless already provided in the repo.

Use:
{
  "version": 1,
  "files": []
}

5. `metadata/source-ledger.json` must contain:
{
  "version": 1,
  "sources": []
}

6. After creating files, run:
   - git status --short
   - find 06-resources/research -maxdepth 4 -type f | sort

Deliverable:
- Report exactly which files were created.
- Report that no existing PARA folders were renamed/moved/deleted.
- Do not commit unless Steve explicitly asks.
```
