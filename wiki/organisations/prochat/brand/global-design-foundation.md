# ProChat Global Design Foundation

**Status:** canonical visual foundation  
**Owner:** Steve Westhoek  
**Approved:** 2026-07-10  
**Applies to:** ProChat, ProChat Memory, ProChat Memory for QA, ProChat Workbench, documentation, marketing, and product interfaces

This document defines the global visual language for all ProChat products and public surfaces. Existing themes in implementation repositories are historical references, not design authority.

## Design thesis

> ProChat should feel like a calm, trustworthy working system for structured knowledge—not like an AI spectacle.

Operational rule:

> Structure first. Evidence visible. Actions explicit. Decoration restrained.

The experience should be premium through precision, typography, motion choreography, visual explanation, and implementation quality—not through ornamental effects.

## Brand qualities

The design must consistently express:

- reliable;
- trustworthy;
- stable;
- clean;
- minimal;
- logical;
- structural;
- simple;
- high quality;
- technically credible.

### Reliable

- Layouts remain stable while content and animation change.
- Actions and system states are explicit.
- Navigation and controls use familiar patterns.
- The same visual token always carries the same meaning.

### Trustworthy

- Sources, state, scope, review status, and evidence relationships are visible where relevant.
- Draft, approved, rejected, retired, and current states are visually distinguishable without relying on color alone.
- Claims remain concrete and evidence-aware.
- Motion never conceals a state change or blocks access to content.

### Stable

- Avoid short-lived AI visual trends.
- Prefer durable proportions, neutral surfaces, restrained color, readable typography, and familiar interaction models.
- Visual novelty must serve comprehension.

### Clean and minimal

- One dominant visual idea per section.
- One primary action per decision area.
- Borders and spacing carry structure before shadows or decorative backgrounds.
- Large empty areas are intentional composition, not unused space.

### Logical and structural

- Relationships are communicated through grids, alignment, sequence, grouping, connectors, scope, and hierarchy.
- Product visuals should explain data movement, trust, evidence, review, memory, validation, and execution.

### Simple

- Simple means understandable, not empty.
- Technical depth is progressively disclosed.
- Product concepts are shown visually before they are explained in detail.

## Global visual strategy

ProChat uses one global theme.

Products do not receive unrelated palettes or font systems. They are differentiated through:

- information density;
- composition;
- product-specific diagrams;
- component behavior;
- motion choreography;
- content and examples.

### Product expression

**ProChat company**  
Calm, spacious, conceptual, and editorial.

**ProChat Memory**  
Records, evidence, source relationships, scope, review gates, retrieval, and durable knowledge.

**ProChat Memory for QA**  
The Memory language applied to failures, logs, selectors, test evidence, environments, and approved lessons.

**ProChat Workbench**  
Denser operational surfaces: repository trees, bounded context, guarded actions, validation, run state, diffs, and explicit Git operations.

## Typography

### Primary font

**Golos Text** is the global primary typeface.

Use it for:

- display headings;
- section headings;
- body copy;
- navigation;
- buttons;
- labels;
- forms;
- documentation;
- product UI.

Golos Text should account for at least 90% of visible text.

### Technical font

**JetBrains Mono** is the global technical typeface.

Use it for:

- code;
- commands;
- file paths;
- memory IDs;
- timestamps;
- status metadata;
- source references;
- numerical inputs and outputs;
- diffs;
- compact technical annotations.

Do not use JetBrains Mono for general body copy or entire navigation systems.

### Secondary font decision

No secondary display or serif font is canonical at this stage.

This is a deliberate decision, not an omission. A two-family system is cleaner, more stable, easier to implement, and more consistent with the premium minimal direction.

Use Golos Text italics, width, size, case, and weight contrast for editorial emphasis. A secondary font may be introduced only after visual prototypes prove that the system cannot create sufficient hierarchy without it.

### Font hierarchy

```yaml
typography:
  primary: "Golos Text"
  technical: "JetBrains Mono"
  secondary: null
  display_weight_range: [600, 750]
  body_weight: 400
  ui_weight_range: [450, 600]
  technical_weight_range: [400, 600]
```

### Type scale

