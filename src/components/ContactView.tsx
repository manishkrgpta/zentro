import React, { useEffect, useState } from 'react';
import { Mail, Phone, Terminal, CheckCircle2, Send, Sliders } from 'lucide-react';

type ContactViewProps = {
  setActiveView?: (view: string) => void;
};

export default function ContactView({ setActiveView }: ContactViewProps) {
  const [selectedServices, setSelectedServices] = useState<string[]>(['ai-automation']);
  const [budgetRange, setBudgetRange] = useState('1500-3000');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [brief, setBrief] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitLogs, setSubmitLogs] = useState<string[]>([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [ticketRef, setTicketRef] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [recentContacts, setRecentContacts] = useState<any[]>([]);
  const [showRecent, setShowRecent] = useState(false);

  useEffect(() => {
    if (submitSuccess && setActiveView) {
      const t = setTimeout(() => setActiveView('home'), 2500);
      return () => clearTimeout(t);
    }
  }, [submitSuccess, setActiveView]);

  const services = [
    { id: 'ai-automation', label: 'AI Agents & Automation', priceFactor: 8500 },
    { id: 'custom-websites', label: 'Custom Websites & Web Apps', priceFactor: 4500 },
    { id: 'saas-development', label: 'SaaS Platform Development', priceFactor: 12000 },
    { id: 'mobile-apps', label: 'Mobile Apps (iOS/Android)', priceFactor: 7000 },
    { id: 'ecommerce', label: 'E‑commerce Platforms', priceFactor: 9000 },
    { id: 'data-analytics', label: 'Data Engineering & Analytics', priceFactor: 10000 },
    { id: 'ui-ux', label: 'UI / UX Design & Prototyping', priceFactor: 3500 },
    { id: 'cloud-infra', label: 'Cloud Infrastructure & DevOps', priceFactor: 8000 },
    { id: 'blockchain', label: 'Blockchain / Web3 Integrations', priceFactor: 11000 },
  ];

  const handleServiceToggle = (id: string) => {
    setSelectedServices(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const budgetOptions = [
    { value: '1500-3000', label: '1,500 - 3,000' },
    { value: '3000-5000', label: '3,000 - 5,000' },
    { value: '5000-10000', label: '5,000 - 10,000' },
    { value: '10000-20000', label: '10,000 - 20,000' },
    { value: '20000-40000', label: '20,000 - 40,000' },
    { value: '40000-50000', label: '40,000 - 50,000' },
  ];

  const calculateBudgetRange = () => {
    const base = selectedServices.reduce((sum, serviceId) => {
      const s = services.find((it) => it.id === serviceId);
      return sum + (s?.priceFactor || 0);
    }, 0);
    const rawValue = Math.round(base * 0.5);
    if (rawValue === 0) return { label: 'Choose capabilities', min: 0, max: 0 };
    const cappedValue = Math.min(50000, Math.max(1500, rawValue));
    const min = Math.max(1500, Math.round(cappedValue * 0.85));
    const max = Math.min(50000, Math.round(cappedValue * 1.15));
    return { label: `$${min.toLocaleString()} - $${max.toLocaleString()}`, min, max };
  };

  const budget = calculateBudgetRange();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !brief || !budgetRange) {
      setErrorMessage('Please complete your name, email address, budget range, and system objectives.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(String(email))) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (phone) {
      const digits = String(phone).replace(/\s+/g, '');
      if (!/^\d+$/.test(digits)) {
        setErrorMessage('Phone number must contain digits only (0-9).');
        return;
      }
    }

    setErrorMessage('');
    setIsSubmitting(true);
    setSubmitLogs(['[INFO] Preparing secure request package...']);
    setSubmitSuccess(false);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, countryCode, phone, company, budgetRange, brief, selectedServices, budget: budgetRange || budget.label }),
      });

      let result: any = null;
      const text = await response.text();
      try { result = text ? JSON.parse(text) : {}; } catch { result = { message: text }; }

      setSubmitLogs((p) => [...p, `[HTTP ${response.status}] ${JSON.stringify(result)}`]);
      if (!response.ok) throw new Error(result?.message || 'Failed to submit contact request.');

      const generatedRef = result?.reference || `ZNT-${Math.floor(100000 + Math.random() * 900000)}`;
      setTicketRef(generatedRef);
      setSubmitLogs((p) => [...p, '[SUCCESS] Contact request saved.']);
      setSubmitSuccess(true);

      // reset form
      setName(''); setEmail(''); setPhone(''); setCompany(''); setBrief(''); setSelectedServices([]); setBudgetRange('1500-3000');
    } catch (err: any) {
      const message = err?.message || 'Unexpected error while submitting the request.';
      setErrorMessage(message);
      setSubmitLogs((p) => [...p, `[ERROR] ${message}`]);
      try { console.error('[Contact submit] error:', err); } catch {}
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative w-full pt-28 pb-20" id="zentro-contact-view-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="text-left mb-16 max-w-4xl border-b border-slate-900 pb-10 flex flex-col gap-3">
          <span className="immersive-tag-mono">// SYSTEM REVIEW</span>
          <h1 className="text-4xl sm:text-5xl font-sans font-extrabold text-white tracking-tight mt-2">Book a Consultation</h1>
          <p className="text-white/60 text-sm sm:text-base">Configure your desired parameters below to receive an approximate budget estimate.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
          <div className="lg:col-span-5 bg-slate-950 border border-slate-900 rounded-3xl p-6 text-left relative overflow-hidden" id="project-calculator-block">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-[10px] uppercase font-bold tracking-wider mb-4">
              <Sliders className="w-3.5 h-3.5" />
              <span>1. Config Project Parameters</span>
            </div>

            <div className="flex flex-col gap-3 mb-4" id="calculator-checkbox-list">
              <span className="text-xs font-mono text-slate-500 uppercase font-semibold">Select Services Needed</span>
              <div className="flex flex-col gap-2">
                {services.map((item) => {
                  const isChecked = selectedServices.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleServiceToggle(item.id)}
                      className={`px-4 py-3 rounded-xl border text-xs text-left transition-all cursor-pointer flex items-center justify-between ${isChecked ? 'bg-blue-600/10 border-blue-500/30 text-white font-semibold' : 'bg-slate-950/80 border-slate-900 text-slate-400 hover:text-slate-300'}`}
                    >
                      <span>{item.label}</span>
                      <div className={`w-4 h-4 rounded border flex items-center justify-center ${isChecked ? 'bg-cyan-500 border-cyan-400' : 'border-slate-800'}`}>
                        {isChecked && <CheckCircle2 className="w-3.5 h-3.5 text-slate-950" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-[#0a0f29]/40 border border-slate-900 p-4 rounded-2xl flex flex-col gap-2 mt-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500 uppercase">Suggested Market Budget</span>
                <span className="text-cyan-400 font-bold">{selectedServices.length > 0 ? '50% off agency' : 'CHOOSE OPTIONS'}</span>
              </div>
              <div className="text-white text-2xl font-mono font-bold mt-1 text-cyan-400">{selectedServices.length > 0 ? budget.label : '$0.00'}</div>
              <p className="text-[10px] font-sans text-slate-500 leading-normal mt-1 border-t border-slate-900/80 pt-2">*Ballpark estimate.</p>
            </div>
          </div>

          <div className="lg:col-span-7 bg-slate-950/40 border border-slate-900 rounded-3xl p-6 sm:p-8 text-left relative overflow-hidden" id="consultation-form-block">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-[10px] uppercase font-bold tracking-wider mb-6">
              <Mail className="w-3.5 h-3.5" />
              <span>2. System Specification Brief</span>
            </div>

            {submitSuccess ? (
              <div className="bg-slate-950/80 border border-emerald-500/30 p-8 rounded-2xl text-center flex flex-col items-center gap-4 animate-fade-in" id="submission-success-card">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-6 h-6 animate-pulse" />
                </div>
                <h3 className="text-white text-lg font-sans font-bold mt-2">Consultation Booking Secure!</h3>
                <p className="text-slate-400 text-xs font-sans leading-relaxed max-w-md">Your project specifications have been securely transmitted. We will review and respond within 12 business hours.</p>
                <div className="bg-slate-900 border border-slate-950 px-4 py-2.5 rounded-xl text-xs font-mono text-slate-300 flex items-center gap-2 mt-2">
                  <span>Reference ID:</span>
                  <span className="text-cyan-400 font-bold">{ticketRef}</span>
                </div>

                <div className="mt-4 flex flex-col items-center gap-3 w-full">
                  <button onClick={() => setSubmitSuccess(false)} className="px-5 py-2.5 bg-[#0d153a] w-full max-w-xs text-xs font-mono text-cyan-400 font-semibold rounded-lg">Submit Another Request</button>
                  <div className="flex gap-2 mt-2">
                    <button onClick={async () => { try { const res = await fetch('/api/contacts'); const data = await res.json(); setRecentContacts(data.rows || []); setShowRecent(true); } catch (e) { console.error(e); setErrorMessage('Failed to fetch recent contacts.'); } }} className="px-4 py-2 bg-slate-800 text-xs text-white rounded-lg">View Recent Submissions</button>
                    <a href="/api/contacts/download" className="px-4 py-2 bg-slate-800 text-xs text-white rounded-lg" download>Download CSV</a>
                    <button onClick={async () => { try { setSubmitLogs(p=>[...p,'[ACTION] Resend last entry...']); const r = await fetch('/api/contact/resend', { method: 'POST' }); const j = await r.json(); if (!r.ok) throw new Error(j?.message || 'Resend failed'); setSubmitLogs(p=>[...p,`[RESEND] ${j.message}`]); } catch (e:any) { setSubmitLogs(p=>[...p,`[RESEND-ERROR] ${e.message||e}`]); setErrorMessage('Resend failed: '+(e.message||e)); } }} className="px-4 py-2 bg-amber-600 text-xs text-black rounded-lg">Resend Last Email</button>
                  </div>
                  <div className="mt-2 text-xs text-slate-400">You will be redirected to the homepage shortly.</div>
                </div>
              </div>
            ) : isSubmitting ? (
              <div className="flex flex-col bg-slate-950 rounded-2xl border border-slate-900 shadow-inner overflow-hidden text-left h-80" id="submission-terminal-console">
                <div className="bg-slate-900/60 px-4 py-2 border-b border-slate-900 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-slate-500 animate-spin" />
                    <span className="text-[10px] font-mono text-slate-400">secure-gateway-tx.log</span>
                  </div>
                </div>
                <div className="p-4 flex-grow font-mono text-[10px] text-slate-400 overflow-y-auto space-y-1.5 leading-normal">
                  {submitLogs.map((log, idx) => <div key={idx} className="text-slate-400">{log}</div>)}
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4" id="consultation-booking-form">
                {errorMessage ? <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 px-4 py-3 text-sm text-rose-200">{errorMessage}</div> : null}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono text-slate-500 uppercase font-bold">Your Name *</label>
                    <input type="text" placeholder="e.g. John Doe" required value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-slate-950 border border-slate-900 rounded-xl px-4 py-3 text-xs text-white" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono text-slate-500 uppercase font-bold">Email Address *</label>
                    <input type="email" placeholder="e.g. john@company.com" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-slate-950 border border-slate-900 rounded-xl px-4 py-3 text-xs text-white" />
                  </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono text-slate-500 uppercase font-bold">Company / Product</label>
                    <input type="text" placeholder="e.g. Acme Corp or Project X" value={company} onChange={(e) => setCompany(e.target.value)} className="w-full bg-slate-950 border border-slate-900 rounded-xl px-4 py-3 text-xs text-white" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono text-slate-500 uppercase font-bold">Country Code</label>
                    <select value={countryCode} onChange={(e) => setCountryCode(e.target.value)} className="w-full bg-slate-950 border border-slate-900 rounded-xl px-4 py-3 text-xs text-white">
                      <option value="+1">🇺🇸 USA +1</option>
                      <option value="+91">🇮🇳 India +91</option>
                      <option value="+44">🇬🇧 United Kingdom +44</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono text-slate-500 uppercase font-bold">Phone Number</label>
                    <input type="tel" placeholder="e.g. 9876543210" value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))} inputMode="numeric" pattern="[0-9]*" className="w-full bg-slate-950 border border-slate-900 rounded-xl px-4 py-3 text-xs text-white" />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-mono text-slate-500 uppercase font-bold">Select Budget Range *</label>
                  <select value={budgetRange} onChange={(e) => setBudgetRange(e.target.value)} required className="w-full bg-slate-950 border border-slate-900 rounded-xl px-4 py-3 text-xs text-white">
                    {budgetOptions.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-mono text-slate-500 uppercase font-bold">Describe Your System Objectives *</label>
                  <textarea required value={brief} onChange={(e) => setBrief(e.target.value)} className="w-full bg-slate-950 border border-slate-900 rounded-xl p-4 text-xs text-white h-32" />
                </div>

                <button type="submit" className="w-full py-3.5 bg-white rounded-full text-xs font-bold text-[#050816] flex items-center justify-center gap-2 mt-2"><Send className="w-3.5 h-3.5 text-[#050816]" /> Submit Secure Request</button>
              </form>
            )}

            {showRecent && (
              <div className="mt-6 bg-slate-900 border border-slate-800 rounded-2xl p-4 text-sm text-slate-300">
                <div className="flex items-center justify-between mb-2">
                  <strong>Recent Submissions</strong>
                  <button onClick={() => setShowRecent(false)} className="text-xs text-slate-400">Close</button>
                </div>
                {recentContacts.length === 0 ? (<div className="text-xs text-slate-500">No submissions found.</div>) : (
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {recentContacts.slice().reverse().map((r, i) => (
                      <div key={i} className="border-b border-slate-800 pb-2">
                        <div className="text-xs text-slate-400">{r.timestamp} — <span className="text-white">{r.name}</span></div>
                        <div className="text-[11px] text-slate-300">{r.email} • {r.countryCode} {r.phone}</div>
                        <div className="text-[11px] text-slate-500">Budget: {r.budgetRange} • Services: {r.services}</div>
                        <div className="text-[11px] text-slate-400 mt-1">{r.brief}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="direct-contact-grid">
          {[
            { icon: <Mail className="w-4 h-4 text-cyan-400" />, label: 'Secure Email Address', value: 'hello@zentro.ai', sub: 'PGP signature verified' },
            { icon: <Phone className="w-4 h-4 text-blue-400" />, label: '🇺🇸 USA Contact', value: '+1 (800) 555-1001', sub: 'Regional sales desk' },
            { icon: <Phone className="w-4 h-4 text-blue-400" />, label: '🇪🇺 Europe Contact', value: '+44 20 7946 0958', sub: 'EU client support' },
            { icon: <Phone className="w-4 h-4 text-blue-400" />, label: '🇦🇪 UAE Contact', value: '+971 4 123 4567', sub: 'MENA project inquiries' }
          ].map((item, idx) => (
            <div key={idx} className="bg-slate-950 border border-slate-900 p-5 rounded-2xl text-left flex flex-col gap-3" id={`contact-channel-${idx}`}>
              <div className="w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center border border-slate-900">{item.icon}</div>
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-slate-500 uppercase font-bold leading-none">{item.label}</span>
                <span className="text-white text-xs font-sans font-bold mt-1.5 leading-tight">{item.value}</span>
                <span className="text-[9px] font-mono text-slate-600 mt-1 leading-none">{item.sub}</span>
              </div>
            </div>
          ))}
        </section>

      </div>
    </div>
  );
}
