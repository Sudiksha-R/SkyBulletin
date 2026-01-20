# SkyBulletin — Design Decisions

## Product idea
SkyBulletin is a UX-first weather dashboard designed around real planning needs:
- **Current**: where I am now (today’s reality)
- **Next**: where I’m going soon (travel / commute destination)
- **Home**: where I care about long-term (family / base location)
This triad supports “compare + plan” better than a single-city weather app.

## Information architecture
- Tabs: **Today / 5-Day / Monthly**
  - Today: quick decisions (what to wear, commute)
  - 5-Day: planning and packing
  - Monthly: macro view (trend + expectations)

## Hierarchy & spacing system
- Primary: current temperature + condition (single glance)
- Secondary: feels-like / wind / humidity / AQI (decision support)
- Tertiary: forecast cards (pattern recognition)
Spacing:
- Large spacing between sections to reduce cognitive load
- Consistent card padding + border radius to create scanable blocks

## Theme system (visual language)
SkyBulletin uses theme tokens (CSS variables) driven by weather conditions to:
- reinforce context quickly (e.g., clear vs storm)
- maintain readability (contrast-first)
- keep design scalable (themes are data-driven, not hardcoded per component)

## Accessibility decisions
- Skip link for keyboard users
- Semantic landmarks (header/main/section)
- Clear focus states
- ARIA labels for controls and tabs
- Error + offline states use `role="status"` / `role="alert"` appropriately

## UX states philosophy
Weather is “data-dependent UI,” so states are part of the experience:
- Skeleton loading reduces perceived wait time
- Empty states guide first-time users
- Error states provide recovery (Retry)
- Offline state communicates trust: "this is cached / last updated at X"

## What’s next (Roadmap)
- Optional live data integration (Open-Meteo)
- City search + geocoding
- Saved city reordering + pinning
- PWA caching for offline-first behavior
