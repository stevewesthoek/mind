# ProChat Website Visual and Motion System

**Status:** canonical website experience specification  
**Owner:** Steve Westhoek  
**Approved:** 2026-07-10  
**Depends on:** `global-design-foundation.md`, `canonical-homepage-copy.md`

This document defines how ProChat turns canonical homepage copy into premium visual storytelling. It is both a design brief and an implementation contract.

## Experience objective

The website should feel comparable in care and polish to a premium product launch site while remaining recognizably ProChat.

“Apple-like” means:

- clear visual hierarchy;
- large, confident typography;
- carefully staged product explanation;
- scroll-linked cause and effect;
- stable pinned compositions;
- high-quality easing and timing;
- visual continuity between sections;
- product concepts shown rather than decorated;
- no motion without explanatory purpose.

It does not mean copying Apple layouts, typography, glass effects, devices, or visual assets.

## Primary design rule

> Every major section must make one idea visible.

Copy remains essential, but text should be integrated into a visual argument rather than placed beside decorative imagery.

Each section must define:

1. the idea;
2. the product object or relationship that visualizes it;
3. the initial visual state;
4. the transformation caused by scrolling;
5. the final state;
6. the reduced-motion state;
7. the evidence or user understanding produced.

## Motion architecture

### Recommended stack

```yaml
motion_stack:
  cinematic_scroll:
    library: "GSAP"
    plugin: "ScrollTrigger"
    react_integration: "@gsap/react"
    use_for:
      - pinned narrative chapters
      - scrubbed multi-stage sequences
      - synchronized text and product visuals
      - SVG path and connector animation
      - controlled section transitions
  native_css:
    use_for:
      - hover and focus transitions
      - button states
      - simple opacity and transform reveals
      - progressive scroll-driven enhancement
      - reduced-motion fallbacks
  browser_apis:
    use_for:
      - IntersectionObserver for non-cinematic reveals
      - View Transitions for optional route continuity
      - prefers-reduced-motion detection
  optional_component_motion:
    library: null
    rule: "Do not add Motion for React unless an interaction cannot be implemented cleanly with CSS and GSAP already in the stack."
```

### Why GSAP ScrollTrigger

Use GSAP ScrollTrigger for the premium scrollytelling layer because it provides precise timelines, pinning, scrubbing, sequencing, responsive match-media behavior, and React cleanup through `@gsap/react`.

It is appropriate for the small number of cinematic sections that require tight choreography.

### Why native scrolling

Do not install a smooth-scroll engine by default.

Use native browser scrolling because it is predictable, accessible, performant, and compatible with user preferences.

Do not use Lenis, ScrollSmoother, or custom wheel interception in the first implementation. They may be evaluated later only if a specific visual requirement cannot be achieved with native scroll.

### Why DOM and SVG

Product explanations should primarily use semantic HTML, CSS, and SVG.

Advantages:

- accessible structure;
- crisp scaling;
- editable by developers and AI coding agents;
- responsive layout;
- indexable text;
- direct theme-token use;
- lower asset cost than video or frame sequences;
- easier reduced-motion alternatives.

Avoid Three.js, WebGL, Rive, Lottie, and image-sequence video as foundational dependencies. Use them only when a validated visual concept cannot be communicated with DOM and SVG.

## Motion principles

### Motion explains state

Motion should answer questions such as:

- Where did this record come from?
- Why did it become trusted?
- Which evidence supports it?
- Which memory is selected for this task?
- What did Workbench read, change, validate, and commit?

### Scroll controls progress, not access

- Content must remain accessible without completing an animation.
- Scrolling backward must reverse or restore the narrative predictably.
- Pinned sections must have a clear start and end.
- The page must never trap the user.

### Visual continuity

Objects should persist across adjacent states when they represent the same concept.

Example:

```text
raw evidence card
→ draft lesson
→ reviewed record
→ approved memory
→ selected task context
```

Do not replace the object with unrelated imagery at every step.

### Stable text

Text may reveal, emphasize, or change hierarchy, but it should not move continuously while being read.

Use:

- opacity;
- small vertical translation;
- mask or clip reveal;
- weight or color emphasis;
- line-by-line activation.

Avoid:

- typewriter effects;
- character scrambling;
- bouncing words;
- continuous horizontal marquee for core content.

## Timing and easing

