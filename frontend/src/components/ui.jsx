export function Card({ title, subtitle, children, className = '' }) {
  return (
    <section className={`rounded-[28px] border border-white/70 bg-white/90 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur ${className}`}>
      {(title || subtitle) && (
        <header className="mb-4">
          {subtitle ? <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-700">{subtitle}</p> : null}
          {title ? <h2 className="mt-1 text-xl font-semibold text-slate-900">{title}</h2> : null}
        </header>
      )}
      {children}
    </section>
  );
}

export function SectionTitle({ eyebrow, title, description }) {
  return (
    <div>
      {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">{eyebrow}</p> : null}
      <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{title}</h1>
      {description ? <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{description}</p> : null}
    </div>
  );
}

export function Pill({ children, tone = 'emerald' }) {
  const toneClasses = {
    emerald: 'bg-emerald-100 text-emerald-800',
    amber: 'bg-amber-100 text-amber-800',
    rose: 'bg-rose-100 text-rose-800',
    slate: 'bg-slate-200 text-slate-700',
  };

  return <span className={`rounded-full px-3 py-1 text-xs font-semibold ${toneClasses[tone] ?? toneClasses.emerald}`}>{children}</span>;
}

export function Stat({ label, value, note, tone = 'emerald' }) {
  const toneClasses = {
    emerald: 'bg-emerald-50 text-emerald-800',
    amber: 'bg-amber-50 text-amber-800',
    blue: 'bg-blue-50 text-blue-800',
    rose: 'bg-rose-50 text-rose-800',
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-slate-900">{value}</p>
      {note ? <p className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-medium ${toneClasses[tone] ?? toneClasses.emerald}`}>{note}</p> : null}
    </div>
  );
}
