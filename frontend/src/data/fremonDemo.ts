import type {
  AIRecommendation,
  BudgetLevel,
  BudgetSummary,
  DistrictProfile,
  GrowthPressureZone,
  InfrastructureCategory,
  InfrastructureItem,
  PlacementSuggestion,
  PlanBattlePlan,
  PlanningScores,
  TimelineYear,
  UnderservedZone,
} from '@/types/city.types'

const createdAt = '2026-01-01T00:00:00.000Z'

export const FREMON_CITY_ID = 'fremon'
export const FREMON_GROWTH_PERCENT = 35
export const FREMON_HORIZON_YEARS = 10
export const FREMON_POPULATION = 420_000

// Field mapping for WeatherReady AI display:
//   cityHealth       → Weather Readiness Score
//   emergencyAccess  → Emergency Access
//   transitCoverage  → Cooling Access
//   housingAccess    → Shelter Access
//   equityScore      → Transit Resilience
//   greenSpace       → Green Space
//   populationServed → Residents Protected
//   averageCommute   → Avg Response Time (min)

export const FREMON_BASE_METRICS: PlanningScores = {
  cityHealth: 58,
  emergencyAccess: 55,
  transitCoverage: 44,
  housingAccess: 51,
  greenSpace: 52,
  averageCommute: 12,
  co2Estimate: 100,
  equityScore: 48,
  congestionRisk: 72,
  congestion: 72,
  educationAccess: 58,
  fifteenMinuteCityScore: 54,
  walkability: 57,
  populationServed: 31_000,
  serviceGapCount: 6,
  totalEstimatedCost: 0,
}

export const FREMON_BALANCED_METRICS: PlanningScores = {
  cityHealth: 74,
  emergencyAccess: 69,
  transitCoverage: 64,
  housingAccess: 68,
  greenSpace: 65,
  averageCommute: 10,
  co2Estimate: 88,
  equityScore: 61,
  congestionRisk: 58,
  congestion: 58,
  educationAccess: 70,
  fifteenMinuteCityScore: 67,
  walkability: 68,
  populationServed: 58_000,
  serviceGapCount: 2,
  totalEstimatedCost: 70_000_000,
}

export const FREMON_TRANSIT_FIRST_METRICS: PlanningScores = {
  cityHealth: 76,
  emergencyAccess: 65,
  transitCoverage: 72,
  housingAccess: 66,
  greenSpace: 61,
  averageCommute: 9,
  co2Estimate: 80,
  equityScore: 72,
  congestionRisk: 49,
  congestion: 49,
  educationAccess: 68,
  fifteenMinuteCityScore: 71,
  walkability: 73,
  populationServed: 62_000,
  serviceGapCount: 3,
  totalEstimatedCost: 91_000_000,
}

export const FREMON_EQUITY_FIRST_METRICS: PlanningScores = {
  cityHealth: 84,
  emergencyAccess: 79,
  transitCoverage: 76,
  housingAccess: 78,
  greenSpace: 74,
  averageCommute: 8,
  co2Estimate: 84,
  equityScore: 72,
  congestionRisk: 54,
  congestion: 54,
  educationAccess: 81,
  fifteenMinuteCityScore: 79,
  walkability: 78,
  populationServed: 91_000,
  serviceGapCount: 1,
  totalEstimatedCost: 137_000_000,
}

