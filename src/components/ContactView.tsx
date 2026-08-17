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
  const [serverMessage, setServerMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (submitSuccess && setActiveView) {
      const t = setTimeout(() => setActiveView('home'), 2500);
      return () => clearTimeout(t);
    }
  }, [submitSuccess, setActiveView]);

  const services = [
    { id: 'ai-automation', label: 'AI Agents & Automation', priceFactor: 1750 },
    { id: 'custom-websites', label: 'Custom Websites & Web Apps', priceFactor: 2000 },
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

  const countryOptions = [
    { value: '+1', label: '🇺🇸 United States +1' },{ value: '+44', label: '🇬🇧 United Kingdom +44' },{ value: '+91', label: '🇮🇳 India +91' },
    { value: '+61', label: '🇦🇺 Australia +61' },{ value: '+49', label: '🇩🇪 Germany +49' },{ value: '+33', label: '🇫🇷 France +33' },
    { value: '+39', label: '🇮🇹 Italy +39' },{ value: '+81', label: '🇯🇵 Japan +81' },{ value: '+82', label: '🇰🇷 South Korea +82' },
    { value: '+34', label: '🇪🇸 Spain +34' },{ value: '+55', label: '🇧🇷 Brazil +55' },{ value: '+7', label: '🇷🇺 Russia +7' },
    { value: '+27', label: '🇿🇦 South Africa +27' },{ value: '+64', label: '🇳🇿 New Zealand +64' },{ value: '+852', label: '🇭🇰 Hong Kong +852' },
    { value: '+886', label: '🇹🇼 Taiwan +886' },{ value: '+971', label: '🇦🇪 United Arab Emirates +971' },{ value: '+47', label: '🇳🇴 Norway +47' },
    { value: '+46', label: '🇸🇪 Sweden +46' },{ value: '+31', label: '🇳🇱 Netherlands +31' },{ value: '+32', label: '🇧🇪 Belgium +32' },
    { value: '+353', label: '🇮🇪 Ireland +353' },{ value: '+60', label: '🇲🇾 Malaysia +60' },{ value: '+65', label: '🇸🇬 Singapore +65' },
    { value: '+66', label: '🇹🇭 Thailand +66' },{ value: '+62', label: '🇮🇩 Indonesia +62' },{ value: '+63', label: '🇵🇭 Philippines +63' },
    { value: '+84', label: '🇻🇳 Vietnam +84' },{ value: '+86', label: '🇨🇳 China +86' },{ value: '+38', label: '🇺🇦 Ukraine +380' },
    { value: '+48', label: '🇵🇱 Poland +48' },{ value: '+420', label: '🇨🇿 Czech Republic +420' },{ value: '+36', label: '🇭🇺 Hungary +36' },
    { value: '+52', label: '🇲🇽 Mexico +52' },{ value: '+1', label: '🇨🇦 Canada +1' },{ value: '+966', label: '🇸🇦 Saudi Arabia +966' },
    { value: '+972', label: '🇮🇱 Israel +972' },{ value: '+351', label: '🇵🇹 Portugal +351' },{ value: '+30', label: '🇬🇷 Greece +30' },
    { value: '+358', label: '🇫🇮 Finland +358' },{ value: '+45', label: '🇩🇰 Denmark +45' },{ value: '+41', label: '🇨🇭 Switzerland +41' },
    { value: '+43', label: '🇦🇹 Austria +43' },{ value: '+90', label: '🇹🇷 Turkey +90' },{ value: '+234', label: '🇳🇬 Nigeria +234' },
    { value: '+254', label: '🇰🇪 Kenya +254' },{ value: '+233', label: '🇬🇭 Ghana +233' },{ value: '+27', label: '🇿🇦 South Africa +27' },
    { value: '+54', label: '🇦🇷 Argentina +54' },{ value: '+56', label: '🇨🇱 Chile +56' },{ value: '+57', label: '🇨🇴 Colombia +57' },
    { value: '+51', label: '🇵🇪 Peru +51' },{ value: '+506', label: '🇨🇷 Costa Rica +506' },{ value: '+507', label: '🇵🇦 Panama +507' },
    { value: '+20', label: '🇪🇬 Egypt +20' },{ value: '+212', label: '🇲🇦 Morocco +212' },{ value: '+216', label: '🇹🇳 Tunisia +216' },
    { value: '+595', label: '🇵🇾 Paraguay +595' },{ value: '+1', label: '🇧🇧 Barbados +1' },{ value: '+350', label: '🇬🇮 Gibraltar +350' },
    { value: '+354', label: '🇮🇸 Iceland +354' },{ value: '+374', label: '🇦🇲 Armenia +374' },{ value: '+973', label: '🇧🇭 Bahrain +973' },
    { value: '+880', label: '🇧🇩 Bangladesh +880' },{ value: '+855', label: '🇰🇭 Cambodia +855' },{ value: '+965', label: '🇰🇼 Kuwait +965' },
    { value: '+98', label: '🇮🇷 Iran +98' },{ value: '+92', label: '🇵🇰 Pakistan +92' },{ value: '+947', label: '🇱🇰 Sri Lanka +94' },
    { value: '+249', label: '🇸🇩 Sudan +249' },{ value: '+255', label: '🇹🇿 Tanzania +255' },{ value: '+260', label: '🇿🇲 Zambia +260' },
    { value: '+263', label: '🇿🇼 Zimbabwe +263' },{ value: '+974', label: '🇶🇦 Qatar +974' },{ value: '+968', label: '🇴🇲 Oman +968' },
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
    if (!emailRegex.test(String(email))) { setErrorMessage('Please enter a valid email address.'); return; }
    if (phone) {
      const digits = String(phone).replace(/\D/g, '');
      if (!/^\d+$/.test(digits)) { setErrorMessage('Phone number must contain digits only and be up to 12 digits.'); return; }
      if (digits.length > 12) { setErrorMessage('Phone number can contain at most 12 digits.'); return; }
    }
    setErrorMessage('');
    setIsSubmitting(true);
    setSubmitLogs(['[INFO] Preparing secure request package...']);
    setSubmitSuccess(false);
    try {
      const apiUrl = '/api/contact';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          countryCode,
          phone,
          company,
          budgetRange,
          brief,
          selectedServices,
          budget: budgetRange || budget.label,
        }),
      });

      let result: any = null;
      const text = await response.text();
      try {
        result = text ? JSON.parse(text) : {};
      } catch {
        result = { message: text || 'Invalid server response.' };
      }

      setSubmitLogs((p) => [...p, `[HTTP ${response.status}] ${JSON.stringify(result)}`]);

      if (!response.ok) {
        const errorText = result?.message || 'We couldn\'t submit your request. Please try again.';
        throw new Error(errorText);
      }

      const generatedRef = result?.reference || `ZNT-${Math.floor(100000 + Math.random() * 900000)}`;
      setTicketRef(generatedRef);
      setServerMessage(result?.message || 'Your request has been submitted successfully.');
      setSubmitLogs((p) => [...p, '[SUCCESS] Contact request submitted.']);
      setSubmitSuccess(true);
      setName('');
      setEmail('');
      setPhone('');
      setCompany('');
      setBrief('');
      setSelectedServices([]);
      setBudgetRange('1500-3000');
    } catch (err: any) {
      const message = err?.message || 'We couldn\'t submit your request. Please try again.';
      setErrorMessage(message);
      setSubmitLogs((p) => [...p, `[ERROR] ${message}`]);
      console.error('[Contact submit] error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative w-full pt-28 pb-20 bg-white" id="zentro-contact-view-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="text-left mb-16 max-w-4xl border-b border-slate-200 pb-10 flex flex-col gap-3">
          <span className="immersive-tag-mono">// SYSTEM REVIEW</span>
          <h1 className="text-4xl sm:text-5xl font-sans font-extrabold text-slate-900 tracking-tight mt-2">Book a Consultation</h1>
          <p className="text-slate-500 text-sm sm:text-base">Configure your desired parameters below to receive an approximate budget estimate.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 text-left relative overflow-hidden" id="project-calculator-block">
            <div className="flex items-center gap-2 text-violet-600 font-mono text-[10px] uppercase font-bold tracking-wider mb-4">
              <Sliders className="w-3.5 h-3.5" />
              <span>1. Config Project Parameters</span>
            </div>
            <div className="flex flex-col gap-3 mb-4" id="calculator-checkbox-list">
              <span className="text-xs font-mono text-slate-500 uppercase font-semibold">Select Services Needed</span>
              <div className="flex flex-col gap-2">
                {services.map((item) => {
                  const isChecked = selectedServices.includes(item.id);
                  return (
                    <button key={item.id} onClick={() => handleServiceToggle(item.id)}
                      className={`px-4 py-3 rounded-xl border text-xs text-left transition-all cursor-pointer flex items-center justify-between ${isChecked ? 'bg-violet-100 border-violet-300 text-slate-800 font-semibold' : 'bg-white border-slate-200 text-slate-500 hover:text-slate-700'}`}>
                      <span>{item.label}</span>
                      <div className={`w-4 h-4 rounded border flex items-center justify-center ${isChecked ? 'bg-violet-600 border-violet-600 text-white' : 'border-slate-300'}`}>
                        {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="bg-violet-50/50 border border-slate-200 p-4 rounded-2xl flex flex-col gap-2 mt-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500 uppercase">Suggested Market Budget</span>
                <span className="text-violet-600 font-bold">{selectedServices.length > 0 ? '50% off agency' : 'CHOOSE OPTIONS'}</span>
              </div>
              <div className="text-slate-900 text-2xl font-mono font-bold mt-1">{selectedServices.length > 0 ? budget.label : '$0.00'}</div>
              <p className="text-[10px] font-sans text-slate-400 leading-normal mt-1 border-t border-slate-200 pt-2">*Ballpark estimate.</p>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 text-left relative overflow-hidden" id="consultation-form-block">
            <div className="flex items-center gap-2 text-violet-600 font-mono text-[10px] uppercase font-bold tracking-wider mb-6">
              <Mail className="w-3.5 h-3.5" />
              <span>2. System Specification Brief</span>
            </div>
            {submitSuccess ? (
              <div className="bg-slate-50 border border-emerald-200 p-8 rounded-2xl text-center flex flex-col items-center gap-4 animate-fade-in" id="submission-success-card">
                <div className="w-12 h-12 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-600">
                  <CheckCircle2 className="w-6 h-6 animate-pulse" />
                </div>
                <h3 className="text-slate-900 text-lg font-sans font-bold mt-2">Consultation Booking Secure!</h3>
                <p className="text-slate-500 text-xs font-sans leading-relaxed max-w-md">{serverMessage || 'Your project specifications have been securely transmitted.'}</p>
                <div className="mt-4 flex flex-col items-center gap-3 w-full">
                  <button onClick={() => setSubmitSuccess(false)} className="px-5 py-2.5 bg-violet-100 w-full max-w-xs text-xs font-mono text-violet-700 font-semibold rounded-lg">Submit Another Request</button>
                  <div className="mt-2 text-xs text-slate-400">You will be redirected to the homepage shortly.</div>
                </div>
              </div>
            ) : isSubmitting ? (
              <div className="flex flex-col bg-white rounded-2xl border border-slate-200 shadow-inner overflow-hidden text-left h-80" id="submission-terminal-console">
                <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-slate-400 animate-spin" />
                    <span className="text-[10px] font-mono text-slate-500">secure-gateway-tx.log</span>
                  </div>
                </div>
                <div className="p-4 flex-grow font-mono text-[10px] text-slate-500 overflow-y-auto space-y-1.5 leading-normal">
                  {submitLogs.map((log, idx) => <div key={idx} className="text-slate-500">{log}</div>)}
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4" id="consultation-booking-form">
                {errorMessage ? <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{errorMessage}</div> : null}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono text-slate-500 uppercase font-bold">Your Name *</label>
                    <input type="text" placeholder="e.g. John Doe" required value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-violet-400" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono text-slate-500 uppercase font-bold">Email Address *</label>
                    <input type="email" placeholder="e.g. john@company.com" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-violet-400" />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-mono text-slate-500 uppercase font-bold">Company / Product</label>
                  <input type="text" placeholder="e.g. Acme Corp or Project X" value={company} onChange={(e) => setCompany(e.target.value)} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-violet-400" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono text-slate-500 uppercase font-bold">Country Code</label>
                    <select value={countryCode} onChange={(e) => setCountryCode(e.target.value)} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-900">
                      {countryOptions.map((opt) => (<option key={opt.value + opt.label} value={opt.value}>{opt.label}</option>))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono text-slate-500 uppercase font-bold">Phone Number</label>
                    <input type="tel" placeholder="e.g. 9876543210" value={phone} maxLength={12} onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))} inputMode="numeric" pattern="[0-9]*" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-violet-400" />
                    <span className="text-[10px] text-slate-400">Up to 12 digits only.</span>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-mono text-slate-500 uppercase font-bold">Select Budget Range *</label>
                  <select value={budgetRange} onChange={(e) => setBudgetRange(e.target.value)} required className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-900">
                    {budgetOptions.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-mono text-slate-500 uppercase font-bold">Describe Your System Objectives *</label>
                  <textarea required value={brief} onChange={(e) => setBrief(e.target.value)} className="w-full bg-white border border-slate-200 rounded-xl p-4 text-xs text-slate-900 h-32 placeholder-slate-400 focus:outline-none focus:border-violet-400" />
                </div>
                <button type="submit" className="w-full py-3.5 bg-violet-600 hover:bg-violet-500 rounded-full text-xs font-bold text-white flex items-center justify-center gap-2 mt-2 shadow-[0_4px_10px_rgba(124,58,237,0.2)]"><Send className="w-3.5 h-3.5 text-white" /> Submit Secure Request</button>
              </form>
            )}
          </div>
        </div>

        <section className="max-w-2xl mx-auto" id="direct-contact-grid">
          <div className="bg-white border border-slate-200 p-5 rounded-2xl text-left flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 md:gap-8">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-violet-50 border border-violet-200 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4 text-violet-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-slate-500 uppercase font-bold leading-none">Email</span>
                <span className="text-slate-900 text-xs font-sans font-bold mt-1.5 leading-tight">mrxtechnp@gmail.com</span>
              </div>
            </div>
            <div className="hidden sm:block w-px h-8 bg-slate-200" />
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-violet-50 border border-violet-200 flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4 text-fuchsia-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-slate-500 uppercase font-bold leading-none">🇳🇵 Nepal</span>
                <span className="text-slate-900 text-xs font-sans font-bold mt-1.5 leading-tight">+977 9807242842</span>
              </div>
            </div>
            <div className="hidden sm:block w-px h-8 bg-slate-200" />
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-violet-50 border border-violet-200 flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4 text-fuchsia-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-slate-500 uppercase font-bold leading-none">🇳🇵 Nepal</span>
                <span className="text-slate-900 text-xs font-sans font-bold mt-1.5 leading-tight">+977 981-4215561</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}