# WeatherReady AI

> AI resilience planner for cities facing extreme weather.

**Hackathon:** WeatherWise Hack

---

## What It Does

WeatherReady AI helps growing cities identify vulnerable districts, place emergency infrastructure, and prepare future growth for climate and weather risks.

It analyzes Fremon — a simulated city growing 35% over 10 years — under heat waves, floods, wildfire smoke, and storm disruption, then generates a resilience plan that closes gaps and raises Weather Readiness from 58 to 84 while protecting 91,000 residents.

---

## Core Demo Flow

1. **Land on Fremon** — the weather resilience demo city, growing 35% in 10 years
2. **Select a weather scenario** — Heat Wave, Flood Event, Wildfire Smoke, Storm Disruption, or Balanced Resilience
3. **Click Analyze Weather Risks** — AI detects heat risk zones, emergency response gaps, cooling center deficits, shelter access gaps, and transit disruption zones
4. **Review the Copilot** — top weather risk identified with recommendation and reasoning
5. **Apply Full Resilience Plan** — cooling center coverage rings appear, emergency access rings expand, heat risk zones fade, shelter access improves, Weather Readiness Score animates upward
6. **Generate Resilience Report** — full plan with before/after metrics, vulnerable districts, cost, and next steps

---

## Weather Risk Overlays

- Heat Risk Zone
- Flood Vulnerable Zone (simulated)
- Smoke Shelter Access Gap
- Emergency Response Gap
- Transit Disruption Zone
- Cooling Center Gap

---

## Recommended Infrastructure

- South Emergency Gap Clinic
- Central Cooling and Green Corridor
- North Transit Resilience Hub
- East School and Shelter Site
- New Housing Expansion Community Center
- West Evacuation Transit Stop

---

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

---

## Pitch Summary

WeatherReady AI analyzed Fremon under future growth and extreme weather risk, detected emergency, cooling, shelter, and transit gaps, then generated a resilience plan that raises Weather Readiness from 58 to 84 and protects 91,000 residents.

---

## Tech Stack

- **Frontend:** React 18, TypeScript, Vite
- **Map:** Mapbox GL JS via react-map-gl
- **Charts:** D3.js
- **Animations:** Framer Motion
- **Styling:** Tailwind CSS
- **State:** Zustand
- **Icons:** Lucide React

---

## Setup Instructions

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

The app runs fully frontend-only — no backend required for the Fremon demo.

---

## Project Structure

```
weatherready-ai/
  frontend/         # React app (run npm install + npm run dev here)
    src/
      components/   # UI, Map, AI copilot, Layout, Simulation
      data/         # fremonDemo.ts — weather resilience data
      stores/       # Zustand stores (city, simulation, scenario, UI)
      types/        # TypeScript types
  backend/          # FastAPI backend (not required for demo)
```

---

## About

WeatherReady AI is a branch of the UrbanMind platform, rethemed for the WeatherWise Hack to focus on extreme weather city readiness. It uses the same interactive map, coverage ring overlays, before/after metrics, and AI copilot — reframed as an extreme weather city readiness simulator.
