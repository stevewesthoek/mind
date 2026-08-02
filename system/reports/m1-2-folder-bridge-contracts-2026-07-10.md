# M1.2 — Align Folder and Bridge Contracts Report

**Date:** 2026-07-10  
**Task:** `M1.2 — Align the folder and bridge contracts`  
**Verdict:** **BLOCKED**

## Scope and worktree

Repository edits were limited to Mind. Brain was inspected read-only only to verify the schema, Context Gateway, and external failed-processing routing blockers. Existing M1.1 changes and the pre-existing unrelated `wiki/log.md` change were preserved. M1.3 was not started. No Brain files, application code, automation, infrastructure, credentials, or unrelated files were modified.

## Files inspected

### Mind

1. `system/reports/m1-2-folder-bridge-contracts-2026-07-10.md`
2. `system/mind-implementation-plan.md`
3. `system/folder-contract.md`
4. `system/brain-mind-bridge.md`

### Brain — read-only

- `operations/specs/infinite-brain-runtime-implementation-plan.md`
- `operations/runbooks/infinite-brain-roadmap-status.md`
- `projects/brain-core/src/mind-paths.ts`
- `operations/specs/context-pack.schema.json` — exact target checked; file does not exist.
- `projects/mind-context/` — exact target checked; no implemented package content exists.
- `operations/automations/n8n/workflows/mind-inbox-fixed.json` — only routing path tokens and routing statements were extracted; secret-bearing values were not read or printed.
- `operations/runbooks/n8n-mind-inbox.md`
- `runtime/local/mind-steward/inbox-queue-latest.json`
- `projects/mind-steward/src/preview.ts`
- `docs/system/1778967920555-codex-prompt-save-to-mind-failure-buffer-and-secret-cleanup-2026-05-16.md` — used only to locate the current workflow and runbook; not treated as current authority.

## Files changed

- `system/folder-contract.md`
  - made `inbox/new/` and `inbox/failed/` authoritative canonical Mind targets;
  - distinguished completed Mind content migration from incomplete external Brain n8n routing;
  - recorded the verified repository workflow defaults and active-version limitation;
  - retained failed-write verification requirements.
- `system/brain-mind-bridge.md`
  - referenced Brain's planned context-pack schema version `1.0` and exact target path;
  - referenced the exact Brain Context Gateway implementation-plan path and target package;
  - stated that both schema and Gateway implementation are absent/planned;
  - separated canonical Mind targets from external compatibility routing;
  - removed wording that implied current runtime support or machine validation.
- `system/reports/m1-2-folder-bridge-contracts-2026-07-10.md`
  - updated this report with cross-repo read-only evidence and verification output.
- `system/mind-implementation-plan.md`
  - retains M1.2 as blocked and links this report; it is not marked complete.

## Exact commands and operations run

### Worktree inspection

```text
git status --short
```

The worktree contained completed M1.1 changes, the M1.1 report, the M1.2 report, and the pre-existing `wiki/log.md` change. All were preserved.

### Brain workflow routing extraction

The workflow JSON was parsed read-only and only routing tokens were printed:

```text
["node","-e","const fs=require('fs');const file='operations/automations/n8n/workflows/mind-inbox-fixed.json';const data=JSON.parse(fs.readFileSync(file,'utf8'));const re=/(?:inbox\\/(?:new|failed)|capture\\/(?:inbox|failed))\\/?/g;const out=[];function walk(v,p){if(typeof v==='string'){const m=[...v.matchAll(re)].map(x=>x[0]);if(m.length)out.push({path:p,matches:[...new Set(m)]});return;}if(Array.isArray(v)){v.forEach((x,i)=>walk(x,`${p}[${i}]`));return;}if(v&&typeof v==='object'){for(const [k,x] of Object.entries(v))walk(x,p?`${p}.${k}`:k);}}walk(data,'');for(const r of out)console.log(`${r.path}: ${r.matches.join(', ')}`);console.log(`records=${out.length}`);"]
```

Output:

```text
nodes[3].parameters.jsCode: capture/inbox, capture/failed
activeVersion.nodes[3].parameters.jsCode: capture/inbox/
records=2
```

The exact routing statements were then extracted:

```text
["node","-e","const fs=require('fs');const f='operations/automations/n8n/workflows/mind-inbox-fixed.json';const d=JSON.parse(fs.readFileSync(f,'utf8'));for(const [label,code] of [['nodes[3]',d.nodes?.[3]?.parameters?.jsCode],['activeVersion.nodes[3]',d.activeVersion?.nodes?.[3]?.parameters?.jsCode]]){if(typeof code!=='string')continue;const lines=code.split('\\n');console.log(`[${label}]`);lines.forEach((line,i)=>{if(/inbox\\/(new|failed)|capture\\/(inbox|failed)/.test(line))console.log(`${i+1}:${line.trim()}`);});}"]
```

Output:

```text
[nodes[3]]
36:const inboxPrefix = ($env.MIND_INBOX_PATH || 'capture/inbox').replace(/^\/+|\/+$/g, '') || 'capture/inbox';
37:const failedPrefix = ($env.MIND_FAILED_PATH || 'capture/failed').replace(/^\/+|\/+$/g, '') || 'capture/failed';
[activeVersion.nodes[3]]
20:const file = `capture/inbox/${date}-${slug}.md`;
```

No secret value was printed.

