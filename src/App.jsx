import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { ClientsList } from './pages/ClientsList';
import { ClientProfile } from './pages/ClientProfile';
import { RegisterClient } from './pages/RegisterClient';
import { RoleList } from './pages/RoleList';
import { RoleDetail } from './pages/RoleDetail';
import { AddRole } from './pages/AddRole';
import { TimeTracking } from './pages/TimeTracking';
import { ComingSoon } from './pages/ComingSoon';
import { Timesheet } from './pages/employee/Timesheet';
import { Skills } from './pages/employee/Skills';
import { Profile } from './pages/employee/Profile';

const COMING_SOON_ROUTES = [
  { path: '/app/organization', title: 'Organization' },
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

        <Route path="/employee/timesheet" element={<Timesheet />} />
        <Route path="/employee/skills" element={<Skills />} />
        <Route path="/employee/profile" element={<Profile />} />

        <Route path="/app/dashboard" element={<Dashboard />} />
        <Route path="/app/clients" element={<ClientsList />} />
        <Route path="/app/clients/new" element={<RegisterClient />} />
        <Route path="/app/clients/:clientId" element={<ClientProfile />} />
        <Route path="/app/roles" element={<RoleList />} />
        <Route path="/app/roles/new" element={<AddRole />} />
        <Route path="/app/roles/:roleId" element={<RoleDetail />} />
        <Route path="/app/time-tracking" element={<TimeTracking />} />
        {COMING_SOON_ROUTES.map((r) => (
          <Route key={r.path} path={r.path} element={<ComingSoon title={r.title} />} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