export const FREMON_EXISTING_INFRASTRUCTURE: InfrastructureItem[] = [
  point('fremon-central-clinic', 'Fremon Civic Clinic', 'clinic', [-122.010, 37.541], 'Existing clinic is central but leaves south heat and emergency risk zones uncovered.', 0, 70, 0.82),
  point('fremon-north-bus-hub', 'North Loop Bus Hub', 'transit_stop', [-121.998, 37.594], 'Low-frequency transit anchor. Vulnerable to storm and smoke disruption without redundancy.', 0, 64, 0.78),
  point('fremon-east-school', 'Eastside Learning Center', 'school', [-121.928, 37.546], 'Existing education capacity east of downtown, also functions as a community shelter but below demand.', 0, 66, 0.8),
  point('fremon-central-park', 'Civic Commons Park', 'park', [-121.982, 37.560], 'Central open-space anchor, too small to provide cooling refuge for 35% projected growth.', 0, 62, 0.77),
  point('fremon-fire-west', 'West Response Station', 'fire_station', [-122.046, 37.552], 'Fire and emergency response station, over-extended during extreme weather events.', 0, 72, 0.84),
  point('fremon-police-core', 'Fremon Safety Center', 'police_station', [-121.979, 37.538], 'Public safety office near the civic core.', 0, 74, 0.86),
  point('fremon-innovation', 'Innovation District', 'commercial_zone', [-121.950, 37.572], 'Employment growth district with daytime population heat exposure pressure.', 0, 68, 0.82),
  point('fremon-housing-expansion', 'New Housing Expansion Zone', 'housing_zone', [-121.940, 37.506], 'Projected housing growth needs cooling centers, shelters, clinics, and emergency access.', 0, 65, 0.84),
]

export const FREMON_AI_RECOMMENDATIONS: InfrastructureItem[] = [
  point('fremon-ai-south-clinic', 'South Emergency Gap Clinic', 'clinic', [-121.995, 37.493], 'Closes the largest emergency and heat response gap for South Fremon growth households.', 18_000_000, 92, 0.87, 'ai_recommended'),
  point('fremon-ai-east-school', 'East School and Shelter Site', 'school', [-121.918, 37.550], 'Adds classroom capacity and dual-use emergency shelter near East Fremon residential growth.', 32_000_000, 88, 0.85, 'ai_recommended'),
  point('fremon-ai-north-transit', 'North Transit Resilience Hub', 'transit_stop', [-121.998, 37.604], 'Places storm-resilient frequent transit service at the north-side access gap.', 39_000_000, 90, 0.84, 'ai_recommended'),
  point('fremon-ai-central-green', 'Central Cooling and Green Corridor', 'park', [-121.970, 37.556], 'Adds walkable cooling refuge and shaded open space at the central heat-exposure deficit.', 14_000_000, 82, 0.82, 'ai_recommended'),
  point('fremon-ai-mixed-use', 'New Housing Expansion Community Center', 'community_center', [-121.934, 37.514], 'Adds cooling center, shelter services, and community resilience support near new housing.', 28_000_000, 80, 0.8, 'ai_recommended'),
  point('fremon-ai-west-mobility-hub', 'West Evacuation Transit Stop', 'transit_stop', [-122.055, 37.548], 'Adds an evacuation-capable mobility point where the west district has storm and smoke exposure.', 6_000_000, 74, 0.79, 'ai_recommended'),
]

export const FREMON_UNDERSERVED_ZONES: UnderservedZone[] = [
  zone('fremon-north-transit-gap', 'North Transit Disruption Zone', 'transit_access', [37.604, -121.998], 1550, 0.84, 'North district has poor storm-resilient transit coverage as population grows.', 40, ['fremon-ai-north-transit']),
  zone('fremon-east-education-gap', 'East School and Shelter Gap', 'school_access', [37.550, -121.918], 1450, 0.88, 'East district lacks dual-use shelter and classroom capacity under growth.', 37, ['fremon-ai-east-school']),
  zone('fremon-south-emergency-gap', 'South Emergency Gap', 'emergency_access', [37.493, -121.995], 1600, 0.92, 'South district has no clinic or emergency response coverage during extreme weather.', 34, ['fremon-ai-south-clinic']),
  zone('fremon-central-green-gap', 'Cooling Center Gap', 'green_space', [37.556, -121.970], 1300, 0.74, 'Central district lacks walkable cooling refuge and shaded green space under heat risk.', 46, ['fremon-ai-central-green']),
  zone('fremon-west-congestion-zone', 'Smoke Shelter Access Gap', 'congestion', [37.548, -122.055], 1500, 0.82, 'West district has limited indoor shelter access during wildfire smoke events.', 39, ['fremon-ai-west-mobility-hub', 'fremon-ai-north-transit']),
  zone('fremon-housing-utility-gap', 'New Housing Expansion Zone', 'housing_access', [37.514, -121.934], 1450, 0.8, 'New housing needs nearby cooling centers, emergency access, and shelter services.', 43, ['fremon-ai-mixed-use', 'fremon-ai-south-clinic']),
]

