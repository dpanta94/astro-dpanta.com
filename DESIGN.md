---
name: Dimi
description: Personal site and blog of Dimitris Pantazis, read under one warm lamp.
colors:
  lantern-amber: "#d97706"
  lantern-amber-day: "#b45309"
  lantern-glow: "rgba(217, 119, 6, 0.12)"
  lantern-glow-day: "rgba(180, 83, 9, 0.1)"
  inkwell: "#0c0a09"
  night-stone: "#1c1917"
  stone-rule: "#292524"
  paper-ink: "#f5f0e8"
  pebble: "#a8a29e"
  linen: "#f8f5f0"
  page-white: "#ffffff"
  linen-rule: "#e7e0d8"
  river-stone: "#57534e"
typography:
  display:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "clamp(2.8rem, 9vw, 4.2rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "clamp(2.2rem, 7vw, 3.5rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "1.4rem"
    fontWeight: 700
    lineHeight: 1.375
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Inter, Helvetica Neue, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.8
  lead:
    fontFamily: "Inter, Helvetica Neue, sans-serif"
    fontSize: "1.1rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "JetBrains Mono, Menlo, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    letterSpacing: "0.1em"
rounded:
  sm: "4px"
  lg: "8px"
  full: "9999px"
spacing:
  gutter: "clamp(1.25rem, 5vw, 2.5rem)"
  column: "640px"
  section: "3rem"
components:
  nav-link:
    textColor: "{colors.pebble}"
    typography: "{typography.label}"
  nav-link-active:
    textColor: "{colors.lantern-amber}"
    typography: "{typography.label}"
  tag:
    backgroundColor: "{colors.lantern-glow}"
    textColor: "{colors.lantern-amber}"
    rounded: "{rounded.sm}"
    padding: "0.2em 0.65em"
  email-box:
    backgroundColor: "{colors.night-stone}"
    textColor: "{colors.lantern-amber}"
    rounded: "{rounded.sm}"
    padding: "16px 20px"
  copy-button:
    textColor: "{colors.pebble}"
    rounded: "{rounded.sm}"
    padding: "4px 10px"
  copy-button-hover:
    textColor: "{colors.lantern-amber}"
  tech-chip:
    backgroundColor: "{colors.night-stone}"
    textColor: "{colors.pebble}"
    rounded: "{rounded.sm}"
    padding: "6px 12px"
  code-block:
    backgroundColor: "{colors.night-stone}"
    rounded: "{rounded.lg}"
    padding: "24px"
  blockquote:
    backgroundColor: "{colors.night-stone}"
    textColor: "{colors.pebble}"
    padding: "20px 24px"
---

# Design System: Dimi

## Overview

**Creative North Star: "The Lamplit Notebook"**

dpanta.com reads like a working notebook opened under one warm lamp. The ground is dark stone by default, with a warm-linen day theme. One amber light picks out everything a reader can act on: links, the active page, tags, the email address. Headlines are set in a high-contrast serif. Body text is a calm sans on a single narrow column. Small mono labels sit in the margins like notes: dates, nav, tags. Nothing competes with the writing.

The mood is warm, quiet and personal. Warm means every neutral leans toward stone and paper, never cold gray or blue. Quiet means one column, lots of space, flat surfaces, and motion that barely announces itself (300ms entrances, 8px of travel). Personal means it belongs to a person, not a firm: a drop cap opens each post, captions are italic, and the One Piece salute and the "Lok'tar ogar" sign-off are part of the system, not decoration to tidy away.

Both themes are first-class. Dark is the default unless the visitor's system prefers light. A toggle in the header switches with a single whole-page crossfade.

**Key Characteristics:**
- One 640px column on every page; only post hero images break out of it.
- One accent, Lantern Amber, reserved for things you can act on and for the current place.
- Flat surfaces: depth comes from surface tone and 1px rules, never shadows.
- Three type voices: serif for headings, sans for reading, mono for labels and metadata.
- Short, small motion that respects reduced-motion settings.

## Colors

A warm stone-and-paper palette with a single amber light; each theme redefines the same roles.

### Primary
- **Lantern Amber** (#d97706 at night, #b45309 by day): the only accent. Used for links, the active nav item and its dot, tags, the drop cap, the email address, focus outlines and hover borders. The day value is darker so links keep 4.5:1 contrast on Linen.
- **Lantern Glow** (rgba(217, 119, 6, 0.12) at night, rgba(180, 83, 9, 0.1) by day): a faint amber tint for tag fills, text selection and the post-list hover sweep.

### Neutral
- **Inkwell** (#0c0a09): the night page ground.
- **Night Stone** (#1c1917): raised surfaces at night (email box, code, blockquotes, chips), and the text color by day.
- **Stone Rule** (#292524): hairline rules and borders at night.
- **Paper Ink** (#f5f0e8): headings and strong text at night.
- **Pebble** (#a8a29e): body and secondary text at night, nav labels, metadata.
- **Linen** (#f8f5f0): the day page ground, and the browser theme color by day.
- **Page White** (#ffffff): raised surfaces by day.
- **Linen Rule** (#e7e0d8): hairline rules and borders by day.
- **River Stone** (#57534e): body and secondary text by day.

### Named Rules
**The One Lamp Rule.** Lantern Amber is the only accent. It marks what you can act on and where you are, and nothing else. Never add a second accent hue, and never use amber as a large fill.

**The Two Themes Rule.** Every color is a role defined twice, once per theme, through the `--theme-*` custom properties. Never hard-code a color that only works in one theme.

## Typography

**Display Font:** Playfair Display (with Georgia, serif)
**Body Font:** Inter (with Helvetica Neue, sans-serif)
**Label/Mono Font:** JetBrains Mono (with Menlo, monospace)

**Character:** A high-contrast serif carries every heading. Plain Inter does the reading. Small mono labels set in tracked uppercase handle dates, nav and tags. All three are self-hosted at build time, in only the weights the CSS uses.

### Hierarchy
- **Display** (700, clamp(2.8rem, 9vw, 4.2rem), 1.15): the name on the home page only.
- **Headline** (700, clamp(2.2rem, 7vw, 3.5rem), 1.15): page titles on About and Work. Post titles are a step smaller (clamp(2rem, 6vw, 2.8rem)), and the blog index title is clamp(2rem, 6vw, 3rem).
- **Title** (700, 1.35–1.4rem, snug): post titles in lists and the questions on the Work page. In-article headings use 1.5rem (h2) and 1.25rem (h3).
- **Body** (400, 15px, 1.8): all reading text. Paragraphs are capped at 50–58ch.
- **Lead** (400, 1.1rem, relaxed): the intro paragraph under a page title.
- **Label** (400, 0.68–0.75rem, tracking 0.04–0.14em, uppercase): nav, dates, the footer, the home greeting and the Copy button. Tags use the same face in lowercase.

### Named Rules
**The Three Voices Rule.** Serif speaks, sans explains, mono annotates. Never set reading text in mono, and never use mono only to look technical. It's for labels, metadata, code and the email address.

**The Drop Cap Rule.** The first paragraph of every post opens with an amber serif drop cap (3.4em). Only post bodies get one.

## Layout

A single centered column, 640px wide, with a fluid side gutter (clamp(1.25rem, 5vw, 2.5rem)). The header puts the nav on the left and the social icons and theme toggle on the right. The footer splits copyright and sign-off across one line, and stacks them under 480px. Pages leave generous space between sections (about 3rem), with more space above a heading than below it. Post hero images are the one exception to the column: they break out to as much as 900px wide.

Under 480px the header tightens (smaller padding, a 16px gap between nav links), and the "Work with me" nav label shortens to "Work" so the nav stays on one line beside the icons.

### Named Rules
**The One Column Rule.** Everything reads in the 640px column. Don't add sidebars, multi-column grids or full-bleed sections. A breakout is reserved for a post's hero image.

## Elevation & Depth

The system is flat. Depth comes from tone: raised surfaces (email box, code, blockquotes, tech chips) sit one step lighter than the ground at night, or white on linen by day, and are outlined with a 1px rule. There are no drop shadows anywhere. The single glow is the 6px amber halo on the active nav dot.

### Named Rules
**The Flat Notebook Rule.** No drop shadows. Separate things with surface tone and a 1px rule. The active-nav glow is the only exception.

## Shapes

Small, softened corners: 4px on chips, tags, the email box, buttons and inline code. Images, code blocks and post heroes use 8px. Circles are reserved for the headshot, the active-nav dot and the theme toggle. Borders are 1px hairlines in the theme's rule color. Hover turns them amber.

## Components

The feel is warm and soft: tinted fills instead of hard outlines, and hovers that change color and fade rather than jump. Press feedback is a gentle shrink.

### Navigation
- **Style:** mono uppercase labels (0.75rem, 0.1em tracking) in Pebble, 28px apart.
- **Active:** amber text and a 4px amber dot under the label, with a soft glow.
- **Hover:** text brightens to Paper Ink. Social icons sit at 50% opacity, go to 100% on hover, and lift 2px on devices with a mouse.
- **Theme toggle:** a sun or moon icon in a round hit area. It turns amber on hover, tilts 15° on devices with a mouse, and shrinks to 0.95 when pressed.

### Links
- Amber text. In body copy they get a thin underline (amber at 30% opacity). On hover, the text and underline shift toward ink over 200ms.
- **Focus:** a 2px amber outline, offset 2px.

### Tags
- **Style:** lowercase mono on a Lantern Glow fill with 4px corners.
- **Hover:** the fill deepens to 25% amber and an amber border appears.

### Post List
- Ruled rows: a serif title, a mono date and a short description.
- **Hover:** a Lantern Glow gradient sweeps in from the left (200ms) and the title turns amber. Only on devices with a mouse.
- **Entrance:** rows fade up in a 40ms stagger, with at most 0.2s of total delay.

### Email Box (signature)
- The hiring page's one object: a Night Stone surface with a 1px rule and 4px corners, holding the address as an amber mono `mailto:` link and a Copy button.
- **Copy button:** mono uppercase label in a 1px rule border, fixed width (13ch) so Copy, Copied and Selected never change its size. It turns amber on hover and shrinks to 0.97 when pressed. If the clipboard fails, it selects the address instead.

### Author Box
- Sits under every post, separated by a rule: a 64px round headshot with a 1px rule border, beside a short bio in muted text with amber links.

### Code
- **Inline:** mono at 0.86em on Night Stone, with a 1px rule border and 4px corners.
- **Blocks:** Night Stone, a 1px rule border, 8px corners and 24px padding. Long lines scroll sideways.

### Blockquote
- Italic muted text on Night Stone with 20px × 24px padding, marked by a 3px Lantern Amber bar on the left.
- **Flagged to revisit:** thick colored side bars are a common cliché. This is the established quote style, so keep it consistent until a quieter treatment replaces it, and don't reuse the bar anywhere else.

### Motion
- Page content fades up 8px over 300ms with a strong ease-out (cubic-bezier(0.22, 1, 0.36, 1)). The home intro staggers its lines by 60ms.
- Hover color changes take 200ms. Press feedback takes 160ms.
- Motion that moves an element on hover only runs on devices with a mouse (`(hover: hover) and (pointer: fine)`).
- Reduced motion turns off animation, transitions, smooth scrolling and the theme crossfade.

## Do's and Don'ts

### Do:
- **Do** use Lantern Amber only for links, the current page, tags, focus and the email address (The One Lamp Rule).
- **Do** define every new color as a `--theme-*` role with a value for each theme (The Two Themes Rule).
- **Do** keep reading text at 15px Inter with 1.8 line height, capped at 50–58ch.
- **Do** separate surfaces with tone and a 1px rule (The Flat Notebook Rule).
- **Do** keep entrances at or under 300ms, with 8px or less of travel, and limit hover motion to devices with a mouse.
- **Do** keep the personal touches: drop caps, italic captions, the One Piece salute and the footer sign-off.

### Don't:
- **Don't** add drop shadows, glows (beyond the active-nav dot), glass or gradient text.
- **Don't** add a second accent color or use amber as a large fill.
- **Don't** set reading text in mono, or use mono as a "technical" costume.
- **Don't** break the 640px column with sidebars or grids.
- **Don't** reuse the blockquote's thick amber bar on cards, alerts or list items.
- **Don't** add a label above a page heading. The home page's "Hello, I'm" greeting is the one existing case. Don't copy it.
