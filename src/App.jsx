import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { ClientsList } from './pages/ClientsList';
import { RegisterClient } from './pages/RegisterClient';
import { TimeTracking } from './pages/TimeTracking';
import { ComingSoon } from './pages/ComingSoon';

const COMING_SOON_ROUTES = [
  { path: '/app/organization', title: 'Organization' },
  { path: '/app/roles', title: 'Manage Roles' },
  { path: '/app/teams', title: 'Manage Teams' },
  { path: '/app/users', title: 'Manage Users' },
  { path: '/app/projects', title: 'Manage Projects' },
  { path: '/app/activities', title: 'Manage Activities' },
  { path: '/app/skills', title: 'Manage Skills' },
  { path: '/app/reports', title: 'Reports' },
];

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/app/dashboard" element={<Dashboard />} />
        <Route path="/app/clients" element={<ClientsList />} />
        <Route path="/app/clients/new" element={<RegisterClient />} />
        <Route path="/app/time-tracking" element={<TimeTracking />} />
        {COMING_SOON_ROUTES.map((r) => (
          <Route key={r.path} path={r.path} element={<ComingSoon title={r.title} />} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
