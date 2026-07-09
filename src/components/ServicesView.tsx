/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Cpu, Globe, Layers, Smartphone, BarChart3, Network, CheckCircle2, ChevronRight, Terminal, 
  Zap, ArrowRight, Play, RefreshCw, Layers3, HardDrive, Bell, Sparkles, 
  Flame, DollarSign, Calculator, HelpCircle, Plus, Minus, Check, 
  Percent, FileText, Send, Mail, X 
} from 'lucide-react';
import { 
  servicesData, 
  servicesListToSelect 
} from '../data';

const sublistByServiceId: Record<string, Array<{
  name: string;
  price: string;
  marketPrice?: string;
  savings?: string;
  desc: string;
}>> = {
  'ai-automation': [
    {
      name: 'Custom AI Chatbot',
      price: '$399 + $39/mo',
      marketPrice: '$3,000+',
      savings: 'Save 87%',
      desc: '24/7 intelligent customer care bot featuring advanced intent extraction & vector database lookup.'
    },
    {
      name: 'AI Customer Support Agent',
      price: '$999 + $74/mo',
      marketPrice: '$6,500+',
      savings: 'Save 85%',
      desc: 'Omni-channel system reading tickets, rating client risk, and drafting empathetic replies.'
    },
    {
      name: 'AI Appointment Booking',
      price: '$499 + $99/mo',
      marketPrice: '$4,000+',
      savings: 'Save 88%',
      desc: 'Voice or Chat agent connected to Calendar to handle receptionist duties & schedule calls.'
    },
    {
      name: 'AI FAQ Bot',
      price: '$249 flat',
      marketPrice: '$1,500',
      savings: 'Save 83%',
      desc: 'Simple, highly focused semantic QA bot for websites and basic document processing.'
    },
    {
      name: 'AI Lead Qualification Bot',
      price: '$499 flat',
      marketPrice: '$3,500',
      savings: 'Save 86%',
      desc: 'Ingests chats, extracts leads, rates interest level, and populates CRM database fields.'
    }
  ],
  'custom-websites': [
    {
      name: 'Landing Page',
      price: '$249 flat',
      marketPrice: '$1,500+',
      savings: 'Save 83%',
      desc: 'Highly optimized 1-page digital showcase designed for maximum lead capture and high speed.'
    },
    {
      name: 'Business Website (5–8 Pages)',
      price: '$649 flat',
      marketPrice: '$4,000+',
      savings: 'Save 84%',
      desc: 'Complete digital presence with custom branding, subpages, dynamic blog, and contact forms.'
    },
    {
      name: 'Premium Business Website',
      price: '$1,499 flat',
      marketPrice: '$8,000+',
      savings: 'Save 81%',
      desc: 'Fully bespoke design with custom web assets, animations, and top-tier Google SEO rankings.'
    },
    {
      name: 'Website Redesign',
      price: '$599 flat',
      marketPrice: '$3,500+',
      savings: 'Save 83%',
      desc: 'Complete layout, performance optimization, and copywriting refresh for your existing platform.'
    },
    {
      name: 'Hosting & Technical Maintenance',
      price: '$49/mo',
      marketPrice: '$250/mo',
      savings: 'Save 80%',
      desc: '24/7 secure hosting, regular updates, continuous server monitoring, and speed tune-ups.'
    }
  ],
  'saas-development': [
    {
      name: 'SaaS MVP Development',
      price: 'Starting at $4,999',
      marketPrice: '$40,000+',
      savings: 'Save 88%',
      desc: 'Full multi-tenant structure, landing page, admin dashboard, and custom features built from scratch.'
    },
    {
      name: 'Secure Billing Integration',
      price: '$349 flat',
      marketPrice: '$2,000+',
      savings: 'Save 83%',
      desc: 'End-to-end Stripe integration, credit card vaulting, billing portals, and subscription schemes.'
    },
    {
      name: 'Database Partitioning & Design',
      price: '$649 flat',
      marketPrice: '$4,500+',
      savings: 'Save 86%',
      desc: 'Scalable PostgreSQL or MySQL architecture with granular role-based permissions.'
    },
    {
      name: 'Cloud Deployment & Dockerization',
      price: '$299 flat',
      marketPrice: '$2,000+',
      savings: 'Save 85%',
      desc: 'Seamless serverless deployment pipelines, staging environments, and active automated backups.'
    }
  ],
  'mobile-apps': [
    {
      name: 'Mobile App (Basic Launch)',
      price: 'Starting at $2,499',
      marketPrice: '$15,000+',
      savings: 'Save 83%',
      desc: 'Cross-platform iOS and Android MVP using React Native or Expo framework with standard features.'
    },
    {
      name: 'Biometric Auth & Secure Vaulting',
      price: '$249 flat',
      marketPrice: '$1,500+',
      savings: 'Save 83%',
      desc: 'Safe keychain encryption, FaceID/TouchID authorization gates, and secure JWT token storage.'
    },
    {
      name: 'Offline Synchronization Engine',
      price: '$499 flat',
      marketPrice: '$3,000+',
      savings: 'Save 83%',
      desc: 'Continuous local SQLite caching to allow perfect offline operations without internet.'
    },
    {
      name: 'Push Notification Hub',
      price: '$199 flat',
      marketPrice: '$1,200+',
      savings: 'Save 83%',
      desc: 'Custom trigger pipelines to re-engage active users via automated mobile system updates.'
    }
  ],
  'business-dashboards': [
    {
      name: 'Admin Control Dashboard',
      price: '$749 flat',
      marketPrice: '$5,000+',
      savings: 'Save 85%',
      desc: 'Beautiful admin layout to review sales, handle incoming orders, and monitor overall metrics.'
    },
    {
      name: 'Local SEO & Google Business Optimization',
      price: '$174/mo',
      marketPrice: '$1,000/mo',
      savings: 'Save 83%',
      desc: 'Local business directory optimization, keyword tracking, and positive review generation engines.'
    },
    {
      name: 'Google Analytics & Tag Setup',
      price: '$74 flat',
      marketPrice: '$500',
      savings: 'Save 85%',
      desc: 'Proper event tracking, conversion mapping, and custom funnel visualization layers.'
    },
    {
      name: 'Technical SEO Audit & Speed Boost',
      price: '$99 flat',
      marketPrice: '$800',
      savings: 'Save 88%',
      desc: 'In-depth speed audit, asset minification, and visual adjustments for 95+ PageSpeed scores.'
    }
  ],
  'api-development': [
    {
      name: 'CRM Integration (Salesforce/Hubspot)',
      price: '$349 flat',
      marketPrice: '$2,500+',
      savings: 'Save 86%',
      desc: 'Synchronizes client contact logs, active deals, and lead notes automatically across systems.'
    },
    {
      name: 'API Development & Webhooks',
      price: '$749 flat',
      marketPrice: '$5,000+',
      savings: 'Save 85%',
      desc: 'Secure REST/GraphQL backend routes with rate-limiting, CORS, and open API documentation.'
    },
    {
      name: 'Workflow & Email Automation',
      price: '$249 flat',
      marketPrice: '$1,500+',
      savings: 'Save 83%',
      desc: 'Automate customer drip sequences, PDF receipt generation, and automated slack alert triggers.'
    },
    {
      name: 'Active Security & Monitoring Suite',
      price: '$24/mo',
      marketPrice: '$150/mo',
      savings: 'Save 84%',
      desc: 'Real-time logging, security vulnerability patches, and zero-downtime SLA maintenance.'
    }
  ]
};