```yaml
motion_tokens:
  duration:
    instant: 0.12
    fast: 0.18
    standard: 0.28
    deliberate: 0.45
    chapter_transition: 0.70
  ease:
    standard: "power2.out"
    enter: "power3.out"
    exit: "power2.in"
    chapter: "power3.inOut"
    linear_scroll: "none"
  reveal_distance_px:
    desktop: 32
    mobile: 20
  stagger_seconds:
    tight: 0.035
    standard: 0.07
    narrative: 0.12
```

For scroll-scrubbed sequences, use linear progress and build perceived easing into individual timeline segments.

Avoid elastic, bounce, and overshoot easing in primary storytelling.

## Performance contract

```yaml
performance_budget:
  largest_contentful_paint_seconds: 2.5
  interaction_to_next_paint_ms: 200
  cumulative_layout_shift: 0.1
  initial_animation_js_gzip_kb_target: 55
  hero_media_initial_kb_target: 250
  total_above_fold_transfer_kb_target: 700
  pinned_cinematic_sections_max: 4
  simultaneous_animated_elements_target: 12
  mobile_particle_count: 0
```

Requirements:

- Animate `transform` and `opacity` wherever possible.
- Do not animate layout properties during scroll.
- Reserve dimensions before loading visuals.
- Lazy-load below-the-fold heavy modules.
- Dynamically import GSAP chapters when practical.
- Pause off-screen animation work.
- Use SVG path complexity conservatively.
- Test on a mid-range mobile device, not only a desktop workstation.

## Accessibility contract

```yaml
reduced_motion:
  required: true
  behavior:
    pinned_sections: "convert to normal document flow"
    scrubbed_sequences: "show final or stepwise static states"
    parallax: "disable"
    object_travel: "replace with crossfade or no transition"
    autoplay_loops: "disable"
    essential_state: "visible without animation"
```

Additional requirements:

- Do not animate large depth changes toward or away from the viewer.
- Avoid rapid zooming, spinning, wave motion, and multi-axis movement.
- Provide keyboard-accessible controls for any interactive demonstration.
- Do not put essential copy inside canvas or inaccessible SVG text.
- Maintain logical DOM order when visual elements are pinned or layered.

## Page rhythm

The long homepage is organized into visual chapters rather than 23 equally animated sections.

```yaml
chapters:
  - id: premise
    sections: [1, 2, 3, 4]
  - id: memory_model
    sections: [5, 6, 7, 8]
  - id: trust
    sections: [9, 10, 11, 12, 13, 14]
  - id: value
    sections: [15, 16]
  - id: current_product
    sections: [17, 18]
  - id: workbench
    sections: [19, 20]
  - id: boundaries
    sections: [21, 22, 23]
```

Use at most four major pinned cinematic sequences. Other sections use shorter reveals, sticky sub-elements, diagrams, or static high-fidelity product compositions.

## Visual system primitives

Create reusable visual components rather than bespoke unstructured animation code.

```yaml
visual_primitives:
  EvidenceCard:
    states: [raw, selected, attached, superseded]
  MemoryRecord:
    states: [draft, review, approved, rejected, retired]
  ScopeBadge:
    states: [personal, project, client, team, organization, cross_project]
  SourceConnector:
    states: [inactive, active, conflicting, current]
  ContextWindow:
    states: [empty, assembling, focused, overloaded]
  ReviewGate:
    actions: [approve, edit, reject, retain_draft]
  RepositoryTree:
    states: [idle, context_selected, changed, validated]
  GuardedOperation:
    states: [requested, scoped, confirmed, executed, blocked]
  ValidationResult:
    states: [pending, passed, failed, repaired]
  GitAction:
    states: [unstaged, staged_explicitly, committed]
```

All primitives must use the global grayscale and cobalt tokens. Semantic red, amber, and green appear only when the represented state requires them.

# Homepage visual specification

## Chapter 1 — Premise

### Hero: stop rebuilding what the project learned

**Visual idea**  
Scattered evidence becomes reviewed, reusable memory and then focused task context.

**Composition**  
Large left-aligned headline in the foreground. A deep product canvas occupies the right and extends behind part of the copy without reducing legibility.

**Initial state**

- Six evidence fragments float in a controlled grid, not randomly.
- Fragments include decision, correction, log evidence, approved example, review note, and previous failure.
- Each fragment uses realistic product content and source metadata.

