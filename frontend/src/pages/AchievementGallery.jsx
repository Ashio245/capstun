import { Card, SectionTitle, Stat } from '../components/ui';
import { achievementRows } from '../data/smartLearnData';

export default function AchievementGallery() {
  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <SectionTitle
        eyebrow="Achievement Gallery"
        title="Vault of Badges and Certificates"
        description="A digital vault for badges, certificates, and skill milestones earned through quests and missions."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Stat label="Earned badges" value={achievementRows.filter((item) => item.earned).length} note="Vault unlocked" />
        <Stat label="Certificates" value="4" note="Skill proof" tone="blue" />
        <Stat label="Badge tiers" value="3" note="Quest, mission, mastery" tone="amber" />
      </div>

      <Card title="Achievement Vault" subtitle="Digital collection">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {achievementRows.map((achievement) => (
            <article key={achievement.id} className={`rounded-3xl border p-5 shadow-sm ${achievement.earned ? 'border-emerald-200 bg-emerald-50/70' : 'border-slate-200 bg-slate-50'}`}>
              <div className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl ${achievement.earned ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'}`}>★</div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{achievement.name}</h3>
              <p className="mt-1 text-sm text-slate-600">{achievement.description}</p>
              <p className="mt-3 text-sm font-semibold text-emerald-700">{achievement.xp} XP reward</p>
            </article>
          ))}
        </div>
      </Card>
    </div>
  );
}