```yaml
type_scale:
  display_xl:
    desktop: "clamp(4.5rem, 7vw, 7.5rem)"
    line_height: 0.96
    letter_spacing: "-0.045em"
  display_lg:
    desktop: "clamp(3.5rem, 5.5vw, 6rem)"
    line_height: 0.99
    letter_spacing: "-0.04em"
  heading_1:
    size: "clamp(2.75rem, 4vw, 4.75rem)"
    line_height: 1.02
    letter_spacing: "-0.035em"
  heading_2:
    size: "clamp(2.1rem, 3vw, 3.5rem)"
    line_height: 1.08
    letter_spacing: "-0.025em"
  heading_3:
    size: "clamp(1.5rem, 2vw, 2.25rem)"
    line_height: 1.16
    letter_spacing: "-0.015em"
  body_lg:
    size: "clamp(1.125rem, 1.4vw, 1.375rem)"
    line_height: 1.55
  body_md:
    size: "1.0625rem"
    line_height: 1.62
  body_sm:
    size: "0.9375rem"
    line_height: 1.55
  label:
    size: "0.8125rem"
    line_height: 1.35
```

### Reading widths

```yaml
reading_widths:
  hero_support: "50ch"
  standard_body: "66ch"
  narrow_explanation: "48ch"
  longform_max: "72ch"
```

## Color system

### Color strategy

Use grayscale as the visual foundation and one restrained cobalt accent.

The accent is global. It does not belong to one product.

Product states and diagrams may use opacity, pattern, line weight, labels, and grayscale hierarchy. Semantic status colors are permitted only when status meaning requires them.

### Global accent

**ProChat Cobalt:** `#3158C7`

Reasoning:

- communicates stability and trust without appearing corporate or conservative;
- remains distinctive against neutral surfaces;
- supports both product UI and cinematic marketing visuals;
- provides sufficient contrast with white for ordinary button text;
- avoids the purple-neon AI category convention.

### Canonical light palette

```yaml
color:
  canvas: "#F7F8FA"
  surface: "#FFFFFF"
  surface_subtle: "#F1F3F6"
  surface_strong: "#E8EBF0"
  border_subtle: "#E2E6EC"
  border: "#D4DAE3"
  border_strong: "#B8C1CD"
  text_primary: "#111827"
  text_secondary: "#465363"
  text_muted: "#697586"
  text_inverse: "#FFFFFF"
  accent: "#3158C7"
  accent_hover: "#274AB0"
  accent_pressed: "#1E3D95"
  accent_soft: "#EAF0FF"
  accent_line: "#BFCDF5"
```

### Canonical dark palette

Dark mode is optional for the public website and appropriate for Workbench, code, technical demonstrations, and user preference.

```yaml
color_dark:
  canvas: "#0D1118"
  surface: "#141A24"
  surface_subtle: "#1A2230"
  surface_strong: "#222C3C"
  border_subtle: "#293446"
  border: "#354156"
  border_strong: "#4A5870"
  text_primary: "#F5F7FA"
  text_secondary: "#B6C0CD"
  text_muted: "#8995A6"
  text_inverse: "#111827"
  accent: "#7D9AF2"
  accent_hover: "#91AAF4"
  accent_pressed: "#A6BAF6"
  accent_soft: "#1C2B52"
  accent_line: "#3B579B"
```

### Semantic colors

Semantic colors are not part of the brand palette. Use them only for explicit system meaning.

```yaml
semantic:
  success:
    foreground: "#176B4A"
    background: "#E9F6F0"
  warning:
    foreground: "#8A5200"
    background: "#FFF3DD"
  error:
    foreground: "#A82A22"
    background: "#FDEDEC"
  information:
    foreground: "#3158C7"
    background: "#EAF0FF"
  neutral:
    foreground: "#5D6878"
    background: "#F1F3F6"
```

Never communicate status by color alone. Combine color with a label, icon, shape, or pattern.

## Layout and grid

```yaml
layout:
  max_page_width: "1440px"
  max_content_width: "1280px"
  max_reading_width: "800px"
  desktop_columns: 12
  tablet_columns: 8
  mobile_columns: 4
  desktop_gutter: "32px"
  tablet_gutter: "24px"
  mobile_gutter: "20px"
  major_section_padding_desktop: "clamp(7rem, 11vw, 11rem)"
  major_section_padding_mobile: "5rem"
```

Large sections may use full-viewport composition, but readable text must remain constrained.

## Spacing

