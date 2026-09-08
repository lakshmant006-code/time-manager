import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopBar, Input, Tabs } from '../design-system';
import logo from '../assets/logo/ubc-bim-services-logo.png';

export function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState('employee');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [hoverPrimary, setHoverPrimary] = useState(false);
  const [hoverSecondary, setHoverSecondary] = useState(false);

  return (
    <div style={{ background: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'var(--font-sans)' }}>
      <TopBar />
      <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, width: '100%', padding: '48px 16px', boxSizing: 'border-box' }}>
        <img src={logo} alt="UBC BIM Services" style={{ width: 320, maxWidth: '100%', objectFit: 'contain', marginBottom: 48 }} />
        <div style={{ fontSize: 24, textAlign: 'center', marginBottom: 32, color: '#000' }}>
          <p style={{ margin: 0 }}>Welcome to Resource Management System</p><br />
          <p style={{ margin: 0 }}>{isSignUp ? 'Create your account' : 'Sign in to your account'}</p>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); navigate(role === 'admin' ? '/app/dashboard' : '/employee/timesheet'); }} style={{ width: '100%', maxWidth: 564 }}>
          <div style={{ borderRadius: 20, boxShadow: 'var(--shadow-login)', background: '#fff', padding: '24px 24px 32px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
              <label style={{ display: 'block', fontSize: 17, marginBottom: 8 }}>Sign in as</label>
              <Tabs
                options={[{ value: 'employee', label: 'Employee' }, { value: 'admin', label: 'Admin' }]}
                value={role}
                onChange={setRole}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 17, marginBottom: 8 }}>Email</label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" style={{ fontSize: 17, border: '1px solid #5c5c5c' }} required />
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <label style={{ fontSize: 17 }}>Password</label>
                {!isSignUp && <span style={{ fontSize: 17, color: '#000', cursor: 'pointer', textDecoration: 'none' }}>Forgot Password?</span>}
              </div>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" style={{ fontSize: 17, border: '1px solid #383838' }} required minLength={8} />
            </div>
            <button type="submit" onMouseEnter={() => setHoverPrimary(true)} onMouseLeave={() => setHoverPrimary(false)}
              style={{ width: '100%', padding: 12, fontSize: 17, fontFamily: 'var(--font-sans)', border: 'none', borderRadius: 5, cursor: 'pointer', background: hoverPrimary ? '#000' : '#c1c1c1', color: hoverPrimary ? '#fff' : '#000', transition: 'background-color 200ms,color 200ms' }}>
              {isSignUp ? 'Create Account' : 'Sign In'}
            </button>
            <button type="button" onMouseEnter={() => setHoverSecondary(true)} onMouseLeave={() => setHoverSecondary(false)} onClick={() => { setIsSignUp(!isSignUp); setEmail(''); setPassword(''); }}
              style={{ width: '100%', padding: 12, fontSize: 17, fontFamily: 'var(--font-sans)', border: 'none', borderRadius: 5, cursor: 'pointer', background: hoverSecondary ? '#000' : '#b3b3b3d1', color: hoverSecondary ? '#fff' : '#000', transition: 'background-color 200ms,color 200ms' }}>
              {isSignUp ? 'Back to Sign In' : 'Create New Account'}
            </button>
          </div>
        </form>
      </main>
      <footer style={{ padding: '24px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <div style={{ display: 'flex', gap: 32 }}><span style={{ fontSize: 12, fontWeight: 300, color: '#5c5c5c' }}>Privacy Policy</span><span style={{ fontSize: 12, fontWeight: 300, color: '#5c5c5c' }}>Terms of Service</span></div>
        <p style={{ fontSize: 12, fontWeight: 300, color: '#5c5c5c', margin: 0 }}>2026 Time Management. All rights reserved @ubc bim.</p>
      </footer>
    </div>
  );
}
