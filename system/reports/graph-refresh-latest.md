# Graph Refresh Latest Receipt

**Status:** accepted — owner-ratified one-time baseline
**Accepted run:** `20260804T000604198Z-06de527423e0`
**Source:** Mind `06de527423e05d4208cdcf485be92a2d1028c46d`
**Completed:** `2026-08-04T00:06:06.991Z`

## Owner disposition

On 2026-08-04 Steve Westhoek explicitly ratified the `00:06:04` snapshot and
classified `20260804T000530178Z-06de527423e0` as the superseded
post-publication-cleanup diagnostic. Both Brain runtime records remain
preserved; only the ratified run is the selected Mind baseline.

The graph matched exact Mind HEAD `06de5274...` during execution and acceptance.
Mind commit `d64e8bd1...` was created afterward only to preserve the pre-existing
`wiki/log.md` compile-loop audit history. Steve's disposition accepts that
one-file post-run change without authorizing another Graphify execution.

## Bound receipt

| Identity | Value |
|---|---|
| Brain-owned runner commit | `38464719d96e9eced962c16982ed8bd4597dee66` |
| Runner SHA-256 | `cdcfafe45ed9ecbd28beaf2fd783c37a907a7bb0a7f2b8eafe4ebb08dec3e428` |
| Profile | `graphify-mind-knowledge`, catalog `1.1.0` |
| Profile SHA-256 | `8a9f1b142c005ae1cc9a1196e3339ef681ed663fb039c1ccf41eb51002e1f202` |
| Generator | `graphifyy 0.8.36` |
| Generator SHA-256 | `e04e632a74629399b6db20a2e761f2ef8d8aa069e3f96f372fdb46ed884b47cf` |
| Source manifest SHA-256 | `6ce98a5b420efeaf8c15cc4654a10358456f6453b75f5ab081d7eaa5222ec912` |
| Graph SHA-256 | `c17786ed9af9aa5bd49ce9103b1dd98250ea8b82c8a77cca99abce200cf54ea4` |
| Receipt SHA-256 | `d03f2fb3f16dfda2edc323f5166669607fc51389dac7e1ab387c88bae3379bee` |
| Acceptance SHA-256 | `a27431d3381fd9131070627ddf58d60d7ed8d850a3a75b9d00565b8f32ac42b6` |

The contained runner used an exact-commit Git-object export. It did not read or
write the Mind working tree. Generated graph output remains non-authoritative.

## Corpus and acceptance

| Check | Result |
|---|---:|
| Included Markdown | 591 files |
| Included Mind-owned scripts | 10 files |
| Total corpus | 601 files / 31,206,994 bytes |
| Graph | 6,202 nodes / 5,672 edges |
| Corpus files represented | 601 of 601 |
| Committed plugin-internal files observed | 29 |
| Plugin-internal files included | 0 |
| Exact execution HEAD | pass |
| Working-tree source read | false |

The explicit allowlist included Markdown and Mind-owned script extensions. It
excluded `.obsidian`, archives, history, generated/build/runtime output,
vendors, dependencies, environment files, credential/secret/backup-marked
paths, and unrelated binaries.

## Storage baseline

The accepted operational run contains 600 regular files totaling 4,359,884
logical bytes and uses 8,972 KiB of allocated storage. This passes the 25 MiB
Graphify working-set budget. The selected run lives under Brain's approved
runtime boundary:

`/Users/Office/Repos/stevewesthoek/brain/runtime/local/graphify/mind-knowledge/runs/20260804T000604198Z-06de527423e0`

Brain's `current` selector points to that run. Future execution authority is
`none`; a refresh requires new explicit authorization.
