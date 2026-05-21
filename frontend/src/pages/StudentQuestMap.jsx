import ProgressMap from '../components/ProgressMap';
import { questMapModules } from '../data/smartLearnData';

export default function StudentQuestMap() {
  return <ProgressMap modules={questMapModules} currentXp={185} title="Student RPG Dashboard" subtitle="Quest Map" studentName="Arthur Mendoza" studentRole="Computer Programming 1" level={4} streakDays={12} />;
}
