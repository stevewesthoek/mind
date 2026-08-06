# ProChat Website Build Contract

**Status:** canonical implementation contract  
**Owner:** Steve Westhoek  
**Approved:** 2026-07-10  
**Audience:** designers, developers, AI coding agents, reviewers

This document translates the canonical ProChat homepage copy, global design foundation, and visual-motion system into implementation rules.

It does not define repository-specific file paths. The website implementation repository must create a local technical plan that maps these contracts to its current framework and source structure without changing the canonical design intent.

## Source hierarchy

Implementation agents must read these documents in order:

1. `product-naming-architecture.md`
2. `product-strategy.md`
3. `canonical-homepage-copy.md`
4. `global-design-foundation.md`
5. `website-visual-motion-system.md`
6. `website-build-contract.md`
7. repository-local architecture and implementation documents

If implementation convenience conflicts with canonical brand or product truth, canonical truth wins.

## Non-negotiable outcome

The homepage must not become a sequence of generic headings, paragraphs, icon cards, and screenshots.

Every major chapter must contain a visual system that explains the section’s proposition.

```yaml
homepage_quality_bar:
  generic_marketing_template: prohibited
  product_visualization_required: true
  scroll_storytelling_required: true
  text_remains_semantic_html: true
  mobile_specific_design_required: true
  reduced_motion_required: true
```

## Global technical decisions

```yaml
technical_design:
  fonts:
    primary: "Golos Text"
    technical: "JetBrains Mono"
    secondary: null
    delivery: "self-hosted variable fonts where licensing permits"
    font_display: "swap"
  color:
    system: "grayscale plus one global cobalt accent"
    accent: "#3158C7"
    product_specific_palette: false
  rendering:
    product_visuals: "semantic HTML + CSS + SVG"
    canvas: "not permitted for essential content"
    webgl: "not part of initial build"
  motion:
    cinematic: "GSAP + ScrollTrigger + @gsap/react"
    simple: "CSS transitions and keyframes"
    scrolling: "native"
    reduced_motion: "mandatory"
  responsive:
    desktop: "pinned cinematic chapters permitted"
    tablet: "shortened pinning and simplified overlap"
    mobile: "stacked stepwise scenes; no desktop canvas shrink-down"
```

## Required token interface

Implementation must expose semantic CSS custom properties. Components must not hard-code canonical colors, radii, shadows, spacing, or motion values.

```css
:root {
  --color-canvas: #f7f8fa;
  --color-surface: #ffffff;
  --color-surface-subtle: #f1f3f6;
  --color-surface-strong: #e8ebf0;
  --color-border-subtle: #e2e6ec;
  --color-border: #d4dae3;
  --color-border-strong: #b8c1cd;
  --color-text-primary: #111827;
  --color-text-secondary: #465363;
  --color-text-muted: #697586;
  --color-text-inverse: #ffffff;
  --color-accent: #3158c7;
  --color-accent-hover: #274ab0;
  --color-accent-pressed: #1e3d95;
  --color-accent-soft: #eaf0ff;
  --color-accent-line: #bfcdf5;

  --font-primary: "Golos Text", system-ui, sans-serif;
  --font-technical: "JetBrains Mono", ui-monospace, monospace;

  --radius-xs: 4px;
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-xl: 24px;

  --ease-standard: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-chapter: cubic-bezier(0.65, 0, 0.35, 1);
  --duration-fast: 180ms;
  --duration-standard: 280ms;
  --duration-deliberate: 450ms;
}
```

Dark tokens may override these semantic properties. Components must use semantic tokens rather than raw dark or light palette values.

## Component architecture

Separate narrative content, visual state, and animation orchestration.

```text
Homepage section
├── semantic copy layer
├── product visualization layer
├── visual-state model
├── motion timeline
└── reduced-motion renderer
```

### Required separation

- Canonical text must not be embedded in animation timeline code.
- Visual states must be representable without GSAP.
- GSAP orchestrates transitions between valid states.
- Reduced-motion rendering selects or lists states without replaying cinematic movement.
- Content remains readable if JavaScript fails.

## Visual-state model

Each cinematic component must declare finite named states.

Example:

```ts
type MemoryLifecycleState =
  | "evidence"
  | "draft"
  | "sanitized"
  | "review"
  | "approved"
  | "retrieved"
  | "retired";
```

