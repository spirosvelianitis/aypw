export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-200">
          <div className="md:col-span-5">
            <div className="text-base font-bold tracking-tight text-slate-900">
              All Year Pressure Washing
            </div>
            <p className="mt-2.5 text-sm text-slate-600 leading-relaxed max-w-sm">
              Four-season residential and commercial exterior cleaning, calibrated rotary concrete
              restoration, and plant-safe soft washing.
            </p>
            <p className="mt-3 text-xs text-slate-500">
              Licensed &amp; Insured · EPA Runoff Compliant · $2M General Liability
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="text-xs font-semibold tracking-wide text-slate-900">
              Navigation
            </div>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>
                <a href="#services" className="hover:text-slate-900">
                  Services
                </a>
              </li>
              <li>
                <a href="#seasonal-care" className="hover:text-slate-900">
                  Seasonal Care
                </a>
              </li>
              <li>
                <a href="#results" className="hover:text-slate-900">
                  Results
                </a>
              </li>
              <li>
                <a href="#estimate" className="hover:text-slate-900">
                  Instant Estimate
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="text-xs font-semibold tracking-wide text-slate-900">
              Dispatch &amp; Hours
            </div>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li className="font-mono tabular-nums">(555) 419-8820</li>
              <li>dispatch@allyearpressurewashing.com</li>
              <li>Monday – Saturday · 7:00 AM – 6:00 PM</li>
              <li>Overnight Commercial Windows Available</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-500">
          <span>&copy; {new Date().getFullYear()} All Year Pressure Washing. All rights reserved.</span>
          <span>Residential Driveways · Soft-Wash Siding · Commercial Flatwork</span>
        </div>
      </div>
    </footer>
  );
}
