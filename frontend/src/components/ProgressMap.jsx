import { useEffect, useState } from 'react';

function buildProgressState(modules, currentXp) {
  const orderedModules = [...modules].sort((left, right) => left.unlockXp - right.unlockXp);
  const unlockedModuleIds = [];
  const lockedModuleIds = [];
  const completionByModuleId = {};

  for (const module of orderedModules) {
    const isUnlocked = currentXp >= module.unlockXp;
    const progress = module.xpGoal > 0
      ? Math.min(100, Math.round((currentXp / module.xpGoal) * 100))
      : 0;

    completionByModuleId[module.id] = progress;

    if (isUnlocked) {
      unlockedModuleIds.push(module.id);
    } else {
      lockedModuleIds.push(module.id);
    }
  }

  return {
    orderedModules,
    unlockedModuleIds,
    lockedModuleIds,
    completionByModuleId,
  };
}

function getModulePosition(index, total) {
  if (total <= 1) {
    return { left: '50%', top: '50%' };
  }

  const progress = index / (total - 1);
  const xPositions = ['18%', '46%', '76%'];
  const left = xPositions[index % xPositions.length] ?? `${20 + progress * 60}%`;
  const top = `${18 + progress * 62}%`;

  return { left, top };
}

export function useProgressMapState({ modules = [], currentXp = 0, onModuleSelect }) {
  const [selectedModuleId, setSelectedModuleId] = useState(null);
  const [expandedLevel, setExpandedLevel] = useState(1);
  const [touchStartX, setTouchStartX] = useState(null);
  const [progressState, setProgressState] = useState(() =>
    buildProgressState(modules, currentXp)
  );

  useEffect(() => {
    const nextState = buildProgressState(modules, currentXp);
    setProgressState(nextState);

    if (selectedModuleId === null && nextState.orderedModules.length > 0) {
      setSelectedModuleId(nextState.orderedModules[0].id);
    }
  }, [modules, currentXp, selectedModuleId]);

  const handleModuleSelect = (moduleId) => {
    setSelectedModuleId(moduleId);

    if (typeof onModuleSelect === 'function') {
      onModuleSelect(moduleId);
    }
  };

  const handleTouchStart = (event) => {
    setTouchStartX(event.touches[0]?.clientX ?? null);
  };

  const handleTouchEnd = (event) => {
    if (touchStartX === null) {
      return;
    }

    const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX;
    const swipeDistance = touchEndX - touchStartX;

    if (Math.abs(swipeDistance) > 40) {
      setExpandedLevel((currentLevel) => Math.max(1, currentLevel + (swipeDistance < 0 ? 1 : -1)));
    }

    setTouchStartX(null);
  };

  return {
    selectedModuleId,
    expandedLevel,
    progressState,
    handleModuleSelect,
    handleTouchStart,
    handleTouchEnd,
  };
}

const DEFAULT_LEADERBOARD = [
  { id: 1, name: 'Kael Storm', role: 'Top Student', xp: 24100, trend: '+1,400 XP' },
  { id: 2, name: 'Marcos Torres', role: 'Quest Runner', xp: 19320, trend: '+820 XP' },
  { id: 3, name: 'Eleanor Vance', role: 'Badge Collector', xp: 18450, trend: '+660 XP' },
];

const DEFAULT_BADGES = [
  { id: 'early-bird', name: 'Early Bird', description: 'Submitted within 24 hours', earned: true },
  { id: 'perfect-score', name: 'Perfect Score', description: 'Unlocked XP multiplier', earned: false },
  { id: 'code-warner', name: 'Code Warrior', description: 'Programming streak milestone', earned: true },
];

