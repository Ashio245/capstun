import { Card, SectionTitle, Stat } from '../components/ui';
import { riskRows } from '../data/smartLearnData';

export default function RiskMonitoring() {
  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <SectionTitle
        eyebrow="Student Risk Monitoring"
        title="At-Risk Intervention Dashboard"
        description="Highlight students who have not leveled up within the expected period so professors and admins can intervene quickly."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Stat label="High risk" value="1" note="Immediate action" tone="rose" />
        <Stat label="Medium risk" value="1" note="Monitor closely" tone="amber" />
        <Stat label="Low risk" value="1" note="Stable" tone="emerald" />
      </div>

      <Card title="Intervention Queue" subtitle="Notifications">
        <div className="space-y-3">
          {riskRows.map((row) => (
            <div key={row.id} className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900">{row.name}</p>
                <p className="text-xs text-slate-500">{row.subject}</p>
                <p className="mt-1 text-sm text-slate-600">{row.gap}</p>
              </div>
              <span className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold ${riskTone(row.risk)}`}>{row.risk} risk</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function riskTone(level) {
  if (level === 'High') return 'bg-rose-100 text-rose-800';
  if (level === 'Medium') return 'bg-amber-100 text-amber-800';
  return 'bg-emerald-100 text-emerald-800';
}
