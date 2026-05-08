# WeatherReady AI — WeatherWise Hack Submission

**Project:** WeatherReady AI
**Hackathon:** WeatherWise Hack
**Tagline:** AI resilience planner for cities facing extreme weather.
**Repo:** https://github.com/LeSingh1/weatherready-ai

---

## Problem

Growing cities face compounding extreme weather risks — heat waves, floods, wildfire smoke, and storm disruptions — but emergency, cooling, and shelter infrastructure is rarely placed where future residents will be most exposed. Fremon, growing 35% over 10 years, has emergency response gaps, no central cooling refuge, and storm-vulnerable transit corridors.

## Solution

WeatherReady AI is an interactive city resilience planner. It analyzes a city under future growth and extreme weather risk, identifies vulnerable districts, and generates a resilience plan that adds emergency clinics, cooling corridors, shelter sites, and storm-resilient transit hubs.

## Demo Flow

1. Open WeatherReady AI on Fremon (35% growth over 10 years)
2. Pick a weather scenario: Heat Wave, Flood Event, Wildfire Smoke, Storm Disruption, or Balanced Resilience
3. Click **Analyze Weather Risks** — six weather risk overlays appear (heat zones, flood zones, smoke gaps, emergency gaps, transit disruption zones, cooling gaps)
4. Review the AI Copilot — top weather risk + recommended infrastructure + reasoning
5. Click **Apply Full Resilience Plan** — coverage rings expand, heat zones fade, Weather Readiness Score animates 58 → 84
6. Generate the **Resilience Report** — full 9-section plan with before/after metrics and pitch summary

## Recommended Infrastructure

- South Emergency Gap Clinic
- Central Cooling and Green Corridor
- North Transit Resilience Hub
- East School and Shelter Site
- New Housing Expansion Community Center
- West Evacuation Transit Stop

## Before / After Metrics

| Metric | Before | After |
|---|---|---|
| Weather Readiness Score | 58 | 84 |
| Emergency Access | 55 | 79 |
| Cooling Access | 44 | 76 |
| Shelter Access | 51 | 78 |
| Transit Resilience | 48 | 72 |
| Green Space | 52 | 74 |
| Residents Protected | 31,000 | 91,000 |
| Avg Response Time | 12.4 min | 8.1 min |

## Pitch Summary

WeatherReady AI analyzed Fremon under future growth and extreme weather risk, detected emergency, cooling, shelter, and transit gaps, then generated a resilience plan that raises Weather Readiness from 58 to 84 and protects 91,000 residents.

## Tech Stack

React 18 · TypeScript · Vite · Mapbox GL · D3.js · Framer Motion · Tailwind CSS · Zustand

## Run Locally

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173
