export const NAV_ITEMS = [
  { path: '/app/organization', label: 'Organization' },
  { path: '/app/clients', label: 'Manage Clients' },
  { path: '/app/roles', label: 'Manage Roles' },
  { path: '/app/teams', label: 'Manage Teams' },
  { path: '/app/users', label: 'Manage Users' },
  { path: '/app/projects', label: 'Manage Projects' },
  { path: '/app/activities', label: 'Manage Activities' },
  { path: '/app/skills', label: 'Manage Skills' },
  { path: '/app/time-tracking', label: 'Time Tracking' },
  { path: '/app/reports', label: 'Reports' },
];

export const MOCK_CLIENTS = [
  { Client_ID: 'CL001', Client_name: 'Acme Steel Corp', Client_Contact_name: 'Jane Smith', Client_Phone: '(602) 555-0148', Client_Email: 'jane.smith@acmesteel.com', Client_Website: 'acmesteel.com', address: '123 Business St, Phoenix, AZ, 85001', Client_Dscr: 'Commercial framing', Client_Status: true },
  { Client_ID: 'CL002', Client_name: 'Initech Builders', Client_Contact_name: 'Peter Gibbons', Client_Phone: '(512) 555-0173', Client_Email: 'peter.gibbons@initechbuilders.com', Client_Website: 'initechbuilders.com', address: '456 Office Pkwy, Austin, TX, 73301', Client_Dscr: 'Multi-family residential', Client_Status: true },
  { Client_ID: 'CL003', Client_name: 'Globex Development', Client_Contact_name: 'Hank Scorpio', Client_Phone: '(775) 555-0119', Client_Email: 'hank.scorpio@globexdev.com', Client_Website: 'globexdev.com', address: '789 Industrial Rd, Reno, NV, 89501', Client_Dscr: 'Light gauge steel supply', Client_Status: false },
];

export const MOCK_TIME_ENTRIES = [
  { id: 1, project: 'Riverside Apartments — Phase 2', activity: 'Panel Layout (Vertex BD)', start: 'Aug 26, 2026, 9:02 AM', duration: '02:14:37', running: false },
  { id: 2, project: 'Desert Ridge Office Park', activity: 'Shop Drawing Review', start: 'Aug 25, 2026, 1:30 PM', duration: '01:45:02', running: false },
];

export const MOCK_CLIENT_PROJECTS = {
  CL001: [
    { id: 'PR-101', name: 'Riverside Apartments — Phase 2', status: 'Active', hours: '184.5' },
    { id: 'PR-104', name: 'Shop Drawing Review — Globex', status: 'Paused', hours: '52.2' },
  ],
  CL002: [
    { id: 'PR-102', name: 'Desert Ridge Office Park', status: 'Active', hours: '96.0' },
  ],
};

export const MOCK_CLIENT_INVOICES = {
  CL001: [
    { id: 'INV-2031', date: 'Aug 1, 2026', amount: '$18,420.00', status: 'Paid' },
    { id: 'INV-2044', date: 'Sep 1, 2026', amount: '$21,150.00', status: 'Outstanding' },
  ],
  CL002: [
    { id: 'INV-2039', date: 'Aug 15, 2026', amount: '$9,860.00', status: 'Paid' },
  ],
};

export const MOCK_SKILLS = [
  { id: 1, name: 'Vertex BD Panel Layout', level: 'Expert' },
  { id: 2, name: 'Shop Drawing Review', level: 'Intermediate' },
  { id: 3, name: 'Steel Frame Erection', level: 'Expert' },
  { id: 4, name: 'AutoCAD', level: 'Intermediate' },
  { id: 5, name: 'OSHA 30', level: 'Certified' },
];

export const MOCK_PROFILE = {
  name: 'J. Smith',
  email: 'j.smith@ubcbim.com',
  phone: '(602) 555-0102',
  title: 'Field Technician',
  team: 'Riverside Crew',
  startDate: 'Mar 4, 2024',
};

export const MOCK_PERMISSION_MODULES = [
  'Organization', 'Manage Clients', 'Manage Roles', 'Manage Teams', 'Manage Users',
  'Manage Projects', 'Manage Activities', 'Manage Skills', 'Time Tracking', 'Reports',
];

export const MOCK_ROLES = [
  { id: 'RL001', name: 'Admin', description: 'Full access to every module', permissions: [...MOCK_PERMISSION_MODULES] },
  { id: 'RL002', name: 'HR', description: 'Manages people, roles, and teams', permissions: ['Manage Roles', 'Manage Teams', 'Manage Users'] },
  { id: 'RL003', name: 'Field Technician', description: 'Logs time and views assigned projects', permissions: ['Manage Projects', 'Time Tracking'] },
];

export const MOCK_ROLE_USERS = {
  RL001: [{ name: 'A. Rivera', email: 'a.rivera@ubcbim.com' }],
  RL002: [{ name: 'D. Chen', email: 'd.chen@ubcbim.com' }],
  RL003: [
    { name: 'J. Smith', email: 'j.smith@ubcbim.com' },
    { name: 'P. Gibbons', email: 'p.gibbons@ubcbim.com' },
    { name: 'H. Scorpio', email: 'h.scorpio@ubcbim.com' },
  ],
};