### Current bridge-path existence check

```text
["node","-e","const fs=require('fs');const paths=['inbox/new','inbox/raw','resources','inbox/processed','inbox/failed','system/task-kanban-contract.md','projects','organizations','repos','people','faith','knowledge','history','system/agent-context','capture/inbox','capture/failed'];let missing=[];for(const p of paths){const ok=fs.existsSync(p);console.log(`${ok?'exists':'missing'} ${p}`);if(!ok)missing.push(p);}console.log(`missing=${missing.length}`);if(missing.length)process.exit(1);"]
```

Output:

```text
exists inbox/new
exists inbox/raw
exists resources
exists inbox/processed
exists inbox/failed
exists system/task-kanban-contract.md
exists projects
exists organizations
exists repos
exists people
exists faith
exists knowledge
exists history
exists system/agent-context
exists capture/inbox
exists capture/failed
missing=0
```

### Required ambiguity-phrase review

The exact M1.2 verification was submitted against the two contract files:

```bash
rg -n 'guidance only|future target|legacy fallback' system/folder-contract.md system/brain-mind-bridge.md
```

The current Workbench transport rejected the literal regex alternation before process execution:

```text
args[3] contains prohibited shell syntax
```

The bounded deterministic equivalent used:

```text
["node","-e","const fs=require('fs');const files=['system/folder-contract.md','system/brain-mind-bridge.md'];const needles=['guidance only','future target','legacy fallback'];let count=0;for(const file of files){const lines=fs.readFileSync(file,'utf8').split('\\n');lines.forEach((line,i)=>{if(needles.some(n=>line.toLowerCase().includes(n))){console.log(`${file}:${i+1}:${line}`);count++;}});}console.log(`matches=${count}`);"]
```

Output:

```text
system/folder-contract.md:131:Do not remove legacy fallback folders until Brain validation passes against the migrated target structure and Steve explicitly approves cleanup.
matches=1
```

Line-by-line review verdict: this is an intentional safety and approval gate. It does not define a legacy path as the current default.

## Verification findings

### Current Mind paths

Every canonical current Mind path referenced by the bridge exists. The retained compatibility directories also exist. Path-existence verification passes.

### Brain schema version

Brain's canonical runtime implementation plan defines task B2.2:

```text
operations/specs/context-pack.schema.json
planned schema version 1.0
```

The exact schema file does not exist. Therefore version `1.0` is a verified planned contract version, not an implemented or machine-validated schema version.

### Context Gateway contract

Brain's canonical implementation plan defines:

```text
operations/specs/infinite-brain-runtime-implementation-plan.md
Priority 2, tasks B2.1–B2.8
projects/mind-context/
```

Brain's canonical live-status runbook records the Context Gateway as `planned` with no canonical runtime implementation. The target package contains no implemented package content. The bridge now references these exact sources and states their planned status.

### External failed-processing routing

Verified Brain repository evidence shows:

- Brain Core's target-path module exposes `inbox/failed` as the target candidate;
- the n8n repository workflow defaults `MIND_FAILED_PATH` to `capture/failed`;
- the same workflow defaults `MIND_INBOX_PATH` to `capture/inbox`;
- the recorded active workflow version hard-codes `capture/inbox/` and does not expose a verified `inbox/failed/` failure route;
- the n8n runbook still documents `capture/inbox/` and is stale relative to Mind's target contract.

Therefore `inbox/failed/` is the canonical Mind failed-processing target, while external failed-processing routing remains incomplete and must not be claimed active.

## Final repository status checks

Mind command:

```text
git status --short
```

Output:

```text
 M system/agent-context/CLAUDE.md
 M system/agent-context/current.md
 M system/agent-context/implementation-plan.md
 M system/agent-context/maintenance.md
 M system/agent-context/map.md
 M system/agent-context/mind-steward.md
 M system/agent-context/roadmap.md
 M system/agent-context/router-README.md
 M system/agent-context/rules.md
 M system/agent-context/taxonomy.md
 M system/brain-mind-bridge.md
 M system/folder-contract.md
 M system/mind-implementation-plan.md
 M wiki/log.md
?? system/reports/m1-1-agent-context-status-2026-07-10.md
?? system/reports/m1-2-folder-bridge-contracts-2026-07-10.md
```

Brain command:

```text
git status --short
```

The Brain worktree already contained numerous unrelated changes under `.graphifyignore` and `operations/system-configs/`, including mutable runtime/configuration artifacts. No Workbench write action targeted Brain, and none of the read-only evidence files were modified by this task.

## Unresolved blockers

1. `operations/specs/context-pack.schema.json` does not exist, so bridge/schema version conformance cannot pass.
2. The Context Gateway package and runtime contract are not implemented; Brain records the capability as `planned`.
3. External n8n success and failure routing is not aligned with canonical Mind targets and lacks verified live `inbox/failed/` behavior.
4. The exact `rg` command remains blocked by the current Workbench literal-pipe transport policy; the bounded equivalent scan passes.

## M1.2 verdict

**BLOCKED.** The Mind contracts are now accurate and reference the exact verified Brain plan, schema target, Gateway target, and external routing state. Current Mind paths exist and the ambiguity review passes. M1.2 cannot be marked complete because the Brain schema is absent, the Context Gateway remains planned, and external routing migration is incomplete. M1.3 was not started. No commit or push was performed.
