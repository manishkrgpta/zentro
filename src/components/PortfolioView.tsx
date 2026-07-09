/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { projectsData, testimonialsData, pricingPackagesData } from '../data';
import { Project } from '../types';

interface PortfolioViewProps {
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
}

export default function PortfolioView({ selectedProject, setSelectedProject }: PortfolioViewProps) {
  void selectedProject;
  void setSelectedProject;

  const workExamples = projectsData.slice(0, 4);
  const clientReviews = testimonialsData.slice(0, 3);
  const selectedPackages = pricingPackagesData.slice(0, 3);

  return (
    <div className="relative w-full pt-28 pb-20" id="zentro-portfolio-view-container">
      <div className="absolute top-1/4 left-1/4 w-[380px] h-[380px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[320px] h-[320px] bg-cyan-500/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16" id="portfolio-work-section">
          {workExamples.map((project) => (
            <article key={project.id} className="bg-slate-950/70 border border-slate-900 rounded-3xl p-6 transition hover:border-cyan-500/30">
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-400">{project.category}</span>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500">Verified</span>
              </div>
              <h2 className="text-white text-2xl font-semibold leading-snug">{project.title}</h2>
              <p className="text-slate-400 text-sm leading-relaxed mt-3">{project.description}</p>
              <div className="mt-5 grid grid-cols-2 gap-3 text-[11px] text-slate-500">
                <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-3">
                  <p className="font-semibold text-slate-200">Outcome</p>
                  <p className="mt-1">{project.metrics.value}</p>
                </div>
                <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-3">
                  <p className="font-semibold text-slate-200">Tech</p>
                  <p className="mt-1">{project.stack.slice(0, 3).join(', ')}</p>
                </div>
              </div>
              <div className="mt-5 text-slate-300 text-sm space-y-2">
                {project.details.results.slice(0, 2).map((result, idx) => (
                  <p key={idx} className="flex items-start gap-2">
                    <span className="text-cyan-400">•</span>
                    <span>{result}</span>
                  </p>
                ))}
              </div>
            </article>
          ))}
        </section>

        <section className="mb-16" id="portfolio-client-reviews">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">Client Feedback</span>
              <h2 className="text-3xl sm:text-4xl font-sans font-bold text-white tracking-tight mt-2">Verified Reviews from Trusted Partners</h2>
            </div>
            <p className="max-w-xl text-slate-400 text-sm leading-relaxed">
              High-impact partnerships across fintech, healthcare, and automation brands. Every project is backed by measurable outcomes and repeat engagements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {clientReviews.map((review) => (
              <div key={review.id} className="bg-slate-950/70 border border-slate-900 rounded-3xl p-6">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div>
                    <p className="text-sm font-semibold text-white">{review.name}</p>
                    <p className="text-[11px] text-slate-500">{review.role}, {review.company}</p>
                  </div>
                  <div className="bg-cyan-500/10 text-cyan-300 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.18em] font-semibold">
                    {review.rating}★</div>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{review.comment}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16" id="portfolio-service-pricing">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">Service Portfolio</span>
              <h2 className="text-3xl sm:text-4xl font-sans font-bold text-white tracking-tight mt-2">Services + Price in One Section</h2>
            </div>
            <p className="max-w-xl text-slate-400 text-sm leading-relaxed">
              A mixed portfolio view that pairs service scope, price transparency, and real package outcomes together in one clean section.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {selectedPackages.map((pkg) => (
              <div key={pkg.name} className="bg-[#040913]/80 border border-slate-900 rounded-3xl p-6 hover:border-cyan-500/30 transition">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-cyan-400">{pkg.name}</span>
                  <span className="text-sm font-semibold text-white">{pkg.price}</span>
                </div>
                <p className="text-slate-400 text-sm mt-1">{pkg.description}</p>
                <div className="mt-5 text-[11px] uppercase tracking-[0.2em] text-slate-500 font-semibold">Included scope</div>
                <ul className="mt-3 space-y-2 text-slate-300 text-sm">
                  {pkg.features.slice(0, 4).map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-cyan-400">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

// ==========================================
// 1. CRM SANDBOX COMPONENT
// ==========================================
function CrmSandbox() {
  const [emailText, setEmailText] = useState('Hey Zentro! We are looking to build a new HIPAA compliant healthcare SaaS for clinical data summaries. We have 14 operational clinics in NY. Let us schedule a chat.');
  const [risk, setRisk] = useState<string | null>(null);
  const [leadsCore, setLeadsCore] = useState(88);
  const [drafting, setDrafting] = useState(false);
  const [draftResult, setDraftResult] = useState('');

  const runLeadAudit = () => {
    // Basic local text checking logic to determine score
    const len = emailText.length;
    let score = Math.min(100, Math.max(30, Math.round(len * 0.4 + (emailText.includes('HIPAA') ? 25 : 0))));
    setLeadsCore(score);
    setRisk(score > 75 ? 'HIGH VALUE LEAD' : score > 50 ? 'MEDIUM INTEREST' : 'LOW CONTEXT');
  };

  const runDraftEmail = () => {
    setDrafting(true);
    setDraftResult('');
    setTimeout(() => {
      setDrafting(false);
      setDraftResult(`Subject: Re: Partnering with Zentro on HIPAA Healthcare SaaS

Hello, Thank you for reaching out!

We would be absolutely thrilled to assist with engineering your clinical data summarizer across your 14 NY clinics. Our team holds extensive experience deploying secure HIPAA-compliant architectures.

Let us coordinate a calendar schedule. Please view our contact schedule module or suggest availability.

Best Regards,
Aron Vance, Zentro AI Architect`);
    }, 1500);
  };

  return (
    <div className="w-full flex flex-col gap-4 text-left" id="crm-sandbox-module">
      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-mono text-slate-500 uppercase">Input Customer Email Payload</label>
        <textarea
          value={emailText}
          onChange={(e) => setEmailText(e.target.value)}
          className="w-full bg-slate-950 border border-slate-900 rounded-xl p-3 text-xs font-sans text-slate-300 focus:outline-none focus:border-cyan-500/40 h-24 resize-none leading-relaxed"
          id="crm-email-input"
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={runLeadAudit}
          className="px-4 py-2 bg-[#0d153a] border border-blue-500/30 text-xs font-mono font-bold text-cyan-400 rounded-lg hover:bg-blue-600 hover:text-white transition-all cursor-pointer"
          id="crm-audit-btn"
        >
          Evaluate Semantic Score
        </button>
        <button
          onClick={runDraftEmail}
          disabled={drafting}
          className="px-4 py-2 bg-blue-600 text-xs font-mono font-bold text-white rounded-lg hover:bg-cyan-500 transition-all cursor-pointer disabled:opacity-50"
          id="crm-draft-btn"
        >
          {drafting ? 'Synthesizing...' : 'Draft Smart Response'}
        </button>
      </div>

      {/* Output results */}
      <div className="grid grid-cols-2 gap-4 border-t border-slate-900 pt-3">
        <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-900 flex flex-col">
          <span className="text-[9px] font-mono text-slate-500 uppercase">Calculated Interest Rating</span>
          <span className="text-white text-base font-sans font-bold mt-1">{leadsCore} / 100</span>
          {risk && <span className="text-[9px] font-mono text-cyan-400 font-semibold mt-0.5">{risk}</span>}
        </div>
        <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-900 flex flex-col">
          <span className="text-[9px] font-mono text-slate-500 uppercase">Automated Classification</span>
          <span className="text-emerald-400 text-xs font-mono font-semibold mt-1">✓ Verified Corporate</span>
          <span className="text-[9px] text-slate-500 mt-0.5">Route: Clinical Pipeline</span>
        </div>
      </div>

      {draftResult && (
        <div className="bg-slate-950 border border-slate-900 p-3.5 rounded-xl text-[11px] font-mono text-slate-300 leading-relaxed overflow-y-auto h-36 max-h-36">
          <div className="text-cyan-400 font-semibold mb-1 uppercase tracking-wider text-[10px]">AI Auto-Draft Output</div>
          <pre className="whitespace-pre-wrap">{draftResult}</pre>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 2. CHAT BOT SANDBOX COMPONENT
// ==========================================
function ChatSandbox() {
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string }>>([
    { sender: 'bot', text: 'Hello! I am Zentro Customer Care Agent. Type questions about your order tracking, return requests, or current inventory.' }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || typing) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');
    setTyping(true);

    // Match keywords locally to simulate smart RAG lookup
    setTimeout(() => {
      setTyping(false);
      let reply = 'I processed your query with semantic index search. No record match found. Standard action: Queued for Human Support.';
      
      const query = userMsg.toLowerCase();
      if (query.includes('ship') || query.includes('track') || query.includes('order')) {
        reply = '✓ Vector search match: Order #ZN-48201 found. Shipment state: Out for Delivery in NY Node 4. Est Arrival: 2:30 PM.';
      } else if (query.includes('return') || query.includes('refund')) {
        reply = '✓ Return policy lookup: Returns accepted within 30 days. Click "Issue Return Invoice" in account to generate shipping QR code instantly.';
      } else if (query.includes('stock') || query.includes('inventory')) {
        reply = '✓ Stock Telemetry check: Truffle ingredients at 84% capacity. Savory bowl items fully operational. Delivery pipelines clear.';
      } else if (query.includes('hello') || query.includes('hi')) {
        reply = 'Hi there! I am connected directly to Zentro databases. I can retrieve order tracking logs or check stock levels in microseconds.';
      }

      setMessages(prev => [...prev, { sender: 'bot', text: reply }]);
    }, 1200);
  };

  return (
    <div className="w-full flex flex-col gap-4 text-left" id="chat-sandbox-module">
      {/* Dialogue area */}
      <div className="bg-slate-950 border border-slate-900 rounded-2xl p-4 h-64 overflow-y-auto space-y-3 flex flex-col justify-end" id="chat-scroller">
        <div className="space-y-3 overflow-y-auto max-h-full">
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col max-w-[85%] ${msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}
            >
              <div 
                className={`px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : 'bg-[#0d153a] border border-blue-500/10 text-slate-300 rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[8px] font-mono text-slate-600 mt-1 uppercase">
                {msg.sender === 'user' ? 'Client Buyer' : 'Zentro Bot'}
              </span>
            </div>
          ))}
          {typing && (
            <div className="flex items-center gap-1 bg-[#0d153a] px-3 py-2 rounded-xl text-[10px] font-mono text-slate-500 w-fit">
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce delay-100" />
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce delay-200" />
              <span>Querying vector store embeddings...</span>
            </div>
          )}
        </div>
      </div>

      {/* Input row */}
      <form onSubmit={sendMessage} className="flex gap-2" id="chat-input-form">
        <input
          type="text"
          placeholder="Ask Zentro Bot: 'track shipment #ZN-48201' or 'how to return items'..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow bg-slate-950 border border-slate-900 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/40"
          id="chat-user-input"
        />
        <button
          type="submit"
          className="px-4 bg-blue-600 hover:bg-cyan-500 text-white rounded-xl flex items-center justify-center cursor-pointer transition-all active:scale-95 shadow-md"
          id="chat-send-btn"
          aria-label="Send message"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}

// ==========================================
// 3. FINANCE SANDBOX COMPONENT
// ==========================================
function FinanceSandbox() {
  const [category, setCategory] = useState<'stocks' | 'crypto' | 'forex'>('stocks');
  const [portfolioValue, setPortfolioValue] = useState(240500);
  const [updating, setUpdating] = useState(false);
  
  // Simulated stock/crypto sparkline paths
  const stockPath = "M0,35 L20,30 L40,45 L60,20 L80,50 L100,15 L120,40 L140,25 L160,55 L180,10 L200,30 L220,18 L240,42 L260,20 L280,48 L300,8";
  const cryptoPath = "M0,50 L20,15 L40,55 L60,10 L80,60 L100,25 L120,58 L140,20 L160,65 L180,12 L200,55 L220,35 L240,52 L260,18 L280,62 L300,5";
  const forexPath = "M0,30 L20,32 L40,28 L60,33 L80,29 L100,31 L120,27 L140,32 L160,30 L180,28 L200,31 L220,29 L240,32 L260,30 L280,31 L300,29";

  const runSimulationAction = (type: 'buy' | 'sell') => {
    setUpdating(true);
    setTimeout(() => {
      setUpdating(false);
      setPortfolioValue(prev => {
        const factor = category === 'crypto' ? 2500 : category === 'stocks' ? 1200 : 350;
        const change = type === 'buy' ? factor : -factor;
        return prev + change;
      });
    }, 400);
  };

  return (
    <div className="w-full flex flex-col gap-4 text-left" id="finance-sandbox-module">
      
      {/* Assets switcher */}
      <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-900 w-fit" id="finance-category-switcher">
        {(['stocks', 'crypto', 'forex'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-mono uppercase font-bold transition-all cursor-pointer ${
              category === cat 
                ? 'bg-[#0d153a] text-cyan-400 border border-blue-500/20' 
                : 'text-slate-500 hover:text-slate-300'
            }`}
            id={`finance-switch-opt-${cat}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Graph Card */}
      <div className="bg-slate-950 border border-slate-900 rounded-2xl p-4 flex flex-col gap-4 relative overflow-hidden">
        
        {/* Absolute glow backing */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-2/3 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[9px] font-mono text-slate-500 uppercase leading-none">Simulated Portfolio Valuation</span>
            <span className="text-white text-2xl font-mono font-bold mt-1 shadow-sm">
              ${portfolioValue.toLocaleString()}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[9px] font-mono text-slate-500 uppercase leading-none">Volatility State</span>
            <span className={`text-[10px] font-mono font-bold mt-1 block uppercase ${
              category === 'crypto' ? 'text-amber-400' : category === 'stocks' ? 'text-emerald-400' : 'text-slate-300'
            }`}>
              ● {category === 'crypto' ? 'High Volatility' : category === 'stocks' ? 'Stable Yield' : 'Near-Flat'}
            </span>
          </div>
        </div>

        {/* SVG Sparkline Graph */}
        <div className="h-28 w-full border-b border-dashed border-slate-900 relative mt-2">
          {updating && (
            <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center text-[10px] font-mono text-cyan-400">
              <RefreshCw className="w-3.5 h-3.5 animate-spin mr-1.5" /> Re-calculating asset pricing matrices...
            </div>
          )}
          <svg className="w-full h-full stroke-cyan-400 fill-none overflow-visible" preserveAspectRatio="none" viewBox="0 0 300 70">
            <path 
              d={category === 'stocks' ? stockPath : category === 'crypto' ? cryptoPath : forexPath} 
              strokeWidth="2" 
              strokeDasharray="0" 
              className="transition-all duration-500"
              style={{ stroke: category === 'crypto' ? '#f59e0b' : category === 'stocks' ? '#10b981' : '#22d3ee' }}
            />
          </svg>
        </div>

      </div>

      {/* Transaction Control Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => runSimulationAction('buy')}
          className="px-4 py-2.5 bg-emerald-600/10 border border-emerald-500/30 rounded-xl text-xs font-mono font-bold text-emerald-400 hover:bg-emerald-600 hover:text-white transition-all cursor-pointer flex-grow text-center"
          id="finance-buy-btn"
        >
          Buy simulated Position
        </button>
        <button
          onClick={() => runSimulationAction('sell')}
          className="px-4 py-2.5 bg-red-600/10 border border-red-500/30 rounded-xl text-xs font-mono font-bold text-red-400 hover:bg-red-600 hover:text-white transition-all cursor-pointer flex-grow text-center"
          id="finance-sell-btn"
        >
          Sell simulated Position
        </button>
      </div>

    </div>
  );
}

// ==========================================
// 4. HEALTHCARE SANDBOX COMPONENT
// ==========================================
function HealthcareSandbox() {
  const [playing, setPlaying] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [diagnostics, setDiagnostics] = useState<string[]>([]);
  const [summarizing, setSummarizing] = useState(false);

  const runPlayback = () => {
    setPlaying(true);
    setTranscript('');
    setDiagnostics([]);
    
    const lines = [
      "Patient: Yes, doctor. I have been feeling a deep chest cough since Monday night.",
      "Doctor: Understood. Are you experiencing any chills or short breath?",
      "Patient: Slightly when climbing up stairs, but no high fever. Mostly just dry throat.",
      "Doctor: Okay, chest auscultation shows dry rales. Recommend standard throat swabs..."
    ];

    lines.forEach((line, i) => {
      setTimeout(() => {
        setTranscript(prev => prev + (prev ? '\n' : '') + line);
        if (i === lines.length - 1) {
          setPlaying(false);
        }
      }, i * 800);
    });
  };

  const runSummarize = () => {
    setSummarizing(true);
    setTimeout(() => {
      setSummarizing(false);
      setDiagnostics([
        "✓ DIAGNOSIS: Acute Bronchitis (J20.9)",
        "✓ TREATMENT: Expectorants, Warm Hydration, Rest 3 Days",
        "✓ CODE MAP: ICD-10 J20.9 (Non-specific Bronchitis)",
        "✓ COMPLIANCE: HIPAA Audit-Hash recorded on secure block logs"
      ]);
    }, 1500);
  };

  return (
    <div className="w-full flex flex-col gap-4 text-left" id="healthcare-sandbox-module">
      <div className="flex items-center gap-3">
        <button
          onClick={runPlayback}
          disabled={playing}
          className="px-4 py-2.5 bg-[#0d153a] border border-blue-500/30 text-xs font-mono font-bold text-cyan-400 rounded-lg hover:bg-blue-600 hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
          id="health-playback-btn"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          {playing ? 'Recording transcription Feed...' : 'Play Clinic recording'}
        </button>
        <button
          onClick={runSummarize}
          disabled={summarizing || !transcript}
          className="px-4 py-2.5 bg-blue-600 text-xs font-mono font-bold text-white rounded-lg hover:bg-cyan-500 transition-all cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
          id="health-summarize-btn"
        >
          <BarChart3 className="w-3.5 h-3.5" />
          {summarizing ? 'Structuring SOAP Outline...' : 'Auto-Summarize SOAP notes'}
        </button>
      </div>

      {/* Transcript text console */}
      <div className="flex flex-col gap-1">
        <span className="text-[9px] font-mono text-slate-500 uppercase">Live clinic Transcription feed</span>
        <div className="bg-slate-950 border border-slate-900 rounded-xl p-3 h-28 text-[11px] font-mono text-slate-300 leading-relaxed overflow-y-auto whitespace-pre-wrap">
          {transcript || <span className="text-slate-600 italic">No feed active. Click "Play Clinic recording" to record live transcripts.</span>}
        </div>
      </div>

      {/* Structured output diagnostics outline */}
      {diagnostics.length > 0 && (
        <div className="bg-slate-950 border border-slate-900 p-3.5 rounded-xl flex flex-col gap-1.5">
          <span className="text-cyan-400 font-mono text-[10px] uppercase font-semibold border-b border-slate-900 pb-1.5">
            Struct SOAP Diagnostic Chart
          </span>
          <div className="space-y-1.5 mt-1">
            {diagnostics.map((diag, i) => (
              <div key={i} className="text-[11px] font-mono text-slate-300 leading-snug">
                {diag}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 5. RESTAURANT SANDBOX COMPONENT
// ==========================================
function RestaurantSandbox() {
  const [basket, setBasket] = useState<Array<{ name: string; price: number }>>([]);
  const [congestion, setCongestion] = useState<'low' | 'high'>('low');

  // Pricing adjusts dynamically according to demand congestion (AI pricing)
  const items = [
    { name: 'Keto Avocado Bowl', price: congestion === 'high' ? 18.5 : 15.0 },
    { name: 'Truffle Parmesan Fries', price: congestion === 'high' ? 11.0 : 8.5 },
    { name: 'Wagyu Craft Smash Burger', price: congestion === 'high' ? 24.0 : 19.5 }
  ];

  const addToBasket = (item: { name: string; price: number }) => {
    setBasket(prev => [...prev, item]);
  };

  const clearBasket = () => {
    setBasket([]);
  };

  const total = basket.reduce((acc, curr) => acc + curr.price, 0);

  return (
    <div className="w-full flex flex-col gap-4 text-left" id="restaurant-sandbox-module">
      
      {/* Congestion controls */}
      <div className="flex items-center justify-between border-b border-slate-900 pb-3">
        <div className="flex flex-col">
          <span className="text-[9px] font-mono text-slate-500 uppercase leading-none">Kitchen Load Telemetry</span>
          <span className="text-white text-xs font-sans font-bold mt-0.5">Demand Pricing Adaptor</span>
        </div>
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-900" id="restaurant-congestion-toggle">
          <button
            onClick={() => setCongestion('low')}
            className={`px-3 py-1 rounded-lg text-[9px] font-mono uppercase font-bold transition-all cursor-pointer ${
              congestion === 'low' 
                ? 'bg-emerald-600/10 text-emerald-400 border border-emerald-500/20' 
                : 'text-slate-500'
            }`}
            id="congestion-low"
          >
            Low Traffic
          </button>
          <button
            onClick={() => setCongestion('high')}
            className={`px-3 py-1 rounded-lg text-[9px] font-mono uppercase font-bold transition-all cursor-pointer ${
              congestion === 'high' 
                ? 'bg-red-600/10 text-red-400 border border-red-500/20' 
                : 'text-slate-500'
            }`}
            id="congestion-high"
          >
            Peak Traffic (AI Boost)
          </button>
        </div>
      </div>

      {/* Menu Options Cards */}
      <div className="grid grid-cols-1 gap-2.5" id="restaurant-items-listing">
        {items.map((item, idx) => (
          <div key={idx} className="bg-slate-950 border border-slate-900 p-3 rounded-xl flex items-center justify-between text-xs font-sans">
            <div className="flex flex-col text-left">
              <span className="text-white font-bold">{item.name}</span>
              <span className="text-[10px] font-mono text-cyan-400 mt-0.5">${item.price.toFixed(2)}</span>
            </div>
            <button
              onClick={() => addToBasket(item)}
              className="px-3 py-1.5 bg-blue-600 text-white text-[10px] font-mono uppercase font-bold rounded-lg hover:bg-cyan-500 cursor-pointer transition-all active:scale-95"
              id={`add-food-btn-${idx}`}
            >
              Add to Basket
            </button>
          </div>
        ))}
      </div>

      {/* Basket Total Section */}
      <div className="bg-[#0a0f29]/50 border border-blue-500/10 p-3.5 rounded-2xl flex flex-col gap-2.5">
        <div className="flex items-center justify-between text-xs font-sans">
          <span className="text-slate-400 font-medium">Order Subtotal:</span>
          <span className="text-white font-mono font-bold">${total.toFixed(2)}</span>
        </div>
        
        {basket.length > 0 ? (
          <div className="flex flex-col gap-1.5 border-t border-slate-900/80 pt-2 text-[10px] font-mono text-slate-400 max-h-24 overflow-y-auto">
            {basket.map((b, i) => (
              <div key={i} className="flex justify-between">
                <span>· {b.name}</span>
                <span>${b.price.toFixed(2)}</span>
              </div>
            ))}
            <button
              onClick={clearBasket}
              className="text-red-400 text-[9px] hover:underline flex items-center gap-1 mt-1 cursor-pointer"
              id="clear-basket-btn"
            >
              <Trash2 className="w-3 h-3" /> Clear Order
            </button>
          </div>
        ) : (
          <div className="text-[10px] font-mono text-slate-500 italic">Your basket is empty. Add items to test dynamic pricing matrices.</div>
        )}
      </div>

    </div>
  );
}

// ==========================================
// 6. REAL ESTATE SANDBOX COMPONENT
// ==========================================
function RealestateSandbox() {
  const [size, setSize] = useState(1200);
  const [metro, setMetro] = useState(5); // distance in minutes
  const [bedrooms, setBedrooms] = useState(2);

  // Dynamic Valuation Equation
  const baseValue = 180000;
  const sizeValue = size * 185;
  const metroDeduction = Math.max(0, (15 - metro) * 4500);
  const bedroomValue = bedrooms * 22000;
  
  const estimatedValuation = baseValue + sizeValue + metroDeduction + bedroomValue;
  const monthlyRentalYield = Math.round(estimatedValuation * 0.0055);

  return (
    <div className="w-full flex flex-col gap-4 text-left" id="realestate-sandbox-module">
      <div className="flex flex-col gap-3.5">
        
        {/* Size Slider */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 font-bold">
            <span>1. Square Footage:</span>
            <span className="text-cyan-400">{size} sq ft</span>
          </div>
          <input
            type="range"
            min="500"
            max="3000"
            step="50"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="w-full accent-cyan-400 bg-slate-900 h-1.5 rounded-lg appearance-none cursor-pointer"
            id="size-range-input"
          />
        </div>

        {/* Metro Distance slider */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 font-bold">
            <span>2. Proximity to Metro Transit:</span>
            <span className="text-cyan-400">{metro} mins walk</span>
          </div>
          <input
            type="range"
            min="1"
            max="20"
            step="1"
            value={metro}
            onChange={(e) => setMetro(Number(e.target.value))}
            className="w-full accent-cyan-400 bg-slate-900 h-1.5 rounded-lg appearance-none cursor-pointer"
            id="metro-range-input"
          />
        </div>

        {/* Bedrooms count buttons */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-mono text-slate-400 font-bold">3. Bedrooms Layout:</span>
          <div className="flex items-center gap-2" id="bedroom-toggle-group">
            {[1, 2, 3, 4].map((num) => (
              <button
                key={num}
                onClick={() => setBedrooms(num)}
                className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  bedrooms === num 
                    ? 'bg-blue-600 text-white shadow-sm border border-blue-500/20' 
                    : 'bg-slate-950 border border-slate-900 text-slate-500 hover:text-slate-300'
                }`}
                id={`bedroom-btn-${num}`}
              >
                {num} BR
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Calculated outputs details */}
      <div className="grid grid-cols-2 gap-4 border-t border-slate-900 pt-4 mt-1">
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-900 flex flex-col text-left">
          <span className="text-[9px] font-mono text-slate-500 uppercase">Est. Asset Valuation</span>
          <span className="text-white text-base font-mono font-bold mt-1 shadow-sm text-cyan-400">
            ${estimatedValuation.toLocaleString()}
          </span>
          <span className="text-[8px] text-slate-500 mt-0.5 font-mono">Precision rate: +/- 3.4%</span>
        </div>
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-900 flex flex-col text-left">
          <span className="text-[9px] font-mono text-slate-500 uppercase">Est. Monthly Net Rental</span>
          <span className="text-white text-base font-mono font-bold mt-1 shadow-sm text-purple-400">
            ${monthlyRentalYield.toLocaleString()}/mo
          </span>
          <span className="text-[8px] text-slate-500 mt-0.5 font-mono">Gross yield: ~6.6%</span>
        </div>
      </div>
    </div>
  );
}
