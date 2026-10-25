import React, { useState } from 'react';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowRight, AlertCircle, KeyRound } from 'lucide-react';
import { UserSession } from '../types';

interface LoginPageProps {
  onLogin: (session: UserSession) => void;
}

export const DEMO_CREDENTIALS = {
  email: 'analyst@signal-source.org',
  password: 'ClaimResearch2026!',
  name: 'Dr. Evelyn Reed',
  role: 'Senior NLP Research Analyst',
  organization: 'Institute for Information Integrity & NLP Lab',
};

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();

    if (!cleanEmail || !cleanPass) {
      setErrorMessage('Please provide both an Email address and Password.');
      return;
    }

    setIsSubmitting(true);

    // Verify credentials
    setTimeout(() => {
      if (
        (cleanEmail === DEMO_CREDENTIALS.email.toLowerCase() || cleanEmail === 'analyst@signal-source.org' || cleanEmail === 'researcher@signal-source.org') &&
        cleanPass === DEMO_CREDENTIALS.password
      ) {
        onLogin({
          email: cleanEmail,
          name: DEMO_CREDENTIALS.name,
          role: DEMO_CREDENTIALS.role,
          organization: DEMO_CREDENTIALS.organization,
          authenticatedAt: new Date().toISOString(),
        });
      } else {
        setIsSubmitting(false);
        setErrorMessage('Authentication failed: Invalid email or password. Please use the verified demo credentials provided below.');
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col justify-between text-[#17263d]">
      {/* Top Header */}
      <header className="border-b border-[#e5eaf0] bg-white py-4 px-6 sm:px-12">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#315fce] flex items-center justify-center text-white shadow-sm">
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                <path d="M4 18.5V5.5h3.2l4.8 7 4.8-7H20v13h-3V10l-5 7-5-7v8.5H4Z" fill="currentColor"/>
              </svg>
            </div>
            <div>
              <span className="font-extrabold tracking-tight text-sm text-[#17263d]">
                SIGNAL <span className="text-[#8a97a9] font-medium">&amp;</span> SOURCE
              </span>
              <span className="block text-[11px] font-medium text-[#66758a]">
                Claim Classification Lab · Capstone 12
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#168579] bg-[#e9f7f4] px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#168579] animate-pulse"></span>
            Peer-Reviewed Benchmark
          </div>
        </div>
      </header>

      {/* Main Form Area */}
      <main className="max-w-md w-full mx-auto my-8 px-4 sm:px-0">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold text-[#315fce] uppercase tracking-wider mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#168579]"></span>
            Researcher Access Portal
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#17263d]">
            Sign in to Research Lab
          </h1>
          <p className="text-xs text-[#66758a] mt-1.5 max-w-sm mx-auto">
            Access the LIAR benchmark evaluation workspace, interactive confusion matrices, and verification modules.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white border border-[#e5eaf0] rounded-2xl p-6 sm:p-8 shadow-[0_15px_45px_rgba(26,48,84,0.06)]">
          {errorMessage && (
            <div className="mb-5 p-3.5 bg-[#fef2f2] border border-[#fecaca] rounded-xl flex items-start gap-2.5 text-xs text-[#991b1b] animate-shake">
              <AlertCircle className="w-4 h-4 text-[#ef4444] shrink-0 mt-0.5" />
              <div className="leading-relaxed">{errorMessage}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#3d4b60] mb-1.5" htmlFor="email">
                Research Account Email / Login ID
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#8794a7] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="analyst@signal-source.org"
                  className="w-full h-11 pl-10 pr-3 text-xs bg-white border border-[#dce3ec] rounded-xl text-[#17263d] placeholder:text-[#a0a9b6] focus:outline-none focus:border-[#315fce] focus:ring-2 focus:ring-[#315fce]/15 transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold text-[#3d4b60]" htmlFor="password">
                  Password
                </label>
                <span className="text-[11px] text-[#8794a7]">Required</span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#8794a7] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full h-11 pl-10 pr-10 text-xs bg-white border border-[#dce3ec] rounded-xl text-[#17263d] placeholder:text-[#a0a9b6] focus:outline-none focus:border-[#315fce] focus:ring-2 focus:ring-[#315fce]/15 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 text-[#8290a3] hover:text-[#315fce] rounded-lg transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-[#5d6b7f]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-[#cbd5e1] text-[#315fce] focus:ring-[#315fce] w-3.5 h-3.5"
                />
                Remember this session
              </label>
              <span className="text-[11px] text-[#8794a7] font-medium">Secured Workspace</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 bg-[#315fce] hover:bg-[#244aa5] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-[0_7px_16px_rgba(49,95,206,0.22)] active:scale-[0.99] transition-all disabled:opacity-75"
            >
              {isSubmitting ? (
                <span className="inline-flex items-center gap-2">
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Authenticating...
                </span>
              ) : (
                <>
                  <span>Sign In to Access Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials Box */}
          <div className="mt-6 pt-5 border-t border-[#f1f5f9]">
            <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#166534]">
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Verified Demo Access Credentials</span>
                </div>
                <span className="text-[10px] font-semibold bg-[#dcfce7] text-[#15803d] px-2 py-0.5 rounded-md">
                  Active
                </span>
              </div>
              <p className="text-[11px] text-[#166534]/90 mb-3 leading-relaxed">
                Use these verified credentials to authenticate and inspect the complete project modules:
              </p>
              <div className="space-y-1.5 text-xs font-mono bg-white/80 p-2.5 rounded-lg border border-[#bbf7d0]/60">
                <div className="flex justify-between items-center">
                  <span className="text-[#64748b] text-[11px]">Email ID:</span>
                  <span className="font-semibold text-[#1e293b]">{DEMO_CREDENTIALS.email}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#64748b] text-[11px]">Password:</span>
                  <span className="font-semibold text-[#1e293b]">{DEMO_CREDENTIALS.password}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-[#64748b]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#168579]" />
            <span>Encrypted local session · Client-side research environment</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#e5eaf0] py-4 px-6 text-center text-xs text-[#8793a3] bg-white">
        © 2026 Signal &amp; Source · Capstone 12 Educational NLP Prototype · All Rights Reserved
      </footer>
    </div>
  );
};