export default function ProgressMap(props) {
  const {
    progressState,
    selectedModuleId,
    expandedLevel,
    handleModuleSelect,
    handleTouchStart,
    handleTouchEnd,
  } = useProgressMapState(props);

  const {
    className = '',
    title = 'Student RPG Dashboard',
    subtitle = 'Quest Map',
    studentName = 'Arthur Mendoza',
    studentRole = 'Student Portal',
    currentXp = 0,
    level = Math.max(1, Math.floor(currentXp / 500) + 1),
    streakDays = 12,
    leaderboard = DEFAULT_LEADERBOARD,
    badges = DEFAULT_BADGES,
  } = props;

  const activeModule = progressState.orderedModules.find((module) => module.id === selectedModuleId) ?? null;
  const activeCount = progressState.unlockedModuleIds.length;
  const lockedCount = progressState.lockedModuleIds.length;
  const totalModules = progressState.orderedModules.length;

  return (
    <section
      className={`min-h-screen bg-[radial-gradient(circle_at_top,_rgba(32,94,67,0.14),_transparent_38%),linear-gradient(180deg,_#f5f7f2_0%,_#eef3ed_100%)] px-3 py-4 text-slate-900 sm:px-6 lg:px-8 ${className}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="SmartLearn dashboard"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <header className="overflow-hidden rounded-[28px] border border-white/70 bg-[#0f5a3e] text-white shadow-[0_24px_80px_rgba(15,90,62,0.22)]">
          <div className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-100/80">
                SmartLearn CITCS
              </p>
              <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h1>
              <p className="mt-1 text-sm text-emerald-50/80">{subtitle} · {studentRole}</p>
            </div>

            <div className="grid grid-cols-1 gap-3 text-center text-xs sm:grid-cols-3 sm:min-w-[340px]">
              <div className="rounded-2xl bg-white/10 px-4 py-3 backdrop-blur">
                <p className="text-emerald-100/75">Student</p>
                <p className="mt-1 truncate font-semibold text-white">{studentName}</p>
              </div>
              <div className="rounded-2xl bg-white/10 px-4 py-3 backdrop-blur">
                <p className="text-emerald-100/75">Level</p>
                <p className="mt-1 font-semibold text-white">{level}</p>
              </div>
              <div className="rounded-2xl bg-white/10 px-4 py-3 backdrop-blur">
                <p className="text-emerald-100/75">Streak</p>
                <p className="mt-1 font-semibold text-white">{streakDays}d</p>
              </div>
            </div>
          </div>
        </header>

        <div className="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)_300px]">
          <aside className="space-y-4 rounded-[28px] border border-white/70 bg-white/90 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-700">Active quests</p>
              <h2 className="mt-1 text-xl font-semibold text-slate-900">Program overview</h2>
            </div>

            <div className="space-y-3">
              <MetricBar label="Unlocked modules" value={`${activeCount}/${Math.max(totalModules, 1)}`} tone="emerald" />
              <MetricBar label="Locked modules" value={`${lockedCount}`} tone="amber" />
              <MetricBar label="Current XP" value={`${currentXp.toLocaleString()} XP`} tone="teal" />
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Selected module</p>
              <h3 className="mt-2 text-lg font-semibold text-slate-900">
                {activeModule?.title ?? 'No module selected'}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {activeModule?.description ?? 'Tap a quest node to inspect its progression, rewards, and lock state.'}
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">Progress status</p>
              <p className="mt-2 text-sm text-emerald-900">
                {activeCount > 0
                  ? 'The current map has reachable modules. Swipe across the map on touch devices to shift focus.'
                  : 'Add quest modules to begin the map.'}
              </p>
            </div>
          </aside>

          <main className="overflow-hidden rounded-[32px] border border-white/70 bg-white/80 shadow-[0_28px_90px_rgba(15,23,42,0.12)] backdrop-blur">
            <div className="flex items-center justify-between gap-4 border-b border-slate-200/80 px-5 py-4 sm:px-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Quest map</p>
                <h2 className="mt-1 text-2xl font-semibold text-slate-900">Path to mastery</h2>
              </div>
              <div className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-800">
                {expandedLevel} view · {progressState.unlockedModuleIds.length} unlocked
              </div>
            </div>

            <div className="relative min-h-[360px] px-3 py-4 sm:min-h-[520px] sm:px-6">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(148,163,184,0.14),_transparent_55%)]" />

              <svg className="absolute inset-0 hidden h-full w-full sm:block" aria-hidden="true">
                <path
                  d="M 90 470 C 180 360, 220 340, 290 300 S 430 170, 540 220 S 680 360, 780 130"
                  fill="none"
                  stroke="rgba(16,185,129,0.22)"
                  strokeDasharray="8 10"
                  strokeWidth="4"
                />
              </svg>

              {totalModules === 0 ? (
                <div className="relative z-10 flex h-[480px] items-center justify-center rounded-[28px] border border-dashed border-slate-300 bg-slate-50/70 text-sm text-slate-500">
                  No quest nodes have been added yet.
                </div>
              ) : (
                <div className="relative z-10 h-[480px]">
                  {progressState.orderedModules.map((module, index) => {
                    const isUnlocked = progressState.unlockedModuleIds.includes(module.id);
                    const isActive = selectedModuleId === module.id;
                    const position = getModulePosition(index, totalModules);
                    const completion = progressState.completionByModuleId[module.id] ?? 0;

                    return (
                      <button
                        key={module.id}
                        type="button"
                        onClick={() => handleModuleSelect(module.id)}
                        aria-pressed={isActive}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-3xl border px-4 py-3 text-left shadow-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/70 ${
                          isUnlocked
                            ? 'border-emerald-200 bg-white text-slate-900 hover:-translate-y-[calc(50%+2px)]'
                            : 'border-slate-200 bg-slate-100 text-slate-400'
                        } ${isActive ? 'ring-4 ring-emerald-100' : ''}`}
                        style={position}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl ${isUnlocked ? 'bg-emerald-600 text-white' : 'bg-slate-300 text-slate-500'}`}>
                            {index + 1}
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold">{module.title}</p>
                            <p className="mt-1 text-xs text-slate-500">
                              {module.quest_kind ?? module.kind ?? 'quest'} · {completion}%
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </main>

          <aside className="space-y-4 rounded-[28px] border border-white/70 bg-white/90 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-700">Leaderboard</p>
              <h2 className="mt-1 text-xl font-semibold text-slate-900">Social XP ranking</h2>
            </div>

            <div className="space-y-3">
              {leaderboard.map((entry, index) => (
                <div key={entry.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">#{index + 1} {entry.name}</p>
                    <p className="text-xs text-slate-500">{entry.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-emerald-700">{entry.xp.toLocaleString()} XP</p>
                    <p className="text-xs text-slate-500">{entry.trend}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-amber-100 bg-amber-50/80 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-700">Achievement vault</p>
              <div className="mt-3 space-y-3">
                {badges.map((badge) => (
                  <div key={badge.id} className="flex items-start gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm">
                    <div className={`mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl ${badge.earned ? 'bg-amber-400 text-white' : 'bg-slate-200 text-slate-500'}`}>
                      ★
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{badge.name}</p>
                      <p className="text-xs text-slate-500">{badge.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function MetricBar({ label, value, tone }) {
  const toneClasses = {
    emerald: 'bg-emerald-100 text-emerald-800',
    amber: 'bg-amber-100 text-amber-800',
    teal: 'bg-teal-100 text-teal-800',
  };

  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <span className="text-sm text-slate-600">{label}</span>
      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${toneClasses[tone] ?? toneClasses.emerald}`}>{value}</span>
    </div>
  );
}
