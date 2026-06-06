# Kanban Inventory — 2026-06-06

Read-only inventory derived from `kanban.md`.

## Purpose

Preserve the current Obsidian Kanban board contents before any future task-system redesign.

No cards were moved, renamed, deleted, normalized, or migrated as part of this report.

## Source

- Source file: `kanban.md`
- Board format: Obsidian Kanban plugin
- Columns found: Backlog, To Do, Doing, Done
- Plugin settings present: yes
- Tag colors present: `#p1`, `#p2`, `#p3`, `#p4`, `#p5`, `#you`, `#ai`

## Summary

| Column | Cards |
|---|---:|
| Backlog | 2 |
| To Do | 13 |
| Doing | 11 |
| Done | 30 |

Notes:

- One Backlog card is blank: `- [ ]`.
- `Save to mind improvements #p3 #you` has six nested subtasks.
- `Product: Model Router` appears as a Kanban task title. It was not changed because task titles are user data and may require manual review.
- `live/tasks.md` is a summary surface, not the source of truth. `kanban.md` remains the active daily board.

## Backlog

### Open

- [ ] Save to mind improvements #p3 #you
  - [ ] Normalize producer tags output so captures consistently include tags: [] in frontmatter
  - [ ] Add lightweight regression check for producer/router contract — verify all 8 frontmatter fields present
  - [ ] Add lightweight regression check for single-pass routing — ensure captures route once, not duplicate
  - [ ] Add tiny operational smoke-test runbook for post-change verification
  - [ ] Review whether confidence should always be serialized as float 0.0–1.0 (not 1 vs 1.0)
  - [ ] Review whether additional observability/log retention would be useful — track routing performance
- [ ] [blank card]

## To Do

- [ ] Product: Model Router
- [ ] Explore barcode idea
- [ ] Empty mail
- [ ] Send message to Norbert
- [ ] Make a strategy agent
- [ ] Vraag Tim voor verhuizen domein & Vraag Tim om terug betalen geld
- [ ] empty ChatGPT into Obsidian
- [ ] Sell video cameras Miro
- [ ] Sell Miro's safe
- [ ] Fix the curtains
- [ ] Buy paint & filler & brushes
- [ ] Clean garage floor
- [ ] Unlimited TV sub

## Doing

- [x] Figure out new direction Vila Solidaria ✅ 2026-06-05
- [x] Fix Antenna ✅ 2026-06-05
- [ ] Expand STB pipeline and start posting FB, YT & PIN
- [ ] YA finance app
- [ ] Make FB shorts account with free github repos
- [ ] Make a digital product for FGWA
- [ ] Marriage certificate
- [ ] Apply for passport
- [ ] Prepare Passport meeting
- [ ] Prepare Lambda meeting
- [ ] how  can we see soccer on our TV in 4K
- [ ] read mark's boek

## Done

- [x] Invoice VDE ✅ 2026-06-03
- [x] Invoice TDP ✅ 2026-06-03
- [x] Contact Wilson again ✅ 2026-06-02
- [x] Send reaction Freek ✅ 2026-06-01
- [x] Make video for Yosef ✅ 2026-06-01
- [x] Setup STB Facebook app ⏫ ✅ 2026-05-28
- [x] Portuguese criminal record ✅ 2026-05-27
- [x] Make the Gospel/Atheism paper ✅ 2026-05-27
- [x] fix the obsidian way of working ✅ 2026-05-23
- [x] Learn Portuguese app ✅ 2026-05-23
- [x] Make Oliveto Organizing editable for Ashley
- [x] Make Via di Eden editable for Joe
- [x] Check with Mark & Yosef meeten ✅ 2026-05-14
- [x] Upgrade ACP from Bronze to Gold: https://join.acp.pt/ ✅ 2026-05-13
- [x] Product: ChatGPT bridge ✅ 2026-05-08
- [x] plan NL trip ✅ 2026-05-08
- [x] Family finance app ✅ 2026-05-19
- [x] Put money on bank account ✅ 2026-05-06
- [x] IB aangifte doen ✅ 2026-05-06
- [x] Improve thumbnails STB ✅ 2026-05-06
- [x] Pay car taxes ✅ 2026-05-05
- [x] Decommision Hetzner 🔼 ✅ 2026-05-04
- [x] Do the JPV Bootcamp tests ✅ 2026-05-04
- [x] Plantenpot aanpassen ✅ 2026-05-04
- [x] maak factuur TDP domeinen ✅ 2026-04-24
- [x] Place baby bed down ✅ 2026-04-18
- [x] Bring car to mechanic ✅ 2026-04-18
- [x] Make my contact card iPhone ✅ 2026-04-18
- [x] Vraag Jon voor verhuizen domein & give him a coinbase address ✅ 2026-04-18
- [x] add obsidian to phone ✅ 2026-04-18

## Preservation recommendations

1. Keep `kanban.md` as the source of truth until a lossless task record format is designed and tested.
2. Do not overwrite or regenerate `kanban.md` until every card has a stable ID or reversible export.
3. Treat task titles as user data. Do not rename legacy titles such as `Product: Model Router` automatically.
4. Future sync should be two-step:
   - export/import all Kanban cards into structured task records;
   - generate or synchronize the Obsidian Kanban board from those records.
5. `live/tasks.md` should remain a compact Mind Steward summary surface unless explicitly promoted to a generated task dashboard.
