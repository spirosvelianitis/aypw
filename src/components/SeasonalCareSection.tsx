import { ArrowRight } from 'lucide-react';
import { SEASON_PLANS, SERVICES, type SeasonId } from '../data/servicesData';

interface SeasonalCareSectionProps {
  activeSeason: SeasonId;
  onSelectSeason: (season: SeasonId) => void;
  onApplySeasonToEstimate: (season: SeasonId, serviceIds: string[]) => void;
}

export function SeasonalCareSection({
  activeSeason,
  onSelectSeason,
  onApplySeasonToEstimate,
}: SeasonalCareSectionProps) {
  const currentPlan =
    SEASON_PLANS.find((plan) => plan.id === activeSeason) || SEASON_PLANS[0];

  const matchedServices = SERVICES.filter((s) =>
    currentPlan.recommendedServices.includes(s.id)
  );

  return (
    <section id="seasonal-care" className="py-16 lg:py-24 bg-slate-900 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-slate-800">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wide text-sky-400">
              Four-Season Maintenance Schedule
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-white [text-wrap:balance]">
              Built to wash in every season, not just April through September
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Seasonal maintenance protocols"
            className="inline-flex flex-wrap items-center gap-1 p-1 bg-slate-800 rounded-lg self-start lg:self-auto"
          >
            {SEASON_PLANS.map((plan) => {
              const isActive = plan.id === activeSeason;
              return (
                <button
                  key={plan.id}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  onClick={() => onSelectSeason(plan.id)}
                  className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 ${
                    isActive
                      ? 'bg-sky-600 text-white'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                  }`}
                >
                  {plan.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-7">
            <div className="text-xs font-mono tracking-wide text-slate-400">
              {currentPlan.label} Window · {currentPlan.months}
            </div>

            <h3 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-white [text-wrap:balance]">
              {currentPlan.headline}
            </h3>

            <p className="mt-4 text-base text-slate-300 leading-relaxed max-w-2xl">
              {currentPlan.description}
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-800">
              <div>
                <div className="text-xs text-slate-400">Primary Contaminants</div>
                <div className="mt-1.5 text-sm font-medium text-slate-100 leading-snug">
                  {currentPlan.contaminants}
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-400">Equipment Protocol</div>
                <div className="mt-1.5 text-sm font-medium text-slate-100 leading-snug">
                  {currentPlan.waterSpec}
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-400">Dispatch Window</div>
                <div className="mt-1.5 text-sm font-medium font-mono tabular-nums text-sky-300 leading-snug">
                  {currentPlan.turnaround}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-800/60 border border-slate-700/80 rounded-xl p-6 sm:p-8">
            <div className="text-xs font-semibold tracking-wide text-slate-300">
              Recommended {currentPlan.label} Services
            </div>

            <ul className="mt-5 divide-y divide-slate-700/80">
              {matchedServices.map((service) => (
                <li key={service.id} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-sm font-semibold text-white">
                      {service.number}. {service.title}
                    </span>
                    <span className="text-xs font-mono tabular-nums text-sky-300 shrink-0">
                      {service.pressureSpec}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                    {service.method}
                  </p>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() =>
                onApplySeasonToEstimate(currentPlan.id, currentPlan.recommendedServices)
              }
              className="mt-6 w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-lg transition-colors duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
            >
              Quote {currentPlan.label} Package
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