export const FREMON_GROWTH_PRESSURE_ZONES: GrowthPressureZone[] = [
  { id: 'fremon-growth-south', name: 'South District Heat Risk Zone', center: [37.493, -121.995], radiusMeters: 1600, pressure: 'high', projectedGrowthPercent: 38, reason: 'High heat exposure combined with new housing concentration and no nearby cooling infrastructure.' },
  { id: 'fremon-growth-east', name: 'East Flood Vulnerable Zone', center: [37.550, -121.918], radiusMeters: 1500, pressure: 'high', projectedGrowthPercent: 36, reason: 'Low-lying family housing area with simulated flood exposure under 35% growth.' },
  { id: 'fremon-growth-north', name: 'North Transit Disruption Zone', center: [37.604, -121.998], radiusMeters: 1400, pressure: 'medium', projectedGrowthPercent: 28, reason: 'North district transit is storm-vulnerable and constrained under growth.' },
  { id: 'fremon-growth-west', name: 'West Smoke Shelter Gap', center: [37.548, -122.055], radiusMeters: 1550, pressure: 'medium', projectedGrowthPercent: 25, reason: 'West residential area has limited indoor shelter access during wildfire smoke events.' },
]

export const FREMON_DISTRICTS: DistrictProfile[] = [
  district('district-north', 'North Transit Disruption Zone', 'Storm-vulnerable transit access', 0.84, 31_000, 'Add storm-resilient transit hub', 40, 72, [37.604, -121.998], 'fremon-north-transit-gap'),
  district('district-east', 'East Flood Vulnerable Zone', 'Shelter and school access shortage', 0.88, 18_000, 'Add dual-use school and shelter site', 37, 78, [37.550, -121.918], 'fremon-east-education-gap'),
  district('district-south', 'South Emergency Gap', 'No clinic or emergency response', 0.92, 22_000, 'Add clinic and emergency coverage', 34, 79, [37.493, -121.995], 'fremon-south-emergency-gap'),
  district('district-central', 'Cooling Center Gap', 'No cooling refuge under heat risk', 0.74, 16_000, 'Add cooling and green corridor', 46, 74, [37.556, -121.970], 'fremon-central-green-gap'),
  district('district-west', 'Smoke Shelter Access Gap', 'Limited indoor shelter during smoke', 0.82, 9_000, 'Add evacuation transit and shelter', 39, 72, [37.548, -122.055], 'fremon-west-congestion-zone'),
  district('district-innovation', 'Innovation District', 'Daytime heat exposure for workers', 0.58, 12_000, 'Add shaded routes and cooling stations', 59, 74, [37.572, -121.950]),
  district('district-housing', 'New Housing Expansion Zone', 'New housing needs resilience services', 0.8, 20_000, 'Add community center with cooling and shelter', 43, 78, [37.514, -121.934], 'fremon-housing-utility-gap'),
  district('district-industrial', 'Industrial Edge', 'Smoke and heat exposure risk', 0.52, 7_000, 'Buffer with green corridor and shelter', 57, 64, [37.515, -122.035]),
]

