import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopBar, Input } from '../design-system';
import { Loader } from '../components/Loader';
import { ShaderBackground } from '../components/ShaderBackground';
import { LiquidGlassCard } from '../components/LiquidGlassCard';
import logo from '../assets/logo/logo-dark.png';

export function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState('employee');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [hoverPrimary, setHoverPrimary] = useState(false);
  const [hoverSecondary, setHoverSecondary] = useState(false);
  const [signingIn, setSigningIn] = useState(false);

  useEffect(() => {
    if (!signingIn) return;
    const t = setTimeout(() => navigate('/app/dashboard'), 3000);
    return () => clearTimeout(t);
  }, [signingIn, navigate]);

  if (signingIn) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface-app)' }}>
        <Loader />
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'var(--font-sans)', overflow: 'hidden' }}>
      <style>{'.tm-login-input::placeholder{color:rgba(255,255,255,0.6);}'}</style>
      <ShaderBackground style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} />
      <div style={{ position: 'relative', zIndex: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
      <TopBar />
      <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, width: '100%', padding: '48px 16px', boxSizing: 'border-box' }}>
        <img src={logo} alt="Summer" style={{ width: 320, maxWidth: '100%', objectFit: 'contain', marginBottom: 48, filter: 'drop-shadow(0 4px 24px rgba(0,0,0,0.35))' }} />
        <div style={{ fontSize: 24, textAlign: 'center', marginBottom: 32, color: '#fff', textShadow: '0 2px 12px rgba(0,0,0,0.45)' }}>
          <p style={{ margin: 0 }}>Welcome to Resource Management System</p><br />
          <p style={{ margin: 0 }}>{isSignUp ? 'Create your account' : 'Sign in to your account'}</p>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); if (role === 'admin') { setSigningIn(true); } else { navigate('/employee/dashboard'); } }} style={{ width: '100%', maxWidth: 782 }}>
          <LiquidGlassCard
            draggable={false}
            borderRadius="30px"
            blurIntensity="lg"
            shadowIntensity="xs"
            glowIntensity="xs"
            background="rgba(217,217,217,0.2)"
            style={{ width: '100%', boxSizing: 'border-box', border: '3px solid #fff', boxShadow: 'var(--shadow-login)' }}
          >
            <div style={{ padding: '48px 61px 46px 77px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
              <div style={{ marginBottom: 32 }}>
                <label style={{ display: 'block', fontSize: 17, marginBottom: 8, color: '#fff', textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>Sign in as</label>
                <div style={{ display: 'flex', gap: 12 }}>
                  {[{ value: 'employee', label: 'Employee' }, { value: 'admin', label: 'Admin' }].map((opt) => (
                    <button key={opt.value} type="button" onClick={() => setRole(opt.value)}
                      style={{ flex: '0 0 auto', minWidth: 133, height: 58, padding: '0 24px', borderRadius: 10, border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: 17, transition: 'background-color 200ms', background: role === opt.value ? 'rgba(0,0,0,0.62)' : 'rgba(217,217,217,0.2)', color: '#fff' }}>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', fontSize: 17, marginBottom: 8, color: '#fff', textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>Email</label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" required
                  className="tm-login-input"
                  style={{ height: 83, padding: '0 24px', fontSize: 17, color: '#fff', background: 'rgba(217,217,217,0.2)', border: 'none', borderRadius: 14 }} />
              </div>
              <div style={{ marginBottom: 56 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <label style={{ fontSize: 17, color: '#fff', textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>Password</label>
                  {!isSignUp && <span style={{ fontSize: 17, color: '#fff', opacity: 0.85, cursor: 'pointer', textDecoration: 'none' }}>Forgot Password?</span>}
                </div>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required minLength={8}
                  className="tm-login-input"
                  style={{ height: 83, padding: '0 24px', fontSize: 17, color: '#fff', background: 'rgba(217,217,217,0.2)', border: 'none', borderRadius: 14 }} />
              </div>
              <button type="submit" onMouseEnter={() => setHoverPrimary(true)} onMouseLeave={() => setHoverPrimary(false)}
                style={{ width: '100%', height: 83, marginBottom: 18, fontSize: 17, fontFamily: 'var(--font-sans)', border: 'none', borderRadius: 14, cursor: 'pointer', background: hoverPrimary ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.62)', color: '#fff', transition: 'background-color 200ms' }}>
                {isSignUp ? 'Create Account' : 'Sign In'}
              </button>
              <button type="button" onMouseEnter={() => setHoverSecondary(true)} onMouseLeave={() => setHoverSecondary(false)} onClick={() => { setIsSignUp(!isSignUp); setEmail(''); setPassword(''); }}
                style={{ width: '100%', height: 83, fontSize: 17, fontFamily: 'var(--font-sans)', border: 'none', borderRadius: 14, cursor: 'pointer', background: hoverSecondary ? 'rgba(217,217,217,0.32)' : 'rgba(217,217,217,0.2)', color: '#fff', transition: 'background-color 200ms' }}>
                {isSignUp ? 'Back to Sign In' : 'Create New Account'}
              </button>
            </div>
          </LiquidGlassCard>
        </form>
      </main>
      <footer style={{ padding: '24px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <div style={{ display: 'flex', gap: 32 }}><span style={{ fontSize: 12, fontWeight: 300, color: '#fff', opacity: 0.85 }}>Privacy Policy</span><span style={{ fontSize: 12, fontWeight: 300, color: '#fff', opacity: 0.85 }}>Terms of Service</span></div>
        <p style={{ fontSize: 12, fontWeight: 300, color: '#fff', opacity: 0.7, margin: 0 }}>2026 Time Management. All rights reserved @ubc bim.</p>
      </footer>
      </div>
    </div>
  );
}
