import { Navigate, Route, HashRouter as Router, Routes } from 'react-router-dom';
import SmartLearnShell from './components/SmartLearnShell';
import ProfessorPortal from './pages/ProfessorPortal';
import StudentQuestMap from './pages/StudentQuestMap';
import LeaderboardPage from './pages/LeaderboardPage';
import AchievementGallery from './pages/AchievementGallery';
import AdminAnalytics from './pages/AdminAnalytics';
import RiskMonitoring from './pages/RiskMonitoring';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<SmartLearnShell />}>
          <Route index element={<ProfessorPortal />} />
          <Route path="student" element={<StudentQuestMap />} />
          <Route path="leaderboard" element={<LeaderboardPage />} />
          <Route path="achievements" element={<AchievementGallery />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="risk" element={<RiskMonitoring />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}
