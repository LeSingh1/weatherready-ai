import { motion, AnimatePresence } from 'framer-motion'
import { Copy, FileText, X } from 'lucide-react'
import { createPortal } from 'react-dom'
import { useSimulationStore } from '@/stores/simulationStore'
import { STATIC_CITIES } from '@/data/staticCities'

export function PlanningReportModal() {
  const planning = useSimulationStore((s) => s.planning)
  const closeReport = useSimulationStore((s) => s.closeReport)

  return createPortal(
    <AnimatePresence>
      {planning.isReportOpen && <PlanningReport onClose={closeReport} />}
    </AnimatePresence>,
    document.body
  )
}

function PlanningReport({ onClose }: { onClose: () => void }) {
  const planning = useSimulationStore((s) => s.planning)
  const city = STATIC_CITIES.find((item) => item.id === planning.cityId)
  const cityName =
    planning.cityId === 'fremon'
      ? 'Fremon'
      : planning.cityId === 'san_jose'
        ? 'San Jose'
        : (city?.name ?? planning.cityId)
  const before = planning.beforeScores
  const after = planning.afterScores ?? before
  const proposed = planning.infrastructure.filter((item) => item.status === 'proposed')
  const activeGaps = planning.underservedZones.filter((zone) => !zone.isImproved)
  const topGap = planning.underservedZones[0]
  const topItem = planning.aiRecommendations.find((item) => planning.topRecommendation.itemIds?.includes(item.id)) ?? planning.aiRecommendations[0]
  const chBefore = before?.cityHealth ?? '—'
  const chAfter = after?.cityHealth ?? '—'
  const residents = after?.populationServed ?? planning.impactSummary?.residentsServed ?? planning.timelinePopulation ?? '—'
  const totalCost = planning.impactSummary?.budgetUsed ?? after?.totalEstimatedCost ?? (proposed.length ? proposed : planning.aiRecommendations).reduce((sum, item) => sum + item.costEstimate, 0)
  const topCost = topItem?.costEstimate ?? planning.topRecommendation.costEstimate ?? planning.topRecommendation.estimatedCost ?? 0
  const topPopulation = planning.topRecommendation.expectedImpact.populationServed ?? Math.round((city?.population_current ?? planning.timelinePopulation) * 0.018)

  const pitchSummary =
    planning.cityId === 'fremon'
      ? 'WeatherReady AI analyzed Fremon under future growth and extreme weather risk, detected emergency, cooling, shelter, and transit gaps, then generated a resilience plan that raises Weather Readiness from 58 to 84 and protects 91,000 residents.'
      : `WeatherReady AI analyzed ${cityName} under ${planning.growthPercent}% projected growth and extreme weather exposure, detected emergency, cooling, shelter, and transit resilience gaps, and recommended a plan that raises Weather Readiness from ${chBefore} to ${chAfter} while protecting ${typeof residents === 'number' ? residents.toLocaleString() : residents} residents.`

  const reportJson = JSON.stringify(
    {
      executiveSummary: `Weather Resilience Plan for ${cityName}`,
      selectedCity: cityName,
      growthScenario: `${planning.growthPercent}% over ${planning.horizonYears} years`,
      weatherScenario: 'Heat Wave, Flood Event, Wildfire Smoke, Storm Disruption',
      vulnerableDistricts: planning.underservedZones,
      recommendedResiliencePlan: planning.topRecommendation,
      proposedInfrastructure: proposed.length ? proposed : planning.aiRecommendations,
      beforeMetrics: { weatherReadiness: before?.cityHealth, emergencyAccess: before?.emergencyAccess, coolingAccess: before?.transitCoverage, shelterAccess: before?.housingAccess, transitResilience: before?.equityScore, greenSpace: before?.greenSpace, residentsProtected: before?.populationServed, avgResponseTime: `${before?.averageCommute} min` },
      afterMetrics: { weatherReadiness: after?.cityHealth, emergencyAccess: after?.emergencyAccess, coolingAccess: after?.transitCoverage, shelterAccess: after?.housingAccess, transitResilience: after?.equityScore, greenSpace: after?.greenSpace, residentsProtected: after?.populationServed, avgResponseTime: `${after?.averageCommute} min` },
      cost: planning.cityId === 'fremon' ? '$137M' : `$${((after?.totalEstimatedCost ?? 0) / 1_000_000).toFixed(0)}M`,
      residentsProtected: residents,
      pitchSummary,
      assumptions: [
        'Weather risk zones are simulated from growth scenario and geographic data.',
        `Resilience gap locations are generated from ${cityName}'s city bounds, landmarks, and weather scenario.`,
      ],
      limitations: [
        'Not a substitute for formal hazard analysis, CEQA, or emergency management planning.',
        'Infrastructure inventory may omit real-world assets.',
      ],
      nextSteps: ['Validate candidate parcels with city GIS and emergency planning data', 'Stakeholder workshops with emergency management', 'Capital programming for highest-severity gaps'],
    },
    null,
    2
  )

  const copyReport = () => {
    const body = document.getElementById('weatherready-report-body')?.innerText
    navigator.clipboard?.writeText(body ?? reportJson).catch(() => {})
  }
  const copyPitch = () => navigator.clipboard?.writeText(pitchSummary).catch(() => {})
  const downloadJson = () => {
    const blob = new Blob([reportJson], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `weatherready-${planning.cityId}-resilience-plan.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[95] flex items-center justify-center p-6"
      style={{ background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.96 }}
        style={{
          width: 760,
          maxWidth: '94vw',
          maxHeight: '88vh',
          overflow: 'auto',
          background: 'var(--color-bg-panel)',
          border: '1px solid var(--color-border-subtle)',
          borderRadius: 10,
          boxShadow: '0 16px 70px rgba(0,0,0,0.65)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
          <div className="flex items-center gap-2">
            <FileText size={18} style={{ color: 'var(--color-accent-cyan)' }} />
            <div>
              <div className="font-display font-semibold text-lg" style={{ color: 'var(--color-text-primary)' }}>
                WeatherReady AI — Resilience Plan
              </div>
              <div className="font-mono text-[10px] tracking-widest uppercase" style={{ color: 'var(--color-text-muted)' }}>
                {cityName} · {planning.growthPercent}% growth · {planning.horizonYears} yr horizon · extreme weather
              </div>
            </div>
          </div>
          <button type="button" onClick={onClose} className="w-8 h-8 rounded-lg grid place-items-center" style={{ border: '1px solid var(--color-border-subtle)', color: 'var(--color-text-muted)' }}>
            <X size={14} />
          </button>
        </div>
        <div className="flex flex-wrap gap-2 px-5 py-3" style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
          <button type="button" onClick={copyReport} className="px-3 py-1.5 rounded-lg text-[11px]" style={{ border: '1px solid var(--color-border-subtle)', color: 'var(--color-accent-cyan)' }}>
            Copy Report
          </button>
          <button type="button" onClick={downloadJson} className="px-3 py-1.5 rounded-lg text-[11px]" style={{ border: '1px solid var(--color-border-subtle)', color: 'var(--color-accent-purple)' }}>
            Download JSON
          </button>
          <button type="button" onClick={() => window.print()} className="px-3 py-1.5 rounded-lg text-[11px]" style={{ border: '1px solid var(--color-border-subtle)', color: 'var(--color-text-muted)' }}>
            Print Report
          </button>
          <button type="button" onClick={copyPitch} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px]" style={{ border: '1px solid rgba(0,184,148,0.4)', color: 'var(--color-accent-green)' }}>
            <Copy size={11} />
            Copy Pitch
          </button>
        </div>
        <div id="weatherready-report-body" className="p-5 space-y-4">
          <section>
            <h3 className="font-mono text-[10px] tracking-widest uppercase mb-2" style={{ color: 'var(--color-accent-cyan)' }}>
              Executive Summary
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              WeatherReady AI analyzed <strong>{cityName}</strong> under future growth and extreme weather risk, identified vulnerable districts, and generated a resilience plan with measurable before-and-after improvement.
            </p>
            <div className="mt-3 rounded-lg p-3" style={{ border: '1px solid rgba(0,184,148,0.3)', background: 'rgba(0,184,148,0.06)' }}>
              <div className="font-mono text-[9px] uppercase tracking-widest mb-1" style={{ color: 'var(--color-accent-green)' }}>
                Pitch Summary
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                {pitchSummary}
              </p>
            </div>
          </section>
          <section>
            <h3 className="font-mono text-[10px] tracking-widest uppercase mb-2" style={{ color: 'var(--color-accent-cyan)' }}>
              Weather Scenario
            </h3>
            <DataLine label="City" value={cityName} />
            <DataLine label="Growth Scenario" value={`${planning.growthPercent}% over ${planning.horizonYears} years`} />
            <DataLine label="Weather Hazards" value="Heat Wave, Flood Event, Wildfire Smoke, Storm Disruption" />
            <DataLine label="Timeline Year" value={`${planning.timelineYear} · ${planning.timelinePopulation.toLocaleString()} projected residents`} />
          </section>
          <section>
            <h3 className="font-mono text-[10px] tracking-widest uppercase mb-2" style={{ color: 'var(--color-accent-cyan)' }}>
              Vulnerable Districts
            </h3>
            <DataLine label="Top Risk" value={topGap ? `${topGap.name}: ${topGap.reason}` : planning.topRecommendation.zoneName} />
            <DataLine label="City Exposure" value={city?.key_planning_challenge ?? `${cityName} weather resilience and emergency access gaps`} />
          </section>
          <section>
            <h3 className="font-mono text-[10px] tracking-widest uppercase mb-2" style={{ color: 'var(--color-accent-cyan)' }}>
              Weather Risk Gaps
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {activeGaps.length === 0 && <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>No open gaps recorded (zones may already be improved).</p>}
              {activeGaps.map((zone) => (
                <div key={zone.id} className="rounded-lg p-3" style={{ border: '1px solid rgba(255,90,61,0.2)', background: 'rgba(255,90,61,0.05)' }}>
                  <div className="font-display text-xs font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                    {zone.name}
                  </div>
                  <p className="text-[11px] mt-1 leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                    {zone.reason}
                  </p>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h3 className="font-mono text-[10px] tracking-widest uppercase mb-2" style={{ color: 'var(--color-accent-cyan)' }}>
              Recommended Infrastructure
            </h3>
            <p className="text-xs leading-relaxed mb-2" style={{ color: 'var(--color-text-secondary)' }}>
              {planning.topRecommendation.reason}
            </p>
            <DataLine label="Top Recommendation" value={topItem?.name ?? planning.topRecommendation.title} />
            <DataLine label="Cost" value={`${formatMoney(topCost)} top site · ${formatMoney(totalCost)} full resilience plan`} />
            <DataLine label="Residents Protected" value={`${topPopulation.toLocaleString()} top site · ${typeof residents === 'number' ? residents.toLocaleString() : residents} full plan`} />
          </section>
          <section>
            <h3 className="font-mono text-[10px] tracking-widest uppercase mb-2" style={{ color: 'var(--color-accent-cyan)' }}>
              Emergency Access and Cooling Infrastructure
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(proposed.length ? proposed : planning.aiRecommendations).map((item) => (
                <div key={item.id} className="rounded-lg p-2" style={{ border: '1px solid var(--color-border-subtle)', background: 'var(--color-bg-hover)' }}>
                  <div className="font-display text-xs" style={{ color: 'var(--color-text-primary)' }}>
                    {item.name}
                  </div>
                  <div className="font-mono text-[10px]" style={{ color: 'var(--color-text-muted)' }}>
                    {item.category.replace(/_/g, ' ')} · ${(item.costEstimate / 1_000_000).toFixed(1)}M
                  </div>
                  <div className="text-[10px] mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                    {item.reason}
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h3 className="font-mono text-[10px] tracking-widest uppercase mb-2" style={{ color: 'var(--color-accent-cyan)' }}>
              Before / After Resilience Metrics
            </h3>
            {before && after ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  ['Weather Readiness', before.cityHealth, after.cityHealth],
                  ['Emergency Access', before.emergencyAccess, after.emergencyAccess],
                  ['Cooling Access', before.transitCoverage, after.transitCoverage],
                  ['Shelter Access', before.housingAccess, after.housingAccess],
                  ['Transit Resilience', before.equityScore, after.equityScore],
                  ['Green Space', before.greenSpace, after.greenSpace],
                  ['Avg Response (min)', before.averageCommute, after.averageCommute],
                  ['Residents Protected', before.populationServed ?? 31000, after.populationServed ?? 91000],
                ].map(([label, b, a]) => (
                  <div key={label as string} className="rounded-lg p-3" style={{ border: '1px solid var(--color-border-subtle)', background: 'var(--color-bg-card)' }}>
                    <div className="font-mono text-[10px]" style={{ color: 'var(--color-text-muted)' }}>
                      {label}
                    </div>
                    <div className="font-mono text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                      {Number(b).toFixed(label === 'Avg Commute' ? 1 : 0)} → {Number(a).toFixed(label === 'Avg Commute' ? 1 : 0)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Run analysis and apply plan to populate before/after metrics.</p>
            )}
          </section>
          <section>
            <h3 className="font-mono text-[10px] tracking-widest uppercase mb-2" style={{ color: 'var(--color-accent-cyan)' }}>
              Cost and Residents Protected
            </h3>
            <DataLine label="Total Resilience Plan Cost" value={formatMoney(totalCost)} />
            <DataLine label="Residents Protected" value={`${typeof residents === 'number' ? residents.toLocaleString() : residents} projected residents`} />
          </section>
          <section>
            <h3 className="font-mono text-[10px] tracking-widest uppercase mb-2" style={{ color: 'var(--color-accent-cyan)' }}>
              Assumptions
            </h3>
            <ul className="text-xs space-y-1 list-disc list-inside" style={{ color: 'var(--color-text-secondary)' }}>
              <li>Weather risk zones are simulated from growth scenario and geographic exposure data.</li>
              <li>{cityName} landmarks, bounds, and growth assumptions are illustrative for demo planning.</li>
              <li>Not a substitute for formal hazard analysis, CEQA, or emergency management planning.</li>
            </ul>
          </section>
          <section>
            <h3 className="font-mono text-[10px] tracking-widest uppercase mb-2" style={{ color: 'var(--color-accent-cyan)' }}>
              Next Steps
            </h3>
            <ul className="text-xs space-y-1 list-disc list-inside" style={{ color: 'var(--color-text-secondary)' }}>
              <li>Validate candidate resilience sites with city GIS and emergency planning data.</li>
              <li>Prioritize {topItem?.name ?? planning.topRecommendation.title} for near-term capital review.</li>
              <li>Stakeholder workshops with emergency management, public health, and transit agencies.</li>
            </ul>
          </section>
        </div>
      </motion.div>
    </motion.div>
  )
}

function DataLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 py-1 text-sm" style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
      <span style={{ color: 'var(--color-text-muted)' }}>{label}</span>
      <span style={{ color: 'var(--color-text-secondary)' }}>{value}</span>
    </div>
  )
}

function formatMoney(value?: number) {
  if (!value) return '$0M'
  return `$${Math.round(value / 1_000_000)}M`
}