Do not encode the story as unrelated numeric transforms without named product meaning.

Each state must define:

```ts
interface VisualStateContract {
  id: string;
  ariaSummary: string;
  visibleObjects: string[];
  emphasizedCopyId?: string;
  activeConnectors?: string[];
  statusLabels?: string[];
}
```

## Homepage chapter contract

```yaml
homepage_chapters:
  premise:
    cinematic: true
    pinned: true
    key_visual: "evidence fragments become reviewed memory and focused task context"
    required_components:
      - HomepageHeroStory
      - PhilosophyConnector
      - RepetitionVisual
      - BeforeAfterContinuity
  memory_model:
    cinematic: true
    pinned: true
    key_visual: "one record passes through the full memory lifecycle"
    required_components:
      - ProductArchitecture
      - MemoryWorkspaceDemo
      - MemoryLifecycleStory
      - MemoryRecordDemo
  trust:
    cinematic: true
    pinned_component: ContextSelectionStory
    key_visual: "trust, evidence, local ownership, readable storage, and relevant retrieval"
    required_components:
      - TrustGate
      - EvidenceHierarchy
      - LocalOwnershipDiagram
      - MarkdownRecordSplit
      - GitHistoryDemo
      - ContextSelectionStory
  value:
    cinematic: false
    key_visual: "consistent record anatomy and transparent measured inputs"
    required_components:
      - ReusableRecordTypes
      - ContextCostCalculator
  qa:
    cinematic: true
    pinned: true
    key_visual: "one failure becomes a reviewed lesson used in a later investigation"
    required_components:
      - QaInvestigationStory
      - BetaLearningLoop
  workbench:
    cinematic: false
    key_visual: "reasoning connects to a local project through guarded operations"
    required_components:
      - WorkbenchControlPlane
      - ProductFamilySummary
  boundaries:
    cinematic: false
    key_visual: "current capabilities are visibly separated from future and prohibited claims"
    required_components:
      - CapabilityBoundaryMap
      - HomepageFaq
      - FinalResolution
```

## GSAP implementation rules

Use `gsap.context()` or `useGSAP()` so animations and ScrollTriggers clean up correctly.

Use `ScrollTrigger.matchMedia()` or equivalent responsive setup for desktop, tablet, mobile, and reduced-motion behavior.

Never create global selectors that can affect another component instance.

Every cinematic chapter must provide:

- a scoped root reference;
- one primary timeline;
- named labels matching product states;
- deterministic start and end points;
- teardown on route change;
- refresh after font and layout stabilization;
- a non-pinned mobile timeline;
- a reduced-motion branch.

Example structure:

```ts
useGSAP(
  () => {
    if (prefersReducedMotion) return;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: root.current,
        start: "top top",
        end: "+=180%",
        scrub: true,
        pin: visual.current,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    timeline
      .addLabel("evidence")
      .to(/* state transition */)
      .addLabel("review")
      .to(/* state transition */)
      .addLabel("approved")
      .to(/* state transition */);
  },
  { scope: root, dependencies: [prefersReducedMotion] },
);
```

The exact implementation may differ, but state labels and cleanup are mandatory.

## Animation property policy

```yaml
animation_properties:
  preferred:
    - transform
    - opacity
    - clip-path with measured use
    - stroke-dashoffset for short SVG connectors
  restricted:
    - filter
    - box-shadow
    - background-color on large surfaces
  prohibited_during_scroll:
    - width
    - height
    - top
    - left
    - margin
    - padding
    - font-size
```

Layout changes between narrative states should normally be represented by transforms or precomposed grid positions.

## ScrollTrigger budget

```yaml
scrolltrigger_budget:
  pinned_chapters_max: 4
  active_triggers_per_chapter_target: 3
  total_page_triggers_target_max: 24
  scrubbed_timelines_max: 6
  continuous_pointer_effects: 0
```

Prefer one chapter timeline over many independently triggered child animations.

## Product visual data

Do not fill product demonstrations with lorem ipsum or abstract rectangles.

Use realistic, canonical, sanitized examples.

Every product object should include enough real structure to explain the concept:

```yaml
memory_record_example:
  id: "mem-qa-selector-stability"
  type: "lesson"
  state: "approved"
  scope: "project"
  title: "Prefer stable data attributes over generated class names"
  evidence:
    - "failed test output"
    - "DOM inspection"
    - "review note"
  source_count: 3
  last_reviewed: "example date"
  actions:
    - edit
    - reject
    - retire
```

