export const pilotSubjects = [
  { id: 'cp1', code: 'CP1', name: 'Computer Programming 1' },
  { id: 'ds', code: 'DS', name: 'Data Structures' },
  { id: 'dbm', code: 'DBM', name: 'Database Management' },
];

export const professorCampaigns = [
  {
    id: 'camp-1',
    title: 'Syntax Sprint',
    subject: 'Computer Programming 1',
    quests: 6,
    missions: 2,
    reward: 'Early Bird + Perfect Score',
  },
  {
    id: 'camp-2',
    title: 'Array Expedition',
    subject: 'Data Structures',
    quests: 5,
    missions: 3,
    reward: 'XP multiplier + badge drop',
  },
  {
    id: 'camp-3',
    title: 'Schema Forge',
    subject: 'Database Management',
    quests: 7,
    missions: 2,
    reward: 'Normalization mastery',
  },
];

export const questMapModules = [
  {
    id: 'cp1-intro',
    title: 'Syntax Sprint',
    description: 'Introductory programming quest for CP1.',
    unlockXp: 0,
    xpGoal: 100,
    quest_kind: 'quest',
  },
  {
    id: 'ds-array-run',
    title: 'Array Run',
    description: 'Data structures mission focused on arrays and traversal.',
    unlockXp: 120,
    xpGoal: 220,
    quest_kind: 'mission',
  },
  {
    id: 'dbm-schema-forge',
    title: 'Schema Forge',
    description: 'Database management quest on normalization and design.',
    unlockXp: 260,
    xpGoal: 400,
    quest_kind: 'quest',
  },
];

export const leaderboardRows = [
  { id: 1, name: 'Kael Storm', role: 'Top Student', xp: 24100, trend: '+1,400 XP', badge: 'Gold' },
  { id: 2, name: 'Marcos Torres', role: 'Quest Runner', xp: 19320, trend: '+820 XP', badge: 'Silver' },
  { id: 3, name: 'Eleanor Vance', role: 'Badge Collector', xp: 18450, trend: '+660 XP', badge: 'Bronze' },
  { id: 4, name: 'Arthur Mendoza', role: 'Pilot Learner', xp: 15240, trend: '+480 XP', badge: 'Rising' },
];

export const achievementRows = [
  { id: 'early-bird', name: 'Early Bird', description: 'Submitted within 24 hours', earned: true, xp: 25 },
  { id: 'perfect-score', name: 'Perfect Score', description: 'Unlocked XP multiplier', earned: true, xp: 50 },
  { id: 'code-warner', name: 'Code Warrior', description: 'Programming streak milestone', earned: false, xp: 75 },
  { id: 'schema-sage', name: 'Schema Sage', description: 'Normalized a 3NF schema', earned: true, xp: 100 },
];

export const engagementHeatmap = [
  ['CP1', 82, 74, 91, 88, 68, 77],
  ['DS', 70, 66, 79, 82, 74, 71],
  ['DBM', 64, 69, 72, 86, 80, 75],
];

export const riskRows = [
  { id: 1, name: 'Sofia Reyes', subject: 'Data Structures', risk: 'High', gap: '11 days without leveling up' },
  { id: 2, name: 'Mark Dizon', subject: 'Database Management', risk: 'Medium', gap: '7 days without leveling up' },
  { id: 3, name: 'Lia Santos', subject: 'Computer Programming 1', risk: 'Low', gap: '3 days without leveling up' },
];
