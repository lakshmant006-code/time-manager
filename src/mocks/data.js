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
  { Client_ID: 'CL001', Client_name: 'Acme Steel Corp', Client_Contact_name: 'Jane Smith', address: '123 Business St, Phoenix, AZ, 85001', Client_Dscr: 'Commercial framing', Client_Status: true },
  { Client_ID: 'CL002', Client_name: 'Initech Builders', Client_Contact_name: 'Peter Gibbons', address: '456 Office Pkwy, Austin, TX, 73301', Client_Dscr: 'Multi-family residential', Client_Status: true },
  { Client_ID: 'CL003', Client_name: 'Globex Development', Client_Contact_name: 'Hank Scorpio', address: '789 Industrial Rd, Reno, NV, 89501', Client_Dscr: 'Light gauge steel supply', Client_Status: false },
];

export const MOCK_TIME_ENTRIES = [
  { id: 1, project: 'Riverside Apartments — Phase 2', activity: 'Panel Layout (Vertex BD)', start: 'Aug 26, 2026, 9:02 AM', duration: '02:14:37', running: false },
  { id: 2, project: 'Desert Ridge Office Park', activity: 'Shop Drawing Review', start: 'Aug 25, 2026, 1:30 PM', duration: '01:45:02', running: false },
];