Examples must not imply real customer data or measured outcomes unless documented.

## Text choreography

Copy may be visually emphasized through:

- scale contrast;
- controlled line wrapping;
- strong dark-to-muted hierarchy;
- cobalt emphasis for one key phrase;
- sticky chapter headings;
- progressive line activation;
- nearby visual state changes.

Rules:

- Do not apply the accent to entire paragraphs.
- Do not animate every word.
- Do not center long body copy.
- Keep active text readable for sufficient scroll distance.
- Do not fade inactive text below accessible contrast if it remains part of the reading flow.

## Mobile contract

Mobile is a separate narrative composition.

```yaml
mobile:
  pinned_sections: false
  visual_order: "copy then current visual state"
  states_per_scene: 1
  minimum_product_text_px: 12
  horizontal_scroll: prohibited
  sticky_header: permitted
  scroll_hijacking: prohibited
  tap_required_for_core_story: false
```

Do not render a 1200px product canvas scaled to fit a 360px viewport.

Create simplified mobile-specific visual variants with the same semantic state model.

## Reduced-motion contract

At `prefers-reduced-motion: reduce`:

- disable pinning;
- disable scrubbed object travel;
- show each important state as a static panel or immediate state transition;
- replace large movement with crossfade only when useful;
- disable parallax;
- stop autoplay loops;
- keep all copy and visual conclusions available.

Reduced motion is an alternative design, not a disabled or broken version.

## Loading strategy

```yaml
loading:
  above_fold:
    - static hero copy
    - first hero visual state
    - local fonts subset
  deferred:
    - GSAP cinematic module
    - below-fold chapter visualizations
    - optional route transitions
  asset_rules:
    - "No autoplay hero video"
    - "No full-page image sequence"
    - "Inline only critical small SVG"
    - "Lazy-load complex below-fold SVG and product simulations"
```

The first hero state must look complete before motion code loads.

## Testing matrix

```yaml
test_matrix:
  viewport:
    - "360x800"
    - "390x844"
    - "768x1024"
    - "1024x768"
    - "1280x800"
    - "1440x900"
    - "1728x1117"
  browser:
    - Chrome_current
    - Safari_current
    - Firefox_current
    - Edge_current
  preference:
    - motion_standard
    - motion_reduced
    - light
    - dark_where_supported
  input:
    - mouse
    - trackpad
    - keyboard
    - touch
  network:
    - fast
    - throttled_mobile
```

## Acceptance checks per cinematic chapter

```yaml
cinematic_acceptance:
  - "Narrative remains understandable from screenshots of initial, middle, and final states."
  - "Scroll backward reverses or restores state predictably."
  - "No content jumps when pinning begins or ends."
  - "Text remains readable while the visual changes."
  - "The visual teaches a canonical product mechanism."
  - "Reduced-motion mode presents the same conclusion."
  - "Mobile uses a purpose-built composition."
  - "No long task blocks the main thread during scroll."
  - "No unrelated product claim is introduced by the visual."
```

## AI implementation prompt contract

Any AI agent implementing the site must receive this minimum instruction:

```text
Read the canonical ProChat product, copy, global design, visual-motion, and build-contract documents before editing.

Do not invent a new palette, font, product claim, section order, or visual metaphor.

Implement semantic product visualizations from named states. Use GSAP ScrollTrigger only for the approved cinematic chapters, native scrolling, CSS for micro-interactions, and DOM/SVG for product visuals. Preserve a complete reduced-motion and mobile experience. Do not reduce the design to generic cards and text. Validate responsive behavior, accessibility, animation cleanup, performance budgets, and canonical claim boundaries.
```

## Definition of done

The design is ready for production implementation only when:

1. the global tokens are represented in code;
2. each canonical chapter has a wireframe and state storyboard;
3. hero, Memory lifecycle, context selection, QA investigation, and Workbench visual prototypes exist;
4. desktop, mobile, and reduced-motion variants are designed;
5. product examples use realistic sanitized data;
6. GSAP proof-of-concept confirms pinning and scrub performance;
7. the page still communicates without animation;
8. visual review confirms premium consistency across every chapter.