**Scroll transformation**

1. Evidence fragments align into a structured column.
2. A review gate appears.
3. One record is edited, one rejected, and three approved.
4. Approved records enter a local Markdown workspace.
5. A new task appears.
6. Only two relevant records move into its context panel.

**Text emphasis**

The words “project already learned” activate as the records become approved memory.

**Final state**  
A clean task context panel beside a visible larger memory workspace.

**Implementation**  
GSAP timeline + ScrollTrigger; pinned on desktop for approximately 160–200vh; shorter non-pinned sequence on mobile.

**Reduced motion**  
Static four-panel sequence showing evidence, review, memory, and focused context.

### Core philosophy

**Visual idea**  
Four connected statements form a causal system rather than a list.

```text
Memory → Evidence → Human review → AI use
```

As each statement becomes visible, the corresponding object in the hero final state highlights.

Use a slow connector draw and typography emphasis. Do not pin this section independently.

### Repeated-work problem

**Visual idea**  
A task restarts repeatedly with the same missing context.

Show three vertically stacked task sessions. Each begins empty, requests the same information, and reconstructs the same decision. The repeated blocks visually align to reveal waste.

On scroll, the repeated blocks compress into one reusable memory record.

### Before and after

**Visual idea**  
One canvas transitions from fragmented recurrence to structured continuity.

Do not use a generic two-column checklist alone.

Left state:

- disconnected sessions;
- duplicate explanations;
- lost decisions;
- unresolved source links.

Right state:

- reviewed records;
- visible sources;
- current-evidence override;
- focused task context.

A draggable comparison control is optional, but the default should work without interaction.

## Chapter 2 — Memory model

### Company and two-product architecture

**Visual idea**  
One shared foundation supports two distinct workflows.

Use a structural diagram:

```text
                    ProChat
                       │
          reusable project knowledge
                 ┌─────┴─────┐
                 │           │
            Memory       Workbench
```

Memory is visually primary. Workbench enters later and remains secondary.

### Memory product definition

**Visual idea**  
A high-fidelity memory workspace, not a decorative card collage.

Show:

- Markdown source;
- readable rendered record;
- state;
- scope;
- source references;
- last review;
- actions.

A cursor or hover may reveal the relationship between source Markdown and rendered UI, but the section must remain understandable without interaction.

### Memory workflow — primary pinned sequence

This is the second major cinematic sequence.

**Stages**

1. Current evidence
2. Draft lesson
3. Sanitization and scope
4. Human review
5. Relevant retrieval
6. Correction or retirement

**Composition**

- Sticky visual canvas on the right.
- Six short text stages on the left.
- Each stage owns approximately 70–90vh.
- The same record persists through all states.

**Critical behavior**

The viewer must see that trust is earned through transformation, not assigned automatically.

### Example record

Use a large, nearly full-width product record with readable content. Reveal its metadata by relationship:

- source attaches to evidence;
- scope defines reach;
- review changes state;
- current evidence can flag it for update;
- retirement preserves history without active reuse.

## Chapter 3 — Trust and architecture

### Trust model

**Visual idea**  
A physical-looking but minimal review gate.

Raw evidence and draft records approach the gate. Only explicitly approved, scoped records pass into trusted memory.

Rejected and draft records remain visible outside the trusted set. Do not make them disappear, because the point is state distinction rather than magical cleanup.

### Evidence hierarchy

**Visual idea**  
A layered decision stack.

Top layer: current evidence and human judgment.  
Middle layer: reviewed stored memory.  
Bottom layer: unreviewed notes and AI drafts.

Introduce a conflict: an older memory says one thing, current evidence says another. The current evidence visually supersedes the memory and triggers review.

### Local ownership

**Visual idea**  
Three clearly separated locations:

1. ProChat product repository
2. Customer-owned memory workspace
3. Customer or client project repository

Animate relationships between them without merging the containers.

The visual must make “ProChat does not host customer memory” understandable without relying only on text.

### Markdown-first

**Visual idea**  
One record shown simultaneously as readable Markdown and structured UI.

A vertical reveal can move between source and rendered representation, emphasizing that the source remains understandable.

### Git-compatible history

**Visual idea**  
A record evolves through an inspectable diff.

Show:

- original approved record;
- changed evidence;
- proposed edit;
- reviewed diff;
- committed version;
- optional rollback.

