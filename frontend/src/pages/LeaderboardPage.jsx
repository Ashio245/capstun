import { Card, SectionTitle, Stat } from '../components/ui';
import { leaderboardRows } from '../data/smartLearnData';

export default function LeaderboardPage() {
  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <SectionTitle
        eyebrow="Leaderboard Dashboard"
        title="Real-time XP Rankings"
        description="WebSocket-ready ranking board for instant XP updates, subject filtering, and room-scoped leaderboards."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Stat label="Subjects in scope" value="3" note="Pilot only" />
        <Stat label="Live sessions" value="24" note="Socket rooms" tone="blue" />
        <Stat label="Leaderboard refresh" value="<1s" note="XP broadcast" tone="amber" />
      </div>

      <Card title="Top Rankings" subtitle="Rank board">
        <div className="space-y-3">
          {leaderboardRows.map((row, index) => (
            <div key={row.id} className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900">#{index + 1} {row.name}</p>
                <p className="text-xs text-slate-500">{row.role}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="emerald">{row.badge}</Badge>
                <Badge tone="slate">{row.trend}</Badge>
                <span className="text-sm font-semibold text-emerald-700">{row.xp.toLocaleString()} XP</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function Badge({ children, tone }) {
  const toneClasses = {
    emerald: 'bg-emerald-100 text-emerald-800',
    slate: 'bg-slate-200 text-slate-700',
  };

  return <span className={`rounded-full px-3 py-1 text-xs font-semibold ${toneClasses[tone] ?? toneClasses.slate}`}>{children}</span>;
}
