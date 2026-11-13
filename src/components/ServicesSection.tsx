import { Plus } from 'lucide-react';
import { SERVICES, type ServiceItem } from '../data/servicesData';
import { ResilientImage } from './ResilientImage';

interface ServicesSectionProps {
  selectedServices: string[];
  onAddServiceToEstimate: (serviceId: string) => void;
}

export function ServicesSection({
  selectedServices,
  onAddServiceToEstimate,
}: ServicesSectionProps) {
  const renderCard = (service: ServiceItem, isWide: boolean) => {
    const isAdded = selectedServices.includes(service.id);

    return (
      <article
        key={service.id}
        className={`bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col ${
          isWide ? 'lg:col-span-2 lg:grid lg:grid-cols-12' : 'lg:col-span-1'
        }`}
      >
        {service.image && (
          <div
            className={`relative bg-slate-100 overflow-hidden ${
              isWide ? 'lg:col-span-6 h-60 sm:h-72 lg:h-full min-h-[260px]' : 'h-56 w-full'
            }`}
          >
            <ResilientImage
              src={service.image}
              alt={service.imageAlt || service.title}
              titleFallback={service.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div
          className={`p-6 sm:p-8 flex flex-col justify-between ${
            isWide ? 'lg:col-span-6' : 'flex-1'
          }`}
        >
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <span className="font-medium text-slate-700">{service.method}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums text-sky-700 font-medium">
                {service.pressureSpec}
              </span>
            </div>

            <h3 className="mt-2.5 text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              {service.number}. {service.title}
            </h3>

            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              {service.summary}
            </p>

            <p className="mt-4 text-xs text-slate-500 leading-relaxed">
              {service.surfaces.join(' · ')}
            </p>
          </div>

          <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between gap-4">
            <div className="text-xs text-slate-500 font-mono tabular-nums">
              From ${service.baseFee} · ${service.ratePerSqFt.toFixed(2)}/sq ft
            </div>

            <button
              type="button"
              onClick={() => onAddServiceToEstimate(service.id)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700 ${
                isAdded
                  ? 'bg-slate-900 text-white hover:bg-slate-800'
                  : 'bg-sky-50 text-sky-800 hover:bg-sky-100'
              }`}
            >
              <Plus className="w-3.5 h-3.5" aria-hidden="true" />
              {isAdded ? 'Added to Estimate' : 'Add to Estimate'}
            </button>
          </div>
        </div>
      </article>
    );
  };

  const [concrete, softwash, commercial, woodSealing] = SERVICES;

  return (
    <section id="services" className="py-16 lg:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-wide text-sky-700">
            Calibrated Surface Capabilities
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 [text-wrap:balance]">
            Right pressure and chemistry for every exterior material
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            High PSI belongs on poured concrete, never on roof shingles or painted wood. Every
            All Year truck carries rotary flatwork decks, 190°F heated coils, and dedicated
            low-pressure soft-wash manifolds.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {renderCard(concrete, true)}
          {renderCard(softwash, false)}
          {renderCard(commercial, true)}
          {renderCard(woodSealing, false)}
        </div>
      </div>
    </section>
  );
}