Use a 4px base grid with an 8px dominant rhythm.

```yaml
space:
  1: "4px"
  2: "8px"
  3: "12px"
  4: "16px"
  6: "24px"
  8: "32px"
  12: "48px"
  16: "64px"
  20: "80px"
  24: "96px"
  32: "128px"
  40: "160px"
```

## Shape and depth

### Radius

```yaml
radius:
  xs: "4px"
  sm: "6px"
  md: "10px"
  lg: "16px"
  xl: "24px"
  pill: "999px"
```

Buttons and inputs use `sm` or `md`. Product canvases may use `lg`. Pills are limited to statuses, compact filters, and tags.

### Borders

Structure should rely more on borders, spacing, and contrast than on shadow.

```yaml
border:
  standard: "1px solid var(--border)"
  strong: "1px solid var(--border-strong)"
  hairline: "1px solid color-mix(in srgb, var(--border) 65%, transparent)"
```

### Shadows

```yaml
shadow:
  sm: "0 1px 2px rgb(17 24 39 / 0.05)"
  md: "0 12px 32px rgb(17 24 39 / 0.08)"
  lg: "0 24px 80px rgb(17 24 39 / 0.12)"
```

Use `lg` only for major floating product demonstrations. Do not use colored glow shadows.

## Iconography and graphics

Icons should be:

- outlined;
- geometrically consistent;
- familiar;
- generally 1.5px to 2px stroke;
- free of decorative AI symbolism.

Avoid robot heads, brains, magic wands, generic sparkles, and infinity-loop branding.

The visual vocabulary should derive from the products:

- records;
- evidence;
- sources;
- review gates;
- scope;
- memory relationships;
- repository trees;
- task context;
- validation;
- diffs;
- run state;
- Git history.

## Imagery

Prefer designed product visualizations over stock photography.

Permitted:

- high-fidelity product simulations;
- semantic DOM and SVG diagrams;
- abstract structural compositions derived from product concepts;
- close-up screenshots when the real interface is stable;
- restrained monochrome photography only when it communicates a real customer context.

Avoid generic office photographs and abstract AI imagery.

## Accessibility

WCAG 2.2 AA is the minimum standard.

Requirements:

- normal text contrast at least 4.5:1;
- large text contrast at least 3:1;
- meaningful UI and graphical objects at least 3:1;
- all state meaning available without color;
- full keyboard navigation;
- visible focus;
- support for 200% zoom;
- `prefers-reduced-motion` alternatives;
- no essential content available only through animation.

## Anti-patterns

Do not use:

- neon gradients;
- purple AI glow;
- glass-heavy layouts;
- floating 3D brains or robots;
- excessive pills;
- decorative motion without explanatory value;
- large blocks of centered body copy;
- product-specific unrelated color themes;
- low-contrast gray text for ordinary content;
- continuous ambient animation;
- scroll hijacking;
- fake terminal interfaces where a real product visual would be clearer.

## Machine-readable invariants

```yaml
prochat_global_design:
  version: 1
  status: canonical
  fonts:
    primary: "Golos Text"
    technical: "JetBrains Mono"
    secondary: null
  palette:
    mode: "grayscale-plus-one-accent"
    accent: "#3158C7"
    product_specific_accents: false
  website_default_mode: light
  design_character:
    - reliable
    - trustworthy
    - stable
    - clean
    - minimal
    - logical
    - structural
    - simple
    - premium
  hierarchy_priority:
    - layout
    - typography
    - spacing
    - border
    - motion
    - shadow
    - decoration
  accessibility_minimum: "WCAG 2.2 AA"
  prohibited:
    - neon AI gradients
    - purple glow branding
    - excessive glassmorphism
    - generic AI imagery
    - decorative continuous motion
    - scroll hijacking
    - product-specific unrelated themes
```

## Research basis

- Apple Human Interface Guidelines: motion should clarify relationships, preserve continuity, respond to accessibility preferences, and avoid unnecessary movement.
- W3C WCAG 2.2: contrast, non-color state communication, keyboard support, and reduced-motion accommodation.
- Web platform guidance: animate transform and opacity where possible and prevent animation-driven layout shifts.
- Mature design systems such as Carbon demonstrate the value of dominant neutrals, one primary interaction color, and strictly semantic status colors.

Research references are recorded in `website-visual-motion-system.md`.
