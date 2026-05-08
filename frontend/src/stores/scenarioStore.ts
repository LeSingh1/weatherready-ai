import { create } from 'zustand'
import type { ScenarioId } from '@/types/city.types'

interface ScenarioStore {
  activeScenario: ScenarioId
  setScenario: (scenario: string) => void
  scenarioColors: Record<ScenarioId, string>
  scenarioLabels: Record<ScenarioId, string>
}

export const scenarioColors: Record<ScenarioId, string> = {
  balanced: '#2E86C1',
  max_growth: '#C0392B',
  climate_resilient: '#17A589',
  equity_focused: '#7D6608',
  transit_first: '#8E44AD',
  emergency_ready: '#E74C3C',
}

export const scenarioLabels: Record<ScenarioId, string> = {
  balanced: 'Balanced Resilience',
  emergency_ready: 'Heat Wave',
  climate_resilient: 'Flood Event',
  equity_focused: 'Wildfire Smoke',
  transit_first: 'Storm Disruption',
  max_growth: 'Growth Stress Test',
}

export const scenarioWeatherContext: Record<ScenarioId, { headline: string; riskZones: string; focus: string }> = {
  balanced: {
    headline: 'Balanced Resilience — All Hazards',
    riskZones: 'All risk zones active: heat, flood, smoke, storm, and emergency access gaps.',
    focus: 'Plan addresses heat, flood, emergency access, shelter, and transit resilience gaps together.',
  },
  emergency_ready: {
    headline: 'Heat Wave Scenario',
    riskZones: 'Heat risk zones and cooling center gaps highlighted.',
    focus: 'Priority: cooling centers, shaded corridors, and emergency access for heat-exposed districts.',
  },
  climate_resilient: {
    headline: 'Flood Event Scenario',
    riskZones: 'Flood vulnerable zones and emergency response gaps highlighted.',
    focus: 'Priority: elevated shelter sites, emergency clinics, and flood-safe transit routes.',
  },
  equity_focused: {
    headline: 'Wildfire Smoke Scenario',
    riskZones: 'Smoke shelter access gaps and indoor refuge deficits highlighted.',
    focus: 'Priority: indoor shelter access, air filtration centers, and smoke-resilient transit.',
  },
  transit_first: {
    headline: 'Storm Disruption Scenario',
    riskZones: 'Storm-disrupted transit zones and evacuation gaps highlighted.',
    focus: 'Priority: storm-resilient transit hubs, evacuation routes, and shelter redundancy.',
  },
  max_growth: {
    headline: 'Growth Stress Test',
    riskZones: 'All weather risk zones under maximum population pressure.',
    focus: 'Stress-tests all resilience infrastructure under 35% growth with compound weather risk.',
  },
}

export const useScenarioStore = create<ScenarioStore>((set) => ({
  activeScenario: 'balanced',
  scenarioColors,
  scenarioLabels,
  setScenario: (scenario) => {
    if (scenario in scenarioLabels) set({ activeScenario: scenario as ScenarioId })
  },
}))