Keep Git as optional infrastructure, not the main Memory experience.

### Relevant context

This is the third major cinematic sequence.

**Visual idea**  
A large memory workspace narrows to the correct task context.

**Sequence**

1. Many reviewed records appear in a structured workspace.
2. A task identifies project, scope, framework, environment, and failure category.
3. Irrelevant records recede but remain visible.
4. Relevant records connect to the task.
5. The context panel stays compact.
6. A source-inspection action reveals why each record was selected.

Avoid a “magic search” metaphor. Show explicit filters and relationships.

## Chapter 4 — Value

### What becomes reusable

**Visual idea**  
A structured inventory of record types.

Use one compositional system with changing content, not nine unrelated icons.

As the viewer scrolls, the central record changes type while its consistent anatomy remains visible:

- decision;
- evidence;
- failure and fix;
- correction;
- procedure;
- example;
- context;
- review note;
- lesson.

### Measurement

**Visual idea**  
A transparent equation, not a promotional counter.

Show each input entering the equation. The result should update only from visible assumptions.

Do not animate a fabricated before/after result. The “after” state remains blank until measured.

## Chapter 5 — Current product: QA

### Memory for QA

This is the fourth and final major cinematic sequence.

**Visual idea**  
A failed test investigation becomes an approved lesson and later helps a similar investigation.

**Sequence**

1. Test fails.
2. Evidence appears: logs, screenshot, selector, environment, test data.
3. Reviewed QA memory is retrieved.
4. The investigation tests hypotheses against current evidence.
5. Root cause is identified.
6. A draft lesson is created.
7. A person sanitizes, scopes, and approves it.
8. A later related failure retrieves the lesson.

Use a single continuous case, not disconnected UI mockups.

### Beta validation

**Visual idea**  
A learning loop rather than a marketing funnel.

```text
real failure
→ reviewed lesson
→ later retrieval
→ observed outcome
→ product improvement
```

Show the beta questions as measurable checkpoints.

## Chapter 6 — Workbench

### Workbench product visualization

**Visual idea**  
ChatGPT reasoning connects to a real local project through a guarded control plane.

**Three-column composition**

1. ChatGPT reasoning and request
2. Workbench bounded operation timeline
3. Local repository and validation state

**Canonical sequence**

```text
request
→ exact local context
→ guarded change
→ targeted validation
→ explicit Git action
```

**Required details**

- context is exact and bounded;
- file changes name their paths;
- validation has visible results;
- confirmation interrupts sensitive operations;
- Git staging is explicit;
- unrelated files remain untouched.

Do not visualize Workbench as an autonomous agent floating above the repository.

### Two products, one philosophy

Bring the final Memory and Workbench visual states side by side.

Shared structural principles highlight in sequence:

- local-first;
- memory-first;
- human-reviewed;
- evidence-aware;
- inspectable;
- explicitly scoped;
- Git-compatible;
- safe by default.

## Chapter 7 — Boundaries and action

### What ProChat does not claim

**Visual idea**  
A clean boundary map, not a wall of warning text.

Place approved current capabilities inside a solid boundary. Future capabilities sit outside as labeled possibilities. Prohibited claims do not receive product-like visual treatment.

### FAQ

FAQ remains primarily textual. Use restrained accordion motion. Do not turn it into a cinematic section.

### Final CTA

**Visual idea**  
Return to the opening failed task, now supported by one reviewed lesson.

The final state should visually resolve the hero:

- one repeated problem;
- one evidence trail;
- one reviewed memory;
- one better-prepared next investigation.

The CTA enters only after the visual resolution is clear.

## Responsive behavior

### Desktop

- Use pinned sequences selectively.
- Allow text and product canvas to overlap compositionally without obscuring content.
- Use large-scale typography and controlled negative space.

### Tablet

- Reduce pin duration.
- Keep visual and text in a clear 5/7 or 4/4 grid.
- Avoid horizontal overflow and tiny product UI.

### Mobile

- Convert long pinned sequences into stacked stepwise scenes.
- Do not shrink desktop product canvases below readability.
- Show one product state per viewport.
- Use tap-to-expand only for optional detail.
- Maintain normal scrolling.

## Implementation structure

