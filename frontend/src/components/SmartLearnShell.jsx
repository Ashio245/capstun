import { Link, NavLink, Outlet } from 'react-router-dom';

const navigation = [
  { to: '/', label: 'Professor Portal' },
  { to: '/student', label: 'Student Quest Map' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/achievements', label: 'Achievement Gallery' },
  { to: '/analytics', label: 'Dean Analytics' },
  { to: '/risk', label: 'Risk Monitoring' },
];

export default function SmartLearnShell() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(32,94,67,0.14),_transparent_38%),linear-gradient(180deg,_#f5f7f2_0%,_#eef3ed_100%)] text-slate-900">
      <div className="mx-auto flex min-h-screen w-full max-w-[1600px] flex-col lg:flex-row">
        <aside className="border-b border-white/70 bg-[#0f5a3e] px-5 py-6 text-white lg:w-72 lg:border-b-0 lg:border-r">
          <Link to="/" className="block">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-100/75">SmartLearn CITCS</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight">PLMun LMS</h1>
          </Link>

          <nav className="mt-8 grid gap-2">
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `rounded-2xl px-4 py-3 text-sm font-medium transition ${isActive ? 'bg-white text-[#0f5a3e]' : 'bg-white/10 text-white/85 hover:bg-white/15'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-8 rounded-3xl bg-white/10 p-4 text-sm leading-6 text-emerald-50/90">
            Role-based pages, pilot subject seeding, and reward-engine driven XP flows are wired for the three subject pilot.
          </div>
        </aside>

        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}