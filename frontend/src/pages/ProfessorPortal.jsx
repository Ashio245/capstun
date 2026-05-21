import { Card, Pill, SectionTitle, Stat } from '../components/ui';
import { professorCampaigns, pilotSubjects } from '../data/smartLearnData';

export default function ProfessorPortal() {
  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <SectionTitle
        eyebrow="Professor Portal"
        title="Dynamic Quest Campaign Builder"
        description="Convert syllabi into quests and missions, define reward logic, and launch campaigns tied to the three pilot subjects."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Stat label="Pilot subjects" value={pilotSubjects.length} note="CP1, DS, DBM" />
        <Stat label="Quest campaigns" value={professorCampaigns.length} note="Reusable across sections" tone="blue" />
        <Stat label="Reward engine" value="Rules" note="Early Bird + Perfect Score" tone="amber" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card title="New Quest Campaign" subtitle="Campaign composer">
          <div className="grid gap-3 md:grid-cols-2">
            {['Subject', 'Campaign title', 'Due window', 'XP budget', 'Badge trigger', 'Publish status'].map((field) => (
              <div key={field} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">{field}</p>
                <p className="mt-2 text-sm text-slate-700">Ready to configure</p>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Reward Rules" subtitle="Rule engine">
          <div className="space-y-3">
            <RuleRow label="Early Bird" description="Grant bonus XP when a student submits within 24 hours." tone="emerald" />
            <RuleRow label="Perfect Score" description="Apply a multiplier when the score equals the max score." tone="amber" />
            <RuleRow label="Manual Adjustment" description="Allow professor-approved XP corrections with audit trail." tone="slate" />
          </div>
        </Card>
      </div>

      <Card title="Active Campaigns" subtitle="Pilot rollout">
        <div className="grid gap-4 md:grid-cols-3">
          {professorCampaigns.map((campaign) => (
            <article key={campaign.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{campaign.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">{campaign.subject}</p>
                </div>
                <Pill tone="emerald">{campaign.reward}</Pill>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-600">
                <Metric label="Quests" value={campaign.quests} />
                <Metric label="Missions" value={campaign.missions} />
              </div>
            </article>
          ))}
        </div>
      </Card>
    </div>
  );
}

function RuleRow({ label, description, tone }) {
  const toneClasses = {
    emerald: 'border-emerald-200 bg-emerald-50',
    amber: 'border-amber-200 bg-amber-50',
    slate: 'border-slate-200 bg-slate-50',
  };

  return (
    <div className={`rounded-2xl border p-4 ${toneClasses[tone] ?? toneClasses.slate}`}>
      <p className="text-sm font-semibold text-slate-900">{label}</p>
      <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-2xl bg-slate-50 px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">{label}</p>
      <p className="mt-1 text-base font-semibold text-slate-900">{value}</p>
    </div>
  );
}
