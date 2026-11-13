import { useMemo, useState, type FormEvent } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import {
  SEASON_PLANS,
  SERVICES,
  type PropertyType,
  type SeasonId,
} from '../data/servicesData';

interface EstimateSectionProps {
  propertyType: PropertyType;
  onChangePropertyType: (type: PropertyType) => void;
  selectedServices: string[];
  onToggleService: (id: string) => void;
  selectedSeason: SeasonId;
  onChangeSeason: (season: SeasonId) => void;
}

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  notes: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  address?: string;
}

export function EstimateSection({
  propertyType,
  onChangePropertyType,
  selectedServices,
  onToggleService,
  selectedSeason,
  onChangeSeason,
}: EstimateSectionProps) {
  const [sqFt, setSqFt] = useState(1800);
  const [form, setForm] = useState<FormState>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    notes: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const estimate = useMemo(() => {
    const activeItems = SERVICES.filter((s) => selectedServices.includes(s.id));
    if (activeItems.length === 0) {
      return { low: 0, high: 0, hours: '0 hrs', count: 0 };
    }

    const commercialMultiplier = propertyType === 'commercial' ? 1.15 : 1;
    const bundleDiscount = activeItems.length >= 2 ? 0.9 : 1;

    const rawBase = activeItems.reduce((sum, item) => sum + item.baseFee, 0);
    const rawSqFtCost = activeItems.reduce(
      (sum, item) => sum + item.ratePerSqFt * sqFt * 0.65,
      0
    );

    const subtotal = (rawBase + rawSqFtCost) * commercialMultiplier * bundleDiscount;
    const low = Math.round(subtotal / 10) * 10;
    const high = Math.round((subtotal * 1.18) / 10) * 10;
    const estHours = Math.max(1.5, Math.round((activeItems.length * 1.2 + sqFt / 1200) * 2) / 2);

    return {
      low,
      high,
      hours: `${estHours.toFixed(1)} hrs`,
      count: activeItems.length,
    };
  }, [propertyType, selectedServices, sqFt]);

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (form.fullName.trim().length < 2) {
      nextErrors.fullName = 'Enter your full name.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = 'Enter a valid email address.';
    }
    const digits = form.phone.replace(/\D/g, '');
    if (digits.length < 10) {
      nextErrors.phone = 'Enter a 10-digit phone number.';
    }
    if (form.address.trim().length < 4) {
      nextErrors.address = 'Enter your street address or ZIP code.';
    }
    return nextErrors;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validation = validate();
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    const code = `AY-${String(Math.floor(100000 + Math.random() * 900000))}`;
    setSubmittedRef(code);
  };

  const handleReset = () => {
    setSubmittedRef(null);
    setForm({ fullName: '', email: '', phone: '', address: '', notes: '' });
    setErrors({});
  };

  return (
    <section id="estimate" className="py-16 lg:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-wide text-sky-700">
            Transparent Pricing &amp; Dispatch
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 [text-wrap:balance]">
            Calculate your instant range and lock in a wash window
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Multi-surface bookings automatically include a 10% bundle adjustment. Written
            firm quotes are confirmed within 4 business hours.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Live Estimate Calculator */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-lg font-bold text-slate-900">1. Estimate Builder</h3>
              <div
                role="group"
                aria-label="Property type"
                className="inline-flex p-1 bg-slate-100 rounded-lg"
              >
                {(['residential', 'commercial'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => onChangePropertyType(type)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md capitalize transition-colors cursor-pointer ${
                      propertyType === type
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <div className="text-xs font-semibold text-slate-700 mb-3">
                Select Surfaces to Wash
              </div>
              <div className="space-y-2.5">
                {SERVICES.map((service) => {
                  const checked = selectedServices.includes(service.id);
                  return (
                    <button
                      key={service.id}
                      type="button"
                      aria-pressed={checked}
                      onClick={() => onToggleService(service.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg border transition-colors duration-150 flex items-center justify-between gap-3 cursor-pointer ${
                        checked
                          ? 'bg-sky-50 border-sky-600 text-slate-900'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <span className="text-sm font-medium">{service.title}</span>
                      <span className="text-xs font-mono tabular-nums text-slate-500 shrink-0">
                        {checked ? 'Selected' : `+$${service.baseFee}`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-200">
              <div className="flex items-center justify-between text-sm">
                <label htmlFor="sqft-range" className="font-semibold text-slate-800">
                  Approximate Wash Area
                </label>
                <span className="font-mono tabular-nums font-semibold text-sky-700">
                  {sqFt.toLocaleString()} sq ft
                </span>
              </div>
              <input
                id="sqft-range"
                type="range"
                min={400}
                max={8000}
                step={200}
                value={sqFt}
                onChange={(e) => setSqFt(Number(e.target.value))}
                className="mt-3 w-full accent-sky-700 cursor-pointer"
              />
              <div className="mt-1 flex justify-between text-xs font-mono tabular-nums text-slate-400">
                <span>400 sq ft</span>
                <span>4,000 sq ft</span>
                <span>8,000 sq ft</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-200">
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-sm font-medium text-slate-600">Estimated Range</span>
                <span className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-slate-900">
                  {estimate.count > 0
                    ? `$${estimate.low.toLocaleString()} – $${estimate.high.toLocaleString()}`
                    : 'Select a surface'}
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                <span>
                  {estimate.count >= 2
                    ? '10% multi-surface bundle discount applied'
                    : 'Select 2+ surfaces for 10% bundle discount'}
                </span>
                <span className="font-mono tabular-nums">{estimate.hours} est. crew time</span>
              </div>
            </div>
          </div>

          {/* Right Column: Validated Request Form */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
            {submittedRef ? (
              <div className="py-8">
                <div className="inline-flex items-center gap-2 text-emerald-700 font-semibold text-sm">
                  <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
                  <span>Estimate Request Confirmed · Reference {submittedRef}</span>
                </div>

                <h3 className="mt-3 text-2xl font-bold text-slate-900">
                  Thank you, {form.fullName}.
                </h3>

                <p className="mt-3 text-base text-slate-600 leading-relaxed max-w-xl">
                  Our dispatch coordinator has received your {propertyType} wash specifications for{' '}
                  <span className="font-medium text-slate-900">{form.address}</span> and will
                  send a firm written quote to{' '}
                  <span className="font-medium text-slate-900">{form.email}</span> within 4
                  business hours.
                </p>

                <dl className="mt-6 pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div>
                    <dt className="text-xs text-slate-500">Estimated Range</dt>
                    <dd className="mt-1 font-mono tabular-nums font-semibold text-slate-900">
                      {estimate.count > 0
                        ? `$${estimate.low.toLocaleString()} – $${estimate.high.toLocaleString()}`
                        : 'Custom on-site review'}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-slate-500">Target Area</dt>
                    <dd className="mt-1 font-mono tabular-nums font-semibold text-slate-900">
                      {sqFt.toLocaleString()} sq ft
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-slate-500">Preferred Season</dt>
                    <dd className="mt-1 font-semibold capitalize text-slate-900">
                      {selectedSeason}
                    </dd>
                  </div>
                </dl>

                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-8 px-5 py-2.5 text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <h3 className="text-lg font-bold text-slate-900">2. Schedule &amp; Contact Details</h3>
                <p className="mt-1 text-sm text-slate-500">
                  No payment required today. Water supply and chemical pre-treatment included.
                </p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="full-name"
                      className="block text-xs font-semibold text-slate-700 mb-1.5"
                    >
                      Full Name
                    </label>
                    <input
                      id="full-name"
                      type="text"
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      placeholder="Jordan Miller"
                      className="w-full px-3.5 py-2.5 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-sky-700 focus:ring-1 focus:ring-sky-700"
                    />
                    {errors.fullName && (
                      <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-700">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.fullName}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-semibold text-slate-700 mb-1.5"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="jordan@example.com"
                      className="w-full px-3.5 py-2.5 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-sky-700 focus:ring-1 focus:ring-sky-700"
                    />
                    {errors.email && (
                      <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-700">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs font-semibold text-slate-700 mb-1.5"
                    >
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="(555) 234-8910"
                      className="w-full px-3.5 py-2.5 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-sky-700 focus:ring-1 focus:ring-sky-700"
                    />
                    {errors.phone && (
                      <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-700">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="season-select"
                      className="block text-xs font-semibold text-slate-700 mb-1.5"
                    >
                      Preferred Service Season
                    </label>
                    <select
                      id="season-select"
                      value={selectedSeason}
                      onChange={(e) => onChangeSeason(e.target.value as SeasonId)}
                      className="w-full px-3.5 py-2.5 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-sky-700 focus:ring-1 focus:ring-sky-700"
                    >
                      {SEASON_PLANS.map((plan) => (
                        <option key={plan.id} value={plan.id}>
                          {plan.label} ({plan.months})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="address"
                      className="block text-xs font-semibold text-slate-700 mb-1.5"
                    >
                      Property Street Address or ZIP Code
                    </label>
                    <input
                      id="address"
                      type="text"
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      placeholder="742 Evergreen Terrace, Suite B"
                      className="w-full px-3.5 py-2.5 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-sky-700 focus:ring-1 focus:ring-sky-700"
                    />
                    {errors.address && (
                      <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-700">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.address}</span>
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="notes"
                      className="block text-xs font-semibold text-slate-700 mb-1.5"
                    >
                      Surface Notes (Optional)
                    </label>
                    <textarea
                      id="notes"
                      rows={3}
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      placeholder="Rust stains near sprinkler heads, gated driveway access, or overnight commercial schedule preference..."
                      className="w-full px-3.5 py-2.5 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-sky-700 focus:ring-1 focus:ring-sky-700"
                    />
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <span className="text-xs text-slate-500">
                    $2M Insured · Satisfaction walk-through before invoicing
                  </span>
                  <button
                    type="submit"
                    className="px-6 py-3.5 text-sm font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
                  >
                    Request Written Quote
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