export const FREMON_PLAN_BATTLE: PlanBattlePlan[] = [
  {
    id: 'balanced',
    label: 'Plan A: Balanced Resilience',
    summary: 'Fixes the highest-severity weather gaps with clinic, cooling corridor, evacuation transit, and shelter sites.',
    tradeoff: 'Moderate gains across all weather metrics, but transit resilience and cooling access improve less dramatically.',
    cost: 70_000_000,
    budgetUsed: 70_000_000,
    populationServed: 58_000,
    gapsFixed: 4,
    isRecommended: false,
    metrics: FREMON_BALANCED_METRICS,
    featureIds: ['fremon-ai-south-clinic', 'fremon-ai-east-school', 'fremon-ai-central-green', 'fremon-ai-west-mobility-hub'],
  },
  {
    id: 'transit_first',
    label: 'Plan B: Storm and Transit Resilience',
    summary: 'Prioritizes storm-resilient transit hubs, evacuation stops, and community shelter nodes.',
    tradeoff: 'Best transit resilience outcome, but leaves some emergency and cooling gaps open.',
    cost: 91_000_000,
    budgetUsed: 91_000_000,
    populationServed: 62_000,
    gapsFixed: 3,
    isRecommended: false,
    metrics: FREMON_TRANSIT_FIRST_METRICS,
    featureIds: ['fremon-ai-north-transit', 'fremon-ai-mixed-use', 'fremon-ai-west-mobility-hub', 'fremon-ai-central-green'],
  },
  {
    id: 'equity_first',
    label: 'Plan C: Full Resilience Plan',
    summary: 'Targets the most severe weather-exposed districts first, then connects them with transit and cooling infrastructure.',
    tradeoff: 'Highest cost, but closes all emergency, cooling, shelter, and transit gaps while protecting 91,000 residents.',
    cost: 137_000_000,
    budgetUsed: 137_000_000,
    populationServed: 91_000,
    gapsFixed: 5,
    isRecommended: true,
    reason: 'Full Resilience Plan closes the most severe weather exposure gaps while raising Weather Readiness from 58 to 84.',
    metrics: FREMON_EQUITY_FIRST_METRICS,
    featureIds: FREMON_AI_RECOMMENDATIONS.map((item) => item.id),
  },
]

export const FREMON_TOP_RECOMMENDATION: AIRecommendation = {
  id: 'fremon-top-recommendation',
  title: 'Add South Emergency Gap Clinic and Central Cooling Corridor',
  zoneName: 'South Emergency Gap',
  locationName: 'South Emergency Gap',
  infrastructureType: 'clinic',
  coordinates: [-121.995, 37.493],
  reason: 'A 35 percent growth scenario increases heat and emergency response exposure for 22,000 residents. South Emergency Gap lacks clinic and emergency response coverage during extreme weather.',
  expectedImpact: {
    emergencyAccess: 24,
    cityHealth: 26,
    averageResponseTime: -4,
    equityScore: 24,
    populationServed: 22000,
  },
  estimatedCost: 18_000_000,
  costEstimate: 18_000_000,
  confidence: 0.91,
  relatedGapIds: ['fremon-south-emergency-gap'],
  featuresToAdd: FREMON_AI_RECOMMENDATIONS,
  itemIds: ['fremon-ai-south-clinic'],
}

