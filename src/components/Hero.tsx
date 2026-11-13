import { ArrowRight } from 'lucide-react';
import { HERO_MEDIA, OPERATIONAL_STANDARDS } from '../data/servicesData';
import { ResilientImage } from './ResilientImage';

interface HeroProps {
  onNavigateEstimate: () => void;
}

export function Hero({ onNavigateEstimate }: HeroProps) {
  return (
    <section id="top" className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 lg:pt-14 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-center">
            <p className="text-xs font-medium text-slate-500 tracking-wide mb-4">
              Licensed &amp; Insured Exterior Restoration · Residential &amp; Commercial
            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-slate-900 leading-[1.08] [text-wrap:balance] max-w-2xl">
              Exterior pressure washing built for every season.
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              All Year Pressure Washing restores concrete driveways, siding, roofs, and commercial
              flatwork year-round—matching hot-water rotary power and low-pressure soft washing to
              each surface without damage.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onNavigateEstimate}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
              >
                Get Instant Estimate
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <a
                href="#services"
                className="inline-flex items-center px-5 py-3.5 text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
              >
                Explore Services
              </a>
            </div>

            <p className="mt-6 text-sm text-slate-500">
              Serving Metro Residences, HOAs &amp; Retail Plazas · Mon–Sat 7:00 AM–6:00 PM
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="relative h-72 sm:h-96 lg:h-full min-h-[340px] rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
              <ResilientImage
                src={HERO_MEDIA.src}
                alt={HERO_MEDIA.alt}
                titleFallback="All Year Pressure Washing Rotary Surface Cleaning"
                className="w-full h-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/75 via-slate-950/30 to-transparent"
              />
              <div className="absolute bottom-4 left-5 right-5 flex flex-wrap items-center justify-between gap-2 text-white">
                <span className="text-xs font-medium tracking-wide">
                  20-Inch Stainless Rotary Surface Cleaner · Zero-Stripe Finish
                </span>
                <span className="text-xs font-mono tabular-nums text-sky-200">
                  3,600 PSI · 8.0 GPM
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-slate-200 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {OPERATIONAL_STANDARDS.map((item) => (
            <div key={item.label}>
              <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums tracking-tight text-slate-900">
                {item.value}
              </div>
              <div className="mt-1 text-sm font-semibold text-slate-800">{item.label}</div>
              <div className="mt-0.5 text-xs text-slate-500">{item.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