```yaml
homepage_components:
  HomepageHeroStory:
    motion: gsap_scrolltrigger
    rendering: dom_svg
  PhilosophyConnector:
    motion: css_or_gsap_light
  RepetitionVisual:
    motion: gsap_triggered
  BeforeAfterContinuity:
    motion: css_clip_or_gsap
  ProductArchitecture:
    motion: svg_connectors
  MemoryWorkspaceDemo:
    motion: css_interaction
  MemoryLifecycleStory:
    motion: gsap_scrolltrigger_pinned
  MemoryRecordDemo:
    motion: gsap_light
  TrustGate:
    motion: gsap_timeline
  EvidenceHierarchy:
    motion: gsap_triggered
  LocalOwnershipDiagram:
    motion: svg_connectors
  MarkdownRecordSplit:
    motion: css_clip
  GitHistoryDemo:
    motion: gsap_timeline
  ContextSelectionStory:
    motion: gsap_scrolltrigger_pinned
  ReusableRecordTypes:
    motion: gsap_state_swap
  ContextCostCalculator:
    motion: css_numbers_only
  QaInvestigationStory:
    motion: gsap_scrolltrigger_pinned
  BetaLearningLoop:
    motion: svg_progressive
  WorkbenchControlPlane:
    motion: gsap_timeline
  ProductFamilySummary:
    motion: css_reveal
  CapabilityBoundaryMap:
    motion: css_or_svg
  HomepageFaq:
    motion: css_height_or_grid
  FinalResolution:
    motion: gsap_triggered
```

## Quality gates

A section is not implementation-ready until it has:

- approved canonical copy reference;
- one-sentence visual idea;
- initial and final states;
- scroll behavior;
- responsive behavior;
- reduced-motion behavior;
- semantic DOM plan;
- performance estimate;
- screenshot acceptance target.

The page is not launch-ready until:

- a five-second hero test succeeds;
- every major claim has a visual explanation;
- no cinematic section exists only for spectacle;
- the page works with JavaScript disabled at a basic content level;
- reduced-motion mode preserves the complete argument;
- keyboard and screen-reader structure remain logical;
- mobile receives purpose-designed scenes rather than a scaled desktop experience;
- Core Web Vitals meet the defined budget.

## Research references

- Apple Human Interface Guidelines, Motion: https://developer.apple.com/design/human-interface-guidelines/motion
- Apple Human Interface Guidelines, Accessibility: https://developer.apple.com/design/human-interface-guidelines/accessibility
- Apple accessibility guidance on Reduce Motion: https://developer.apple.com/documentation/accessibility/testing-system-accessibility-features-in-your-app
- GSAP ScrollTrigger documentation: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- GSAP React guidance: https://gsap.com/resources/React/
- Motion for React scroll guidance, reviewed as an alternative: https://motion.dev/docs/react-scroll-animations
- Web.dev high-performance animation guidance: https://web.dev/articles/animations-guide
- Web.dev CSS and Web Vitals: https://web.dev/articles/css-web-vitals
- Web.dev Interaction to Next Paint: https://web.dev/articles/inp
- Chrome scroll-driven animation performance case study: https://developer.chrome.com/blog/scroll-animation-performance-case-study
- W3C WCAG 2.2: https://www.w3.org/TR/WCAG22/

## Machine-readable decision summary

```yaml
prochat_website_motion:
  version: 1
  status: canonical
  visual_goal: "premium product storytelling through explanatory motion"
  apple_like_means:
    - staged product explanation
    - scroll-linked cause and effect
    - stable pinned composition
    - large precise typography
    - continuity between states
  primary_tooling:
    scroll_cinematic: "GSAP ScrollTrigger"
    react_binding: "@gsap/react"
    micro_interactions: "CSS"
    diagrams: "semantic DOM + SVG"
    scroll_engine: "native browser scroll"
  not_default:
    - Motion for React
    - Lenis
    - ScrollSmoother
    - Three.js
    - WebGL
    - Rive
    - Lottie
    - image sequences
  cinematic_pinned_sections:
    max: 4
    sections:
      - hero
      - memory lifecycle
      - relevant context
      - QA investigation
  mandatory:
    - reduced-motion alternative
    - mobile-specific composition
    - transform-and-opacity-first animation
    - semantic DOM order
    - visible initial and final states
    - product-derived visual language
  prohibited:
    - scroll hijacking
    - decorative continuous loops
    - typewriter effects
    - character scrambling
    - parallax as primary storytelling
    - essential content inside canvas
    - generic AI visuals
```
