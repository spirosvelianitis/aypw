import { useState, type PointerEvent } from 'react';
import { MoveHorizontal } from 'lucide-react';
import { PROJECT_OUTCOMES, SERVICES } from '../data/servicesData';
import { ResilientImage } from './ResilientImage';

export function ResultsSection() {
  const [revealPercent, setRevealPercent] = useState(52);
  const concreteImage = SERVICES[0].image;

  const updateFromClientX = (clientX: number, rect: DOMRect) => {
    const raw = ((clientX - rect.left) / rect.width) * 100;
    const clamped = Math.max(8, Math.min(92, Math.round(raw)));
    setRevealPercent(clamped);
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.buttons !== 1 && e.pointerType === 'mouse') return;
    updateFromClientX(e.clientX, e.currentTarget.getBoundingClientRect());
  };

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX, e.currentTarget.getBoundingClientRect());
  };

  return (
    <section id="results" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold tracking-wide text-sky-700">
              Verified Surface Restoration
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 [text-wrap:balance]">
              Measurable results across residential and commercial properties
            </h2>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              Drag the divider across the concrete slab to inspect the difference between
              weathered moss buildup and calibrated 3,600 PSI rotary extraction.
            </p>
            <div className="mt-6 pt-6 border-t border-slate-200 grid grid-cols-2 gap-6">
              <div>
                <div className="text-2xl font-bold font-mono tabular-nums text-slate-900">
                  1,400+
                </div>
                <div className="mt-1 text-xs text-slate-500">
                  Properties washed in the past 24 months
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold font-mono tabular-nums text-slate-900">
                  98.6%
                </div>
                <div className="mt-1 text-xs text-slate-500">
                  Repeat seasonal commercial contract rate
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              className="relative h-72 sm:h-96 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 select-none touch-none cursor-ew-resize"
            >
              {/* After layer (Full restored surface) */}
              <ResilientImage
                src={concreteImage}
                alt="Restored bright concrete surface after rotary pressure washing"
                titleFallback="Restored Concrete Surface"
                className="absolute inset-0 w-full h-full object-cover brightness-105 contrast-105"
              />

              {/* Before layer (Simulated heavy weathering & organic staining) */}
              <div
                aria-hidden="true"
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - revealPercent}% 0 0)` }}
              >
                <ResilientImage
                  src={concreteImage}
                  alt="Weathered moss-stained concrete prior to treatment"
                  titleFallback="Weathered Concrete Surface"
                  className="w-full h-full object-cover brightness-75 contrast-125 sepia-[0.35] saturate-75"
                />
              </div>

              {/* Scrim & Labels */}
              <div className="absolute top-4 left-4 pointer-events-none bg-slate-950/75 text-white text-xs font-medium px-2.5 py-1 rounded">
                Before · Moss &amp; Tannin Stain
              </div>
              <div className="absolute top-4 right-4 pointer-events-none bg-sky-700/90 text-white text-xs font-medium px-2.5 py-1 rounded">
                After · Rotary 3,600 PSI
              </div>

              {/* Divider Line & Handle */}
              <div
                aria-hidden="true"
                className="absolute top-0 bottom-0 w-0.5 bg-white shadow-sm pointer-events-none"
                style={{ left: `${revealPercent}%` }}
              >
                <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white text-slate-900 border border-slate-200 shadow-md flex items-center justify-center">
                  <MoveHorizontal className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between gap-4">
              <label htmlFor="surface-slider" className="text-xs font-medium text-slate-600">
                Compare Before / After Surface
              </label>
              <input
                id="surface-slider"
                type="range"
                min={8}
                max={92}
                value={revealPercent}
                onChange={(e) => setRevealPercent(Number(e.target.value))}
                className="w-48 accent-sky-700 cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="mt-14 pt-12 border-t border-slate-200 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {PROJECT_OUTCOMES.map((project) => (
            <article
              key={project.id}
              className="bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-7 flex flex-col justify-between"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  <span className="font-mono tabular-nums font-semibold text-sky-700">
                    {project.metric}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{project.duration}</span>
                </div>

                <h3 className="mt-2.5 text-lg font-bold tracking-tight text-slate-900">
                  {project.title}
                </h3>

                <p className="mt-1 text-xs text-slate-500">{project.location}</p>

                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  {project.outcome}
                </p>
              </div>

              <blockquote className="mt-6 pt-5 border-t border-slate-200">
                <p className="text-sm text-slate-800 leading-relaxed">
                  &ldquo;{project.quote}&rdquo;
                </p>
                <footer className="mt-3 text-xs text-slate-500">
                  <span className="font-semibold text-slate-800">{project.clientName}</span>
                  <span aria-hidden="true"> · </span>
                  <span>{project.clientRole}</span>
                </footer>
              </blockquote>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