export default function ServicesView() {
  const [selectedService, setSelectedService] = useState('ai-automation');

  // Interactive Simulator State
  const [source, setSource] = useState('gmail');
  const [model, setModel] = useState('gemini-flash');
  const [storage, setStorage] = useState('pinecone');
  const [action, setAction] = useState('email');
  
  const [simulating, setSimulating] = useState(false);
  const [simProgress, setSimProgress] = useState(0);
  const [simLogs, setSimLogs] = useState<string[]>([]);

  // Immersive Estimator States
  const [selectedEstimatorServices, setSelectedEstimatorServices] = useState<string[]>(['AI Chatbots', 'Custom Websites']);
  const [estimatorContactEmail, setEstimatorContactEmail] = useState('');
  const [estimatorMessage, setEstimatorMessage] = useState('');
  const [estimatorSubmitted, setEstimatorSubmitted] = useState(false);

  // Categorized Cost Estimator State
  const [activeEstimatorCategory, setActiveEstimatorCategory] = useState<'platforms' | 'ai' | 'integrations' | 'support'>('platforms');

  const estimatorCategories = [
    { 
      id: 'platforms', 
      label: '🌐 Web & Apps', 
      items: ['Custom Websites', 'Web Applications', 'SaaS Development', 'Mobile App Development', 'E-commerce Development', 'Landing Pages', 'Website Redesign'] 
    },
    { 
      id: 'ai', 
      label: '🤖 AI Agents', 
      items: ['AI Agents & Automation', 'AI Chatbots', 'AI Voice Receptionist', 'AI Appointment Booking'] 
    },
    { 
      id: 'integrations', 
      label: '⚙️ Integrations', 
      items: ['CRM Integration', 'API Development', 'Dashboard Development', 'Workflow Automation', 'Email Automation'] 
    },
    { 
      id: 'support', 
      label: '📈 SEO & Support', 
      items: ['Local SEO', 'Google Business Optimization', 'Website Maintenance', 'Cloud Deployment', 'Technical Support', 'Analytics & Reporting'] 
    }
  ];

  // Helper mapping services to exact simulated pricing
  const getEstimatorServiceCost = (name: string): { zentro: number; market: number } => {
    switch (name) {
      case 'Landing Pages':
      case 'Landing Page':
        return { zentro: 249, market: 1650 };
      case 'Custom Websites':
      case 'Business Website (5–8 Pages)':
        return { zentro: 649, market: 4000 };
      case 'Premium Business Website':
        return { zentro: 1499, market: 7000 };
      case 'Website Redesign':
        return { zentro: 599, market: 3500 };
      case 'E-commerce Development':
      case 'E-commerce Website':
        return { zentro: 1249, market: 7750 };
      case 'AI Appointment Booking':
      case 'Booking/Appointment System':
        return { zentro: 199, market: 1250 };
      case 'AI Chatbots':
      case 'AI Chatbot':
        return { zentro: 399, market: 3000 };
      case 'AI Appointment Assistant':
        return { zentro: 499, market: 3750 };
      case 'AI Customer Support Agent':
        return { zentro: 999, market: 6250 };
      case 'CRM Integration':
        return { zentro: 349, market: 2500 };
      case 'Email Automation':
        return { zentro: 249, market: 1600 };
      case 'AI Lead Generation System':
        return { zentro: 499, market: 3250 };
      case 'Dashboard Development':
      case 'Admin Dashboard':
        return { zentro: 749, market: 6250 };
      case 'SaaS Development':
      case 'Web Applications':
      case 'SaaS MVP Development':
        return { zentro: 4999, market: 50000 };
      case 'Mobile App Development':
      case 'Mobile App (Basic)':
        return { zentro: 2499, market: 16500 };
      // Standalone Bots and Automations
      case 'AI FAQ Bot':
        return { zentro: 249, market: 1200 };
      case 'AI WhatsApp Automation':
        return { zentro: 349, market: 2200 };
      case 'AI Instagram DM Bot':
        return { zentro: 299, market: 1800 };
      case 'AI Facebook Messenger Bot':
        return { zentro: 299, market: 1800 };
      case 'AI Lead Qualification Bot':
        return { zentro: 499, market: 3000 };
      case 'AI CRM Automation':
        return { zentro: 649, market: 4500 };
      case 'AI Email Reply Agent':
        return { zentro: 399, market: 2500 };
      case 'AI Review Response System':
        return { zentro: 249, market: 1500 };
      case 'AI Proposal Generator':
        return { zentro: 349, market: 2200 };
      case 'AI Document Processing':
        return { zentro: 499, market: 3500 };
      // Marketing & Growth
      case 'Local SEO':
      case 'Local SEO Setup':
        return { zentro: 199, market: 1200 };
      case 'Google Ads Setup':
        return { zentro: 249, market: 1500 };
      case 'Meta Ads Setup':
        return { zentro: 249, market: 1500 };
      case 'Conversion Rate Optimization':
        return { zentro: 349, market: 2500 };
      case 'Speed Optimization':
        return { zentro: 124, market: 800 };
      case 'Technical SEO Audit':
        return { zentro: 99, market: 600 };
      case 'Google Analytics Setup':
        return { zentro: 74, market: 500 };
      case 'Google Business Optimization':
        return { zentro: 149, market: 900 };
      case 'Workflow Automation':
      case 'AI Agents & Automation':
        return { zentro: 749, market: 4500 };
      case 'Website Maintenance':
        return { zentro: 249, market: 1500 };
      case 'Cloud Deployment':
        return { zentro: 299, market: 2000 };
      case 'Technical Support':
        return { zentro: 199, market: 1200 };
      case 'Analytics & Reporting':
        return { zentro: 149, market: 1000 };
      case 'AI Voice Receptionist':
        return { zentro: 499, market: 3500 };
      case 'API Development':
        return { zentro: 749, market: 5000 };
      default:
        return { zentro: 249, market: 1500 };
    }
  };

  // Calculate dynamic metrics based on user selections
  const accuracy = 
    (model === 'gemini-pro' ? 99.4 : model === 'gemini-flash' ? 97.2 : 94.6) + 
    (storage === 'pinecone' ? 0.4 : storage === 'pgvector' ? 0.2 : -1.5);
    
  const latency = 
    (model === 'gemini-flash' ? 180 : model === 'gemini-pro' ? 450 : 220) + 
    (storage === 'pinecone' ? 25 : storage === 'pgvector' ? 40 : 10);

  const savings = 
    (source === 'zendesk' ? 2400 : source === 'gmail' ? 1800 : source === 'pdfs' ? 1200 : 900) * 
    (model === 'gemini-pro' ? 1.25 : 1.0);

  const hoursSaved = Math.round(savings / 45);

  const runSimulation = () => {
    if (simulating) return;
    setSimulating(true);
    setSimProgress(0);
    setSimLogs([]);

    const steps = [
      { t: 0, msg: `[SYS] Initializing automation pipeline: Inbound ${source.toUpperCase()} parser initialized...` },
      { t: 15, msg: `[DATA] Polling input source. Ingested raw document streams (14.2kb payloads)...` },
      { t: 30, msg: `[VEC] Vectorizing payload chunks using text-embedding-004...` },
      { t: 45, msg: `[DB] Querying ${storage.toUpperCase()} vector index for nearest semantic neighbor records...` },
      { t: 60, msg: `[AI] Forwarding prompt context to ${model === 'gemini-pro' ? 'Gemini 1.5 Pro' : model === 'gemini-flash' ? 'Gemini 2.5 Flash' : 'Llama-3-70B'}...` },
      { t: 80, msg: `[AI] Model inference completed. Extracted intent, generated response parameters.` },
      { t: 90, msg: `[ACT] Triggering downstream action action: Generating outgoing ${action.toUpperCase()} workflow webhook...` },
      { t: 100, msg: `[SUCCESS] Pipeline cycle complete. Accuracy check passed (${accuracy.toFixed(1)}%). Latency: ${latency}ms.` }
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setSimLogs(prev => [...prev, step.msg]);
        setSimProgress(step.t);
        if (idx === steps.length - 1) {
          setSimulating(false);
        }
      }, idx * 600);
    });
  };

  const getServiceIcon = (name: string) => {
    switch (name) {
      case 'Cpu': return <Cpu className="w-5 h-5 text-cyan-400" />;
      case 'Globe': return <Globe className="w-5 h-5 text-blue-400" />;
      case 'Layers': return <Layers className="w-5 h-5 text-purple-400" />;
      case 'Smartphone': return <Smartphone className="w-5 h-5 text-pink-400" />;
      case 'BarChart3': return <BarChart3 className="w-5 h-5 text-cyan-400" />;
      case 'Network': return <Network className="w-5 h-5 text-blue-400" />;
      default: return <Cpu className="w-5 h-5 text-indigo-400" />;
    }
  };

  return (
    <div className="relative w-full pt-28 pb-20" id="zentro-services-view-container">
      {/* Background glow filters */}
      <div className="absolute top-1/4 right-0 w-[450px] h-[450px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none animate-pulse duration-[8s]" />
      <div className="absolute bottom-1/4 left-0 w-[350px] h-[350px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none animate-pulse duration-[6s]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Page title header */}
        <div className="text-left mb-16 max-w-4xl border-b border-slate-900 pb-10 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-cyan-400 tracking-widest font-semibold uppercase bg-cyan-950/40 border border-cyan-500/20 px-3 py-1 rounded-full">
              Zentro Offerings
            </span>
            <span className="text-[10px] font-mono text-slate-500">Service Version 1.4</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-sans font-bold text-white tracking-tight mt-1">
            Engineered Capabilities
          </h1>
          <p className="text-slate-400 text-sm sm:text-base font-sans leading-relaxed mt-2 max-w-3xl">
            We operate at the convergence of advanced generative cognitive architectures and high-density full-stack engineering. Explore our modular service suites, and test-drive custom agents in our interactive sandbox below.
          </p>
        </div>

        {/* 1. INTERACTIVE WORKFLOW PLAYGROUND SANDBOX */}
        <section className="mb-24" id="ai-workflow-simulator-section">
          <div className="bg-gradient-to-b from-slate-950 to-[#040613] border border-blue-500/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden text-left">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none" />
            
            {/* Play section Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-900 pb-6 mb-8">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase font-semibold tracking-wider">Playground Sandbox</span>
                <h2 className="text-xl sm:text-2xl font-sans font-bold text-white mt-1">
                  Custom AI Agentic Workflow Builder
                </h2>
                <p className="text-xs text-slate-400 font-sans mt-1 leading-relaxed">
                  Design a custom system below to calculate exact simulated performance rates, database latencies, and operational savings.
                </p>
              </div>
              
              <button
                onClick={runSimulation}
                disabled={simulating}
                className="px-6 py-3 bg-blue-600 hover:bg-cyan-500 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-white transition-all shadow-[0_4px_15px_rgba(37,99,235,0.25)] hover:shadow-[0_4px_20px_rgba(34,211,238,0.4)] cursor-pointer disabled:bg-slate-900 disabled:border disabled:border-slate-800 disabled:text-slate-500 disabled:shadow-none flex items-center gap-2"
                id="simulator-run-button"
              >
                {simulating ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    Simulating...
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    Run Live Simulation
                  </>
                )}
              </button>
            </div>

            {/* Config controls Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Config Selector blocks */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5" id="simulator-controls">
                
                {/* 1. Input Sources */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider flex items-center gap-1.5 font-bold">
                    <Layers3 className="w-3.5 h-3.5 text-blue-400" />
                    1. Data Input Ingestion
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'gmail', label: 'Gmail Streams' },
                      { id: 'zendesk', label: 'Zendesk Tickets' },
                      { id: 'pdfs', label: 'Parsed PDFs' },
                      { id: 'web', label: 'Web Scraping' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => !simulating && setSource(opt.id)}
                        className={`px-3 py-2.5 rounded-xl border text-xs text-left transition-all ${
                          source === opt.id 
                            ? 'bg-blue-600/10 border-blue-500/40 text-white font-semibold' 
                            : 'bg-slate-950/80 border-slate-900 text-slate-400 hover:text-slate-300'
                        }`}
                        id={`input-source-opt-${opt.id}`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Processing Core Model */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider flex items-center gap-1.5 font-bold">
                    <Cpu className="w-3.5 h-3.5 text-purple-400" />
                    2. Cognitive AI Core
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'gemini-flash', label: 'Gemini 2.5 Flash' },
                      { id: 'gemini-pro', label: 'Gemini 1.5 Pro' },
                      { id: 'llama', label: 'Llama 3 (70B)' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => !simulating && setModel(opt.id)}
                        className={`px-3 py-2.5 rounded-xl border text-xs text-left transition-all ${
                          model === opt.id 
                            ? 'bg-purple-600/10 border-purple-500/40 text-white font-semibold' 
                            : 'bg-slate-950/80 border-slate-900 text-slate-400 hover:text-slate-300'
                        }`}
                        id={`model-opt-${opt.id}`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Storage / Index Memory */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider flex items-center gap-1.5 font-bold">
                    <HardDrive className="w-3.5 h-3.5 text-cyan-400" />
                    3. Vector Store Memory
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'pinecone', label: 'Pinecone Global' },
                      { id: 'pgvector', label: 'Postgres PGVector' },
                      { id: 'inmemory', label: 'Transient Cache' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => !simulating && setStorage(opt.id)}
                        className={`px-3 py-2.5 rounded-xl border text-xs text-left transition-all ${
                          storage === opt.id 
                            ? 'bg-cyan-600/10 border-cyan-500/40 text-white font-semibold' 
                            : 'bg-slate-950/80 border-slate-900 text-slate-400 hover:text-slate-300'
                        }`}
                        id={`storage-opt-${opt.id}`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Downstream Actions */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider flex items-center gap-1.5 font-bold">
                    <Bell className="w-3.5 h-3.5 text-pink-400" />
                    4. Downstream Action
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'email', label: 'Draft Email Reply' },
                      { id: 'slack', label: 'Trigger Slack Bot' },
                      { id: 'webhook', label: 'Post Webhook Payload' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => !simulating && setAction(opt.id)}
                        className={`px-3 py-2.5 rounded-xl border text-xs text-left transition-all ${
                          action === opt.id 
                            ? 'bg-pink-600/10 border-pink-500/40 text-white font-semibold' 
                            : 'bg-slate-950/80 border-slate-900 text-slate-400 hover:text-slate-300'
                        }`}
                        id={`action-opt-${opt.id}`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column: Calculated Stats & Terminal Logs */}
              <div className="lg:col-span-5 flex flex-col gap-5">
                
                {/* Dynamically calculated output telemetry */}
                <div className="grid grid-cols-2 gap-4 bg-[#0a0f29]/40 border border-slate-900 p-4 rounded-2xl" id="simulator-metrics">
                  <div className="flex flex-col gap-0.5 text-left">
                    <span className="text-[9px] font-mono text-slate-500 uppercase font-semibold">Inference Accuracy</span>
                    <span className="text-white font-sans text-xl font-bold text-emerald-400">{accuracy.toFixed(1)}%</span>
                  </div>
                  <div className="flex flex-col gap-0.5 text-left">
                    <span className="text-[9px] font-mono text-slate-500 uppercase font-semibold">Ingestion Latency</span>
                    <span className="text-white font-sans text-xl font-bold text-cyan-400">{latency}ms</span>
                  </div>
                  <div className="flex flex-col gap-0.5 text-left border-t border-slate-900 pt-3">
                    <span className="text-[9px] font-mono text-slate-500 uppercase font-semibold">Monthly Savings</span>
                    <span className="text-white font-sans text-xl font-bold text-white">${savings.toLocaleString()}/mo</span>
                  </div>
                  <div className="flex flex-col gap-0.5 text-left border-t border-slate-900 pt-3">
                    <span className="text-[9px] font-mono text-slate-500 uppercase font-semibold">Human Time Saved</span>
                    <span className="text-white font-sans text-xl font-bold text-purple-400">{hoursSaved} hrs/wk</span>
                  </div>
                </div>

                {/* Developer Terminal Logs */}
                <div className="flex flex-col bg-slate-950 rounded-xl border border-slate-900 shadow-inner overflow-hidden text-left" id="simulator-terminal">
                  {/* Top Bar */}
                  <div className="bg-slate-900/60 px-4 py-2 border-b border-slate-900 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-slate-500" />
                      <span className="text-[10px] font-mono text-slate-400">zentro-agent-pipeline.log</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-red-500/40" />
                      <span className="w-2 h-2 rounded-full bg-amber-500/40" />
                      <span className="w-2 h-2 rounded-full bg-emerald-500/40" />
                    </div>
                  </div>
                  {/* Terminal Log Output space */}
                  <div className="p-4 h-44 font-mono text-[10px] text-slate-400 overflow-y-auto space-y-1.5 leading-normal">
                    {simLogs.length === 0 ? (
                      <div className="text-slate-600 italic">Console idle. Choose configurations and click "Run Live Simulation" to observe operations log.</div>
                    ) : (
                      simLogs.map((log, idx) => {
                        let color = 'text-slate-400';
                        if (log.includes('[SYS]')) color = 'text-blue-400';
                        if (log.includes('[SUCCESS]')) color = 'text-emerald-400';
                        if (log.includes('[DATA]')) color = 'text-amber-400';
                        if (log.includes('[AI]')) color = 'text-purple-400';
                        if (log.includes('[VEC]')) color = 'text-cyan-400';
                        return (
                          <div key={idx} className={color}>
                            {log}
                          </div>
                        );
                      })
                    )}
                  </div>
                  {/* Progress sliding track */}
                  {simulating && (
                    <div className="w-full h-1 bg-slate-900 relative">
                      <div 
                        className="absolute h-full left-0 bg-cyan-400 transition-all duration-300 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                        style={{ width: `${simProgress}%` }}
                      />
                    </div>
                  )}
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* 2. THE SIX DETAILED SERVICE PORTFOLIO */}
        <section className="mb-20" id="detailed-services-listing">
          {/* Service Left Nav and Right content layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left sidebar nav anchors */}
            <div className="lg:col-span-4 flex flex-col gap-2.5 border-r border-slate-900/60 lg:pr-6" id="services-sidebar-navigation">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold mb-2 text-left">
                Capability Directory
              </span>
              {servicesData.map((service) => {
                const isActive = selectedService === service.id;
                return (
                  <button
                    key={service.id}
                    onClick={() => setSelectedService(service.id)}
                    className={`w-full text-left px-4 py-3.5 rounded-xl border transition-all flex items-center justify-between group cursor-pointer ${
                      isActive 
                        ? 'bg-blue-600/10 border-blue-500/40 text-white font-semibold' 
                        : 'bg-slate-950/60 border-slate-900 text-slate-400 hover:text-slate-200'
                    }`}
                    id={`sidebar-service-${service.id}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center ${isActive ? 'text-cyan-400 border border-cyan-500/20' : 'text-slate-500'}`}>
                        {getServiceIcon(service.iconName)}
                      </div>
                      <span className="text-xs sm:text-sm font-sans">{service.title}</span>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'translate-x-1 text-cyan-400' : 'text-slate-600 group-hover:text-slate-400'}`} />
                  </button>
                );
              })}
            </div>

            {/* Right sidebar details content container */}
            <div className="lg:col-span-8 bg-slate-950/50 border border-slate-900 p-8 rounded-3xl text-left" id="service-details-pane">
              {servicesData.map((service) => {
                if (service.id !== selectedService) return null;
                return (
                  <div key={service.id} className="animate-fade-in flex flex-col gap-6" id={`service-detail-${service.id}`}>
                    
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-900 pb-5">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-900 flex items-center justify-center shadow-lg">
                          {getServiceIcon(service.iconName)}
                        </div>
                        <div>
                          <h3 className="text-white text-xl sm:text-2xl font-sans font-bold">
                            {service.title}
                          </h3>
                          <span className="text-[10px] font-mono text-cyan-400 uppercase mt-0.5 block tracking-wider">
                            Specialized Capability
                          </span>
                        </div>
                      </div>
                      {/* Metric Tag */}
                      <div className="px-4 py-2 bg-[#0d153a]/80 border border-blue-500/20 rounded-xl text-right">
                        <div className="text-[9px] font-mono text-slate-500 uppercase leading-none">{service.metrics.label}</div>
                        <div className="text-cyan-400 font-mono text-lg font-bold mt-0.5">{service.metrics.value}</div>
                      </div>
                    </div>

                    {/* Long Description text */}
                    <p className="text-slate-300 font-sans text-sm sm:text-base leading-relaxed">
                      {service.longDesc}
                    </p>

                    {/* Features checklist */}
                    <div className="flex flex-col gap-3">
                      <h4 className="text-xs font-mono text-slate-400 uppercase font-semibold border-b border-slate-900 pb-2">
                        Deliverable Functions
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {service.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 font-sans leading-snug">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Sublist of specific offerings and pricing */}
                    {sublistByServiceId[service.id] && (
                      <div className="flex flex-col gap-4 border-t border-slate-900/80 pt-5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-900 pb-2">
                          <h4 className="text-xs font-mono text-slate-400 uppercase font-semibold">
                            Specific Offerings & Flat Rates
                          </h4>
                          <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-2.5 py-0.5 rounded-md">
                            Flexible Custom Scopes Available
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5" id={`service-sublist-${service.id}`}>
                          {sublistByServiceId[service.id].map((sub, sIdx) => (
                            <div 
                              key={sIdx} 
                              className="bg-[#050816]/60 border border-slate-900 hover:border-blue-500/20 rounded-2xl p-4 flex flex-col justify-between gap-3 transition-all group"
                              id={`sub-service-${service.id}-${sIdx}`}
                            >
                              <div className="flex flex-col gap-1.5 text-left">
                                <span className="text-white text-xs font-sans font-bold group-hover:text-cyan-300 transition-colors">
                                  {sub.name}
                                </span>
                                <p className="text-slate-400 text-[11px] font-sans leading-normal">
                                  {sub.desc}
                                </p>
                              </div>
                              
                              <div className="flex items-center justify-between pt-2 border-t border-slate-900/40">
                                <span className="text-cyan-400 font-mono text-xs font-bold bg-cyan-950/20 px-2.5 py-1 rounded-lg border border-cyan-500/10">
                                  {sub.price}
                                </span>
                                {sub.marketPrice && (
                                  <div className="flex items-center gap-1.5 text-[10px] font-mono">
                                    <span className="text-slate-500 line-through">{sub.marketPrice}</span>
                                    {sub.savings && (
                                      <span className="text-emerald-400 font-bold px-1.5 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded">
                                        {sub.savings}
                                      </span>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Technology Stack tags */}
                    <div className="flex flex-col gap-3 border-t border-slate-900/80 pt-5">
                      <h4 className="text-xs font-mono text-slate-400 uppercase font-semibold">
                        Underlying Tech-Stack
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {service.techStack.map((tech, idx) => (
                          <span 
                            key={idx}
                            className="bg-slate-950 border border-slate-900 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* 4. TACTILE PROJECT ESTIMATOR SANDBOX */}
        <section className="mt-28" id="tactile-project-cost-estimator">
          <div className="bg-gradient-to-b from-slate-950 to-[#040613] border border-cyan-500/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden text-left">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[80px] pointer-events-none" />
            
            {/* Header */}
            <div className="border-b border-slate-900 pb-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase font-semibold tracking-wider flex items-center gap-1.5">
                  <Calculator className="w-3.5 h-3.5" />
                  Cost Sandbox Builder
                </span>
                <h2 className="text-xl sm:text-2xl font-sans font-bold text-white mt-1">
                  Estimate Your Custom Zentro Build
                </h2>
                <p className="text-xs text-slate-400 font-sans mt-1 leading-relaxed">
                  Toggle the specific solutions you would like to add to your website. We calculate live estimates and compare them with standard agency rates.
                </p>
              </div>

              {/* Reset button */}
              <button
                onClick={() => setSelectedEstimatorServices([])}
                className="px-4 py-2 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-all cursor-pointer"
                id="reset-estimator-btn"
              >
                Clear Selection
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Side: Dynamic Selectable Checkbox Grid */}
              <div className="lg:col-span-7 flex flex-col gap-5">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-bold">
                    Select Services to Include:
                  </span>
                  <p className="text-[11px] text-slate-500 font-sans">
                    Browse services by category to build your custom estimate easily.
                  </p>
                </div>

                {/* Highly structured categorical tabs for simple presentation */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 border-b border-slate-900 pb-4" id="estimator-category-pill-selector">
                  {estimatorCategories.map((cat) => {
                    const selectedInCatCount = selectedEstimatorServices.filter(s => cat.items.includes(s)).length;
                    const isActive = activeEstimatorCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setActiveEstimatorCategory(cat.id as any)}
                        className={`py-2 px-1 rounded-xl border text-[11px] font-sans font-medium text-center transition-all relative flex flex-col items-center justify-center gap-0.5 cursor-pointer ${
                          isActive 
                            ? 'bg-blue-600/10 border-blue-500/30 text-white shadow-sm' 
                            : 'bg-slate-950/40 border-slate-900 text-slate-400 hover:text-slate-300 hover:border-slate-800'
                        }`}
                        id={`estimator-cat-tab-${cat.id}`}
                      >
                        <span>{cat.label}</span>
                        {selectedInCatCount > 0 && (
                          <span className="px-1.5 py-0.5 rounded-full bg-cyan-500 text-[#050816] text-[9px] font-mono font-bold leading-none animate-fade-in">
                            {selectedInCatCount} selected
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Filtered Short Service Options List */}
                {(() => {
                  const currentCategory = estimatorCategories.find(c => c.id === activeEstimatorCategory);
                  const itemsToShow = currentCategory ? currentCategory.items : [];
                  return (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" id="estimator-service-options-grid">
                      {itemsToShow.map((serv, idx) => {
                        const isSelected = selectedEstimatorServices.includes(serv);
                        const costs = getEstimatorServiceCost(serv);
                        return (
                          <button
                            key={idx}
                            onClick={() => {
                              if (isSelected) {
                                setSelectedEstimatorServices(prev => prev.filter(x => x !== serv));
                              } else {
                                setSelectedEstimatorServices(prev => [...prev, serv]);
                              }
                            }}
                            className={`px-4 py-3 rounded-2xl border text-xs text-left transition-all flex items-center justify-between group cursor-pointer ${
                              isSelected 
                                ? 'bg-blue-600/15 border-blue-500/50 text-white shadow-sm' 
                                : 'bg-slate-950/80 border-slate-900 text-slate-400 hover:text-slate-300 hover:border-slate-800'
                            }`}
                            id={`estimator-opt-${activeEstimatorCategory}-${idx}`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                                isSelected 
                                  ? 'bg-cyan-500 border-cyan-400 text-[#050816]' 
                                  : 'border-slate-800 text-transparent group-hover:border-slate-700'
                              }`}>
                                <Check className="w-3.5 h-3.5 stroke-[3px]" />
                              </div>
                              <span className="font-sans font-medium">{serv}</span>
                            </div>
                            <span className="text-[10px] font-mono text-slate-500 group-hover:text-cyan-400 font-bold transition-colors">
                              +${costs.zentro}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>

              {/* Right Side: Totalizer and Custom Quote Request form */}
              <div className="lg:col-span-5 flex flex-col gap-5">
                
                {/* Dynamically calculated costs panel */}
                {(() => {
                  let totalZentro = 0;
                  let totalMarket = 0;
                  selectedEstimatorServices.forEach(s => {
                    const costObj = getEstimatorServiceCost(s);
                    totalZentro += costObj.zentro;
                    totalMarket += costObj.market;
                  });

                  // Add minor base configuration if items selected
                  if (totalZentro > 0) {
                    totalZentro += 100; // Base server config
                    totalMarket += 500; // Traditional agency base config
                  }

                  const savingsAmount = totalMarket - totalZentro;
                  const savingsPct = totalMarket > 0 ? Math.round((savingsAmount / totalMarket) * 100) : 0;

                  return (
                    <div className="flex flex-col gap-5 bg-[#0a0f29]/40 border border-slate-900 p-6 rounded-2xl relative animate-fade-in" id="estimator-totalizer-card">
                      <span className="text-[9px] font-mono text-slate-500 uppercase font-bold tracking-wider block border-b border-slate-900 pb-2">
                        Calculated Project Proposal Estimate
                      </span>

                      {selectedEstimatorServices.length === 0 ? (
                        <div className="py-8 text-center text-slate-600 text-xs font-mono italic">
                          Choose from our solutions on the left to build a dynamic proposal estimate.
                        </div>
                      ) : (
                        <>
                          {/* Active Selected Services Tag List */}
                          <div className="flex flex-col gap-1.5">
                            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider font-semibold text-left">
                              Selected Offerings ({selectedEstimatorServices.length})
                            </span>
                            <div className="flex flex-wrap gap-1.5 max-h-[110px] overflow-y-auto pr-1 font-sans" id="estimator-selected-tags-container">
                              {selectedEstimatorServices.map((serv, sIdx) => (
                                <span 
                                  key={sIdx}
                                  className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400 rounded-md text-[10px] text-slate-300 font-sans transition-all cursor-pointer group"
                                  onClick={() => setSelectedEstimatorServices(prev => prev.filter(x => x !== serv))}
                                  title="Click to remove"
                                  id={`estimator-selected-tag-${sIdx}`}
                                >
                                  {serv}
                                  <X className="w-2.5 h-2.5 text-slate-500 group-hover:text-red-400 transition-colors" />
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 border-t border-slate-900/60 pt-3">
                            <div className="flex flex-col gap-0.5 text-left">
                              <span className="text-[9px] font-mono text-slate-500 uppercase font-semibold">Average Agency Price</span>
                              <span className="text-slate-400 font-sans text-xl font-bold line-through">${totalMarket.toLocaleString()}</span>
                            </div>
                            <div className="flex flex-col gap-0.5 text-left border-l border-slate-900 pl-4">
                              <span className="text-[9px] font-mono text-slate-500 uppercase font-semibold flex items-center gap-1">
                                <Sparkles className="w-3 h-3 text-cyan-400" />
                                Zentro Price
                              </span>
                              <span className="text-white font-sans text-2xl font-black text-cyan-400">${totalZentro.toLocaleString()}</span>
                            </div>
                          </div>

                          {/* Savings Highlight */}
                          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 flex items-center justify-between text-left">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-xs font-mono">
                                %
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[9px] font-mono text-slate-500 uppercase leading-none">Net Client Savings</span>
                                <span className="text-emerald-400 font-sans font-bold text-sm mt-0.5">${savingsAmount.toLocaleString()} Saved</span>
                              </div>
                            </div>
                            <span className="px-2.5 py-1 bg-emerald-500 text-[#050816] font-mono font-bold rounded-lg text-xs">
                              {savingsPct}% Less
                            </span>
                          </div>

                          {/* Submit custom quote form */}
                          {!estimatorSubmitted ? (
                            <form 
                              onSubmit={(e) => {
                                e.preventDefault();
                                if (!estimatorContactEmail) return;
                                setEstimatorSubmitted(true);
                              }}
                              className="flex flex-col gap-3.5 border-t border-slate-900 pt-5 mt-2"
                              id="estimator-quote-form"
                            >
                              <div className="flex flex-col gap-1.5 text-left">
                                <label className="text-[9px] font-mono text-slate-500 uppercase tracking-wider font-bold flex items-center gap-1">
                                  <Mail className="w-3 h-3 text-cyan-400" />
                                  Secure Callback Email
                                </label>
                                <input
                                  type="email"
                                  required
                                  id="estimator-contact-email"
                                  value={estimatorContactEmail}
                                  onChange={(e) => setEstimatorContactEmail(e.target.value)}
                                  placeholder="you@company.com"
                                  className="w-full bg-slate-950/80 border border-slate-900 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/30 font-sans"
                                />
                              </div>

                              <div className="flex flex-col gap-1.5 text-left">
                                <label className="text-[9px] font-mono text-slate-500 uppercase tracking-wider font-bold flex items-center gap-1">
                                  <FileText className="w-3 h-3 text-purple-400" />
                                  Project Parameters (Optional)
                                </label>
                                <textarea
                                  value={estimatorMessage}
                                  onChange={(e) => setEstimatorMessage(e.target.value)}
                                  placeholder="Tell us about database scales, user sizes, or integrations..."
                                  rows={2}
                                  className="w-full bg-slate-950/80 border border-slate-900 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/30 font-sans resize-none"
                                />
                              </div>

                              <button
                                type="submit"
                                className="w-full py-3 bg-blue-600 hover:bg-cyan-500 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-white transition-all shadow-[0_4px_15px_rgba(37,99,235,0.25)] hover:shadow-[0_4px_20px_rgba(34,211,238,0.4)] flex items-center justify-center gap-2 cursor-pointer"
                                id="estimator-submit-btn"
                              >
                                <Send className="w-3.5 h-3.5" />
                                Request Custom Quote
                              </button>
                            </form>
                          ) : (
                            <div className="border-t border-slate-900 pt-5 mt-2 flex flex-col items-center gap-3 text-center animate-fade-in" id="estimator-success-alert">
                              <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                                <Check className="w-5 h-5 stroke-[3px]" />
                              </div>
                              <div className="flex flex-col gap-1">
                                <h4 className="text-white font-sans text-sm font-bold">Proposal Parameters Logged!</h4>
                                <p className="text-slate-400 font-sans text-xs max-w-xs leading-relaxed">
                                  Our solution architect will review your estimated configurations and contact you at <strong className="text-cyan-400 font-mono font-normal">{estimatorContactEmail}</strong> within 12 business hours.
                                </p>
                              </div>
                              <button
                                onClick={() => {
                                  setEstimatorSubmitted(false);
                                  setEstimatorContactEmail('');
                                  setEstimatorMessage('');
                                }}
                                className="text-[10px] font-mono text-cyan-400 hover:underline mt-2 cursor-pointer"
                              >
                                Edit Selection & Estimate Another Build
                              </button>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  );
                })()}

              </div>

            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