export const FREMON_PLACEMENT_SUGGESTIONS: PlacementSuggestion[] = [
  { id: 'suggest-clinic-south', rank: 1, title: 'South Fremon Heat Risk Zone', category: 'clinic', coordinates: [-121.995, 37.493], expectedImpact: 'Emergency Access +18', costEstimate: 18_000_000, reason: 'Best clinic location: fills the highest-severity emergency and heat response gap.', confidence: 0.87 },
  { id: 'suggest-clinic-housing', rank: 2, title: 'New Housing Expansion Edge', category: 'clinic', coordinates: [-121.934, 37.514], expectedImpact: 'Emergency Access +12', costEstimate: 16_000_000, reason: 'Serves new housing but is less central to the South Emergency Gap.', confidence: 0.78 },
  { id: 'suggest-clinic-central', rank: 3, title: 'Central-South Connector', category: 'clinic', coordinates: [-121.982, 37.524], expectedImpact: 'Emergency Access +8', costEstimate: 14_000_000, reason: 'Lower-cost option with smaller weather resilience improvement.', confidence: 0.69 },
  { id: 'suggest-school-east', rank: 1, title: 'East Shelter and School Site', category: 'school', coordinates: [-121.918, 37.550], expectedImpact: 'Shelter Access +21', costEstimate: 32_000_000, reason: 'Best dual-use site: close to projected family housing growth and flood exposure zone.', confidence: 0.85 },
  { id: 'suggest-school-housing', rank: 2, title: 'Housing Expansion Shelter Site', category: 'school', coordinates: [-121.934, 37.522], expectedImpact: 'Shelter Access +15', costEstimate: 30_000_000, reason: 'Good site for new families but farther from the flood exposure zone.', confidence: 0.76 },
  { id: 'suggest-school-industrial-buffer', rank: 3, title: 'Industrial Buffer Shelter Site', category: 'school', coordinates: [-122.020, 37.518], expectedImpact: 'Shelter Access +5', costEstimate: 28_000_000, reason: 'Lower confidence because it approaches the industrial smoke edge.', confidence: 0.52 },
]

export const FREMON_TIMELINE: Record<TimelineYear, { population: number; pressure: number; label: string; phase: string; metrics: PlanningScores }> = {
  2026: { population: 420_000, pressure: 1, label: 'Baseline', phase: 'Phase 1: 2026 to 2028 · Add emergency clinics and cooling centers', metrics: FREMON_BASE_METRICS },
  2028: { population: 455_000, pressure: 1.08, label: 'Early growth', phase: 'Phase 1: 2026 to 2028 · Add emergency clinics and cooling centers', metrics: timelineMetrics(56, 51, 43, 67, 49, 11, 108, 45, 79, 55, 50) },
  2030: { population: 490_000, pressure: 1.16, label: 'Weather stress', phase: 'Phase 2: 2028 to 2032 · Add shelter sites and resilient transit', metrics: timelineMetrics(53, 48, 40, 64, 45, 11, 116, 41, 85, 51, 46) },
  2032: { population: 525_000, pressure: 1.26, label: 'High exposure', phase: 'Phase 2: 2028 to 2032 · Add shelter sites and resilient transit', metrics: timelineMetrics(50, 45, 36, 60, 42, 12, 126, 37, 91, 47, 42) },
  2036: { population: 567_000, pressure: 1.38, label: 'Full buildout pressure', phase: 'Phase 3: 2032 to 2036 · Add major transit hubs and cooling corridors', metrics: timelineMetrics(46, 41, 31, 55, 37, 13, 139, 32, 96, 42, 36) },
}

export const FREMON_BUDGET_AMOUNTS: Record<BudgetLevel, number> = {
  low: 25_000_000,
  medium: 75_000_000,
  high: 150_000_000,
}

export const FREMON_BUDGET_FEATURE_IDS: Record<BudgetLevel, string[]> = {
  low: ['fremon-ai-south-clinic', 'fremon-ai-west-mobility-hub'],
  medium: ['fremon-ai-south-clinic', 'fremon-ai-east-school', 'fremon-ai-central-green', 'fremon-ai-west-mobility-hub'],
  high: FREMON_AI_RECOMMENDATIONS.map((item) => item.id),
}

