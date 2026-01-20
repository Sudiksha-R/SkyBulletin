# SkyBulletin

**SkyBulletin** is a UX-first weather dashboard that rethinks how people use weather for *planning*, not just observation.  
Instead of a single-location snapshot, the product is organized around real-life contexts:

- **Current** — where I am now  
- **Next** — where I’m going (commute, travel)  
- **Home** — where I care about long-term  

The project demonstrates product thinking, information architecture, accessibility-first design, and a component-driven front-end system.

🎥 **Prototype Walkthrough (Desktop + Mobile + Themes):**  
[Watch the full video - web mode](./SkyBulletin_web.mp4)

(./SkyBulletin.mp4)[![Mobile mode](https://www.youtube.com/shorts/GFJ6SSkQIXQ)](https://www.youtube.com/shorts/GFJ6SSkQIXQ)


---

## Overview

SkyBulletin explores how weather information can support everyday decision-making:

- What should I wear today?
- Will it rain on my commute?
- What’s the climate like at my destination this week?
- How does my home city compare while I’m traveling?

The interface is structured by **time horizon** (Today, 5-Day, Monthly) and **location context** (Current, Next, Home, Saved), allowing fast comparison with minimal cognitive load.

---

## What I Did as a UX Designer

### Problem Framing
Most weather apps focus on a single location and raw data.  
SkyBulletin reframes weather as a *planning tool* across multiple life contexts.

### Personas & Use Cases
**Commuter**
- Compares current city vs destination
- Needs fast access to rain, temperature, wind

**Traveler**
- Tracks home vs destination
- Uses 5-day and monthly views for packing and scheduling

**Remote Worker**
- Switches between cities frequently
- Saves multiple locations and compares conditions at a glance

### Information Architecture
- **Today** → Immediate decisions (clothing, commute)
- **5-Day** → Short-term planning
- **Monthly** → Pattern recognition and expectation setting

Location context (Current / Next / Home) remains consistent across all views to reduce mental switching.

### Visual Hierarchy & Spacing
- Primary: Temperature and condition
- Secondary: Feels-like, wind, humidity, AQI
- Tertiary: Forecast patterns

Generous spacing and card grouping support quick scanning on both desktop and mobile.

### Accessibility
- Semantic landmarks and skip navigation
- Keyboard-friendly tab system
- Clear focus states
- ARIA roles for dynamic content
- Dedicated loading, empty, error, and offline states

---

## What I Did as a Front-End Builder

### Component System
- Modular card-based layout (CurrentWeather, Forecasts, Settings)
- Reusable UI state components (Skeletons, Empty, Error, Offline)
- Clear separation between layout, state, and presentation

### Theme Engine
- Weather-driven themes using CSS variables
- Centralized theme tokens for color, contrast, and surface elevation
- Instant theme switching without layout shift

### State Management
- Context-based location model (Current / Next / Home / Saved)
- Global settings (units, theme, preferences)
- UI state model for loading, error, success, and offline behavior

### Data Layer (Planned)
- Architecture prepared for live weather APIs (Open-Meteo / OpenWeather)
- Caching, retry, and offline-first UX model designed
- Last-updated indicators for data trust and transparency

---

## UX Artifacts & Documentation

Detailed design reasoning and system structure are documented in:

- 📐 [Design Decisions](docs/design-decisions.md)  
- 🔁 [User Flows](docs/user-flows.md)  
- 🧩 [Component Inventory](docs/component-inventory.md)

---

## Roadmap

### UX
- City comparison mode
- Pin and reorder saved locations
- Context-aware alerts (rain before commute, heat at destination)

### Front-End
- Live weather integration
- Offline caching (PWA)
- Search with geocoding
- Motion system for theme transitions

---

## About

This project is part of my portfolio.

SkyBulletin showcases:
- Product thinking
- Information architecture
- Accessibility-first design
- Design-token-based theming
- Component-driven front-end structure
- UX state design (loading, empty, error, offline)

## Roadmap

SkyBulletin is designed as a UX-first, production-ready front-end system.  
Future iterations will focus on connecting the interface to live data while preserving the same interaction and accessibility standards.

Planned next steps:

- Real weather data integration (Open-Meteo / OpenWeather API)
  - Current conditions, hourly and 5-day forecast
  - City search and geocoding
  - Cached responses with “last updated” logic
- Progressive Web App (offline-first, installable)
- Motion design for state transitions (skeleton → content, tab changes, theme transitions)
- Reorderable and pinnable saved locations
