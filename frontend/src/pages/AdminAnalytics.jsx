import { Card, SectionTitle, Stat } from '../components/ui';
import { BarChart, LineChart } from '../components/SimpleCharts';
import { engagementHeatmap } from '../data/smartLearnData';

export default function AdminAnalytics() {
  const chartLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <SectionTitle
        eyebrow="Dean Admin Analytics"
        title="Engagement Heatmap and Performance Overview"
        description="Track participation by subject/module, identify at-risk learners, and monitor cohort-level behavior across the pilot subjects."
      />

      <div className="grid gap-4 md:grid-cols-4">
        <Stat label="Active learners" value="428" note="This week" />
        <Stat label="Engagement rate" value="92.8%" note="Healthy" tone="blue" />
        <Stat label="Interventions" value="18" note="Pending review" tone="amber" />
        <Stat label="Flagged students" value="7" note="Requires follow-up" tone="rose" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card title="Engagement Heatmap" subtitle="Subject participation">
          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-2 text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-[0.22em] text-slate-500">
                  <th className="px-3 py-2">Subject</th>
                  {chartLabels.map((label) => <th key={label} className="px-3 py-2">{label}</th>)}
                </tr>
              </thead>
              <tbody>
                {engagementHeatmap.map(([subject, ...values]) => (
                  <tr key={subject}>
                    <td className="rounded-2xl bg-slate-50 px-3 py-3 font-semibold text-slate-900">{subject}</td>
                    {values.map((value, index) => (
                      <td key={`${subject}-${index}`} className={`rounded-2xl px-3 py-3 text-center font-semibold text-white ${heatClass(value)}`}>{value}%</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="Performance Trends" subtitle="Chart.js views">
          <div className="grid gap-6">
            <BarChart labels={chartLabels} values={[81, 86, 90, 88, 92, 94]} color="#0f5a3e" />
            <LineChart labels={chartLabels} values={[72, 76, 78, 84, 88, 92]} color="#f59e0b" />
          </div>
        </Card>
      </div>
    </div>
  );
}

function heatClass(value) {
  if (value >= 85) return 'bg-emerald-500';
  if (value >= 75) return 'bg-amber-500';
  return 'bg-rose-500';
}