export function getFremonBudgetSummary(level: BudgetLevel): BudgetSummary {
  const amount = FREMON_BUDGET_AMOUNTS[level]
  const items = budgetRecommendations(level)
  const used = items.reduce((sum, item) => sum + item.costEstimate, 0)
  const populationServed = level === 'low' ? 31_000 : level === 'medium' ? 65_000 : 91_000
  const impactPoints = items.reduce((sum, item) => sum + Math.max(1, item.impactScore - 60), 0)
  return {
    level,
    amount,
    used,
    remaining: amount - used,
    costPerImpactPoint: Math.round((used / 1_000_000) / impactPoints * 10) / 10,
    populationServedPerMillion: Math.round(populationServed / Math.max(1, used / 1_000_000)),
    label: level === 'low' ? 'Low Budget: $25M' : level === 'medium' ? 'Medium Budget: $75M' : 'High Budget: $150M',
    guidance: level === 'low'
      ? 'Best impact per dollar: emergency clinic plus west evacuation stop.'
      : level === 'medium'
      ? 'Best impact per dollar while closing emergency, shelter, cooling, and transit resilience gaps.'
      : 'Full resilience plan: emergency clinic, shelter sites, cooling corridor, transit hubs, and community center.',
  }
}

export function budgetRecommendations(level: BudgetLevel): InfrastructureItem[] {
  const ids = FREMON_BUDGET_FEATURE_IDS[level]
  return FREMON_AI_RECOMMENDATIONS.filter((item) => ids.includes(item.id))
}

export function markFremonImprovedZones(featureIds: string[]) {
  return FREMON_UNDERSERVED_ZONES.map((gap) => {
    const improved = gap.improvedBy.some((id) => featureIds.includes(id))
    return {
      ...gap,
      improved,
      isImproved: improved,
      radiusMeters: improved ? Math.round(gap.radiusMeters * 0.58) : gap.radiusMeters,
      severity: improved ? Math.max(0.22, gap.severity * 0.45) : gap.severity,
      afterScore: improved ? Math.min(100, gap.beforeScore + 36) : gap.beforeScore,
      reason: improved ? `${gap.reason} Improved by proposed resilience infrastructure.` : gap.reason,
    }
  })
}

function point(
  id: string,
  name: string,
  category: InfrastructureCategory,
  coordinates: GeoJSON.Position,
  reason: string,
  costEstimate: number,
  impactScore: number,
  confidence: number,
  status: InfrastructureItem['status'] = 'existing',
): InfrastructureItem {
  return { id, name, category, status, source: status === 'existing' ? 'simulation' : 'ai_recommended', coordinates, geometryType: 'Point', geometry: { type: 'Point', coordinates }, reason, costEstimate, impactScore, confidence, createdAt, updatedAt: createdAt }
}

function zone(id: string, name: string, gapType: UnderservedZone['gapType'], center: [number, number], radiusMeters: number, severity: number, reason: string, beforeScore: number, improvedBy: string[]): UnderservedZone {
  return { id, name, gapType, center, radiusMeters, severity, improvedBy, reason, beforeScore, improved: false, isImproved: false }
}

function district(id: string, name: string, mainIssue: string, severity: number, populationAffected: number, recommendedFix: string, beforeScore: number, afterScore: number, center: [number, number], relatedGapId?: string): DistrictProfile {
  return { id, name, mainIssue, severity, populationAffected, recommendedFix, beforeScore, afterScore, center, relatedGapId }
}

function timelineMetrics(
  cityHealth: number,
  emergencyAccess: number,
  transitCoverage: number,
  housingAccess: number,
  greenSpace: number,
  averageCommute: number,
  co2Estimate: number,
  equityScore: number,
  congestionRisk: number,
  educationAccess: number,
  fifteenMinuteCityScore: number,
): PlanningScores {
  return {
    cityHealth,
    emergencyAccess,
    transitCoverage,
    housingAccess,
    greenSpace,
    averageCommute,
    co2Estimate,
    equityScore,
    congestionRisk,
    congestion: congestionRisk,
    educationAccess,
    fifteenMinuteCityScore,
    walkability: Math.round((transitCoverage + greenSpace + fifteenMinuteCityScore) / 3),
    populationServed: 0,
    serviceGapCount: 6,
    totalEstimatedCost: 0,
  }
}
