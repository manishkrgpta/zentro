/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Cpu, Globe, Layers, Smartphone, BarChart3, Network, ArrowRight, CheckCircle2, Star, Quote, ChevronRight, Sparkles, Terminal, Shield, Zap, TrendingUp, RefreshCw } from 'lucide-react';
import InteractiveGlobe from './InteractiveGlobe';
import ZentroLogo from './ZentroLogo';
import { servicesData, projectsData, processSteps, statsData, testimonialsData } from '../data';
import { useState, useEffect } from 'react';

interface HomeViewProps {
  setActiveView: (view: string) => void;
  setSelectedProject: (project: any) => void;
}

export default function HomeView({ setActiveView, setSelectedProject }: HomeViewProps) {
  const [activeTimelineStep, setActiveTimelineStep] = useState(1);
  const [stats, setStats] = useState(statsData.map(s => ({ ...s, current: 0 })));

  // Simple statistics count-up animation
  useEffect(() => {
    const intervals = statsData.map((stat, idx) => {
      const increment = stat.value / 40;
      return setInterval(() => {
        setStats(prev => {
          const next = [...prev];
          if (next[idx].current < stat.value) {
            next[idx].current = Math.min(stat.value, Number((next[idx].current + increment).toFixed(1)));
          }
          return next;
        });
      }, 30);
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  const handleProjectClick = (projectId: string) => {
    const project = projectsData.find(p => p.id === projectId);
    if (project) {
      setSelectedProject(project);
      setActiveView('portfolio');
    }
  };

  // Map icon names to Lucide icons
  const getServiceIcon = (name: string) => {
    switch (name) {
      case 'Cpu': return <Cpu className="w-6 h-6 text-cyan-400" />;
      case 'Globe': return <Globe className="w-6 h-6 text-blue-400" />;
      case 'Layers': return <Layers className="w-6 h-6 text-purple-400" />;
      case 'Smartphone': return <Smartphone className="w-6 h-6 text-pink-400" />;
      case 'BarChart3': return <BarChart3 className="w-6 h-6 text-cyan-400" />;
      case 'Network': return <Network className="w-6 h-6 text-blue-400" />;
      default: return <Cpu className="w-6 h-6 text-indigo-400" />;
    }
  };

  return (
    <div className="relative w-full overflow-hidden" id="zentro-home-view-container">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen pt-28 pb-20 flex items-center justify-center" id="home-hero">
        {/* Glow Spheres */}
        <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none animate-pulse duration-[6s]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse duration-[8s]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Copywriting & Actions */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-left animate-fade-in" id="hero-text-block">
              {/* Premium Top Badge */}
              <div className="flex items-center gap-2.5 bg-white/[0.03] border border-white/5 px-3.5 py-1.5 rounded-full w-fit mb-2">
                <ZentroLogo size={20} />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">zentro.</span>
                <span className="text-xs font-mono text-slate-500">|</span>
                <span className="text-xs font-mono text-slate-400 font-medium tracking-wide">THE FUTURE OF INTELLIGENCE</span>
              </div>

              {/* Main Headline */}
              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="text-4xl sm:text-5xl lg:text-[64px] font-sans font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-[#94a3b8] leading-[1.1]"
                id="hero-headline"
              >
                Transform Your Business <br className="hidden sm:inline" />
                with AI-Powered Software
              </motion.h1>

              {/* Subheadline */}
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-white/60 text-base sm:text-[18px] font-sans leading-relaxed max-w-[540px] mb-4"
                id="hero-subheadline"
              >
                Zentro designs and develops modern websites, AI automation agents, custom SaaS platforms, and mobile applications that help businesses grow faster, automate manual workflows, and deliver exceptional customer experiences.
              </motion.p>

              {/* CTAs */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.45 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-2"
                id="hero-ctas"
              >
                <button
                  onClick={() => {
                    setActiveView('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-8 py-3.5 rounded-full text-sm font-sans font-semibold tracking-wide text-[#050816] bg-white hover:bg-slate-100 transition-all duration-300 shadow-[0_4px_15px_rgba(255,255,255,0.1)] hover:shadow-[0_4px_25px_rgba(255,255,255,0.2)] flex items-center justify-center gap-2 cursor-pointer active:scale-95 group"
                  id="hero-cta-get-started"
                >
                  <Terminal className="w-4 h-4 text-[#050816]" />
                  Get Started
                  <ArrowRight className="w-4 h-4 text-[#050816] group-hover:translate-x-1.5 transition-transform duration-200" />
                </button>
                <button
                  onClick={() => {
                    setActiveView('portfolio');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-8 py-3.5 rounded-full text-sm font-sans font-semibold tracking-wide text-white bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                  id="hero-cta-view-work"
                >
                  View Our Work
                </button>
              </motion.div>

              {/* Mini Social Proof */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-4 border-t border-slate-900/80 pt-6 text-xs font-mono text-slate-500"
                id="hero-social-proof"
              >
                <div className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-emerald-500" />
                  <span>SOC2 Ready</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span>Elite Speed (Lighthouse 99+)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-cyan-400" />
                  <span>120% Avg ROI Boost</span>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Globe Animation */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="lg:col-span-5 relative flex items-center justify-center"
              id="hero-globe-block"
            >
              <div className="relative w-full aspect-square max-w-[480px]">
                {/* Immersive UI Rings Backdrop */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40 z-0">
                  <div className="absolute w-[360px] h-[360px] border border-blue-500/10 rounded-full animate-[spin_20s_linear_infinite]" style={{ transform: 'rotateX(60deg) rotateY(0deg)' }} />
                  <div className="absolute w-[360px] h-[360px] border border-cyan-400/10 rounded-full animate-[spin_25s_linear_infinite]" style={{ transform: 'rotateX(60deg) rotateY(120deg)' }} />
                  <div className="absolute w-[360px] h-[360px] border border-purple-500/10 rounded-full animate-[spin_30s_linear_infinite]" style={{ transform: 'rotateX(60deg) rotateY(240deg)' }} />
                </div>

                {/* Visual Glass Cards */}
                <div className="absolute top-8 -left-4 z-20 bg-white/[0.03] backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 shadow-2xl flex items-center gap-3 animate-bounce duration-[4s]" id="floating-glass-card-1">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <Cpu className="w-4.5 h-4.5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-slate-500 leading-none">AI Workflow Active</div>
                    <div className="text-white text-xs font-bold font-sans mt-0.5">Automating RAG Pipeline</div>
                  </div>
                </div>

                <div className="absolute bottom-12 -right-4 z-20 bg-white/[0.03] backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 shadow-2xl flex items-center gap-3 animate-bounce duration-[5s] delay-1000" id="floating-glass-card-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <TrendingUp className="w-4.5 h-4.5 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-slate-500 leading-none">Global CDN</div>
                    <div className="text-white text-xs font-bold font-sans mt-0.5">Latency: 14ms (Tokyo)</div>
                  </div>
                </div>

                <InteractiveGlobe />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. FEATURED TECHNOLOGIES BAR */}
      <section className="relative py-12 border-y border-slate-900/60 bg-slate-950/40" id="featured-tech">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="flex flex-col">
              <span className="text-[11px] font-mono text-cyan-400 tracking-widest font-semibold uppercase">Engineered With</span>
              <h2 className="text-white text-lg font-sans font-bold mt-0.5">Enterprise Core Stack</h2>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full md:w-auto" id="tech-stack-badges">
              {[
                { category: 'Frontend', items: 'React · Tailwind · TS' },
                { category: 'Backend', items: 'Node.js · NestJS · Go' },
                { category: 'Databases', items: 'Postgres · Redis' },
                { category: 'AI Models', items: 'Gemini · OpenAI' }
              ].map((tech, idx) => (
                <div key={idx} className="bg-slate-950/80 border border-slate-900 p-3.5 rounded-xl flex flex-col gap-1 text-left">
                  <span className="text-[9px] font-mono text-slate-500 uppercase font-semibold">{tech.category}</span>
                  <span className="text-xs text-slate-300 font-sans font-medium">{tech.items}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. CAPABILITIES / SERVICES PREVIEW */}
      <section className="relative py-28" id="home-services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-3">
            <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase font-bold">Solutions Stack</span>
            <h2 className="text-3xl sm:text-4xl font-sans font-bold text-white tracking-tight">Our Core Offerings</h2>
            <p className="text-slate-400 font-sans text-sm leading-relaxed max-w-xl">
              We design, test, and deploy resilient solutions utilizing modern technologies, custom integrations, and strict performance metrics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="services-cards-grid">
            {servicesData.slice(0, 3).map((service) => (
              <div 
                key={service.id}
                className="group relative bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.05] hover:border-blue-500/30 rounded-2xl p-6 transition-all duration-300 flex flex-col gap-5 hover:shadow-[0_12px_36px_rgba(59,130,246,0.08)] text-left interactive-card"
                id={`service-card-${service.id}`}
              >
                {/* Top glow effect on hover */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Icon block */}
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-shadow duration-300 text-blue-400">
                  {getServiceIcon(service.iconName)}
                </div>

                {/* Info and text */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-white font-sans text-lg font-bold group-hover:text-cyan-300 transition-colors duration-200">
                    {service.title}
                  </h3>
                  <p className="text-white/60 font-sans text-xs leading-relaxed line-clamp-3">
                    {service.shortDesc}
                  </p>
                </div>

                {/* Key Metric element */}
                <div className="mt-auto border-t border-slate-900/60 pt-4 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500 uppercase">{service.metrics.label}</span>
                  <span className="text-cyan-400 font-bold">{service.metrics.value}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12" id="services-all-cta-container">
            <button
              onClick={() => {
                setActiveView('services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-blue-500/20 hover:border-blue-500/50 bg-[#0a0f29]/40 hover:bg-[#0d153a]/60 text-xs font-mono text-slate-300 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer group shadow-[0_4px_15px_rgba(0,0,0,0.3)]"
              id="view-all-services-button"
            >
              <span>Explore All Our Services</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => {
                setActiveView('services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setTimeout(() => {
                  const estimatorEl = document.getElementById('tactile-project-cost-estimator');
                  if (estimatorEl) {
                    estimatorEl.scrollIntoView({ behavior: 'smooth' });
                  }
                }, 500);
              }}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-cyan-500 text-xs font-mono font-bold text-white transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_15px_rgba(37,99,235,0.25)] hover:shadow-[0_4px_20px_rgba(34,211,238,0.4)]"
              id="calculate-estimate-cta-btn"
            >
              <span>Calculate Custom Estimate</span>
              <Sparkles className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* 4. WHY CHOOSE ZENTRO (BENTO GRID VALUE) */}
      <section className="relative py-28 border-t border-slate-900/60 bg-[#040613]" id="why-choose-us">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-3">
            <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase font-bold">Why Zentro</span>
            <h2 className="text-3xl sm:text-4xl font-sans font-bold text-white tracking-tight">The AI-First Engineering Advantage</h2>
            <p className="text-slate-400 font-sans text-sm leading-relaxed max-w-xl">
              We replace legacy development models with high-throughput automated AI-driven workflows to build robust, secure systems.
            </p>
          </div>

          {/* Bento layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="bento-values-grid">
                   {/* Box 1: Large (2 cols wide on desktop) */}
            <div className="md:col-span-2 relative bg-white/[0.03] border border-white/[0.05] p-8 rounded-3xl flex flex-col justify-between overflow-hidden group text-left" id="bento-value-1">
              <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/10 transition-colors" />
              <div className="flex flex-col gap-4">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="text-white text-xl font-sans font-bold">AI-First Core Architecture</h3>
                <p className="text-white/60 text-sm font-sans leading-relaxed max-w-lg">
                  Every product we architect integrates AI features from the ground up. Whether utilizing vector storage like Pinecone, deploying neural RAG configurations, or establishing autonomous background agents, we create systems that learn and adapt.
                </p>
              </div>
              <div className="flex gap-4 mt-8 pt-6 border-t border-slate-900/80 text-xs font-mono text-slate-500">
                <span>· Autonomous workflows</span>
                <span>· Custom embeddings</span>
                <span>· Cognitive routing</span>
              </div>
            </div>

            {/* Box 2: Small */}
            <div className="bg-white/[0.03] border border-white/[0.05] p-8 rounded-3xl flex flex-col justify-between relative group text-left" id="bento-value-2">
              <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
              <div className="flex flex-col gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-white text-xl font-sans font-bold">Lightning-Fast Delivery</h3>
                <p className="text-white/60 text-sm font-sans leading-relaxed">
                  By utilizing AI-assisted developer environments and pre-audited enterprise modules, we deliver production-ready software in weeks, not months.
                </p>
              </div>
              <div className="text-xs font-mono text-cyan-400 font-semibold mt-6">
                Avg Delivery Duration: 4-6 Weeks
              </div>
            </div>

            {/* Box 3: Small */}
            <div className="bg-white/[0.03] border border-white/[0.05] p-8 rounded-3xl flex flex-col justify-between relative group text-left" id="bento-value-3">
              <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-purple-500/5 rounded-full blur-2xl pointer-events-none" />
              <div className="flex flex-col gap-4">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="text-white text-xl font-sans font-bold">Enterprise Security</h3>
                <p className="text-white/60 text-sm font-sans leading-relaxed">
                  Every API is rate-limited, every database is partitioned, and every system is engineered to pass rigorous SOC2 security audits effortlessly.
                </p>
              </div>
              <div className="text-xs font-mono text-purple-400 font-semibold mt-6">
                SOC2 Type II - Compliant Ready
              </div>
            </div>

            {/* Box 4: Large (2 cols wide on desktop) */}
            <div className="md:col-span-2 relative bg-white/[0.03] border border-white/[0.05] p-8 rounded-3xl flex flex-col justify-between overflow-hidden group text-left" id="bento-value-4">
              <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-pink-500/5 rounded-full blur-3xl pointer-events-none" />
              <div className="flex flex-col gap-4">
                <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-pink-400" />
                </div>
                <h3 className="text-white text-xl font-sans font-bold">Premium Modern UI/UX Design</h3>
                <p className="text-white/60 text-sm font-sans leading-relaxed max-w-lg">
                  We believe that backend power is wasted without world-class frontends. We compose stunning dark mode interfaces, pixel-perfect layout configurations, fluid visual canvas transitions, and customized modular dashboard frames.
                </p>
              </div>
              <div className="flex gap-4 mt-8 pt-6 border-t border-slate-900/80 text-xs font-mono text-slate-500">
                <span>· Dark mode default</span>
                <span>· Fluid motion states</span>
                <span>· Responsive bento grids</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. PROCESS HORIZONTAL TIMELINE */}
      <section className="relative py-28 border-t border-slate-900/60" id="home-process">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-3">
            <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase font-bold">Operational Lifecycle</span>
            <h2 className="text-3xl sm:text-4xl font-sans font-bold text-white tracking-tight">Our 7-Step Delivery Pipeline</h2>
            <p className="text-slate-400 font-sans text-sm leading-relaxed max-w-xl">
              From initial discovery to active production maintenance, we operate with maximum transparency and structured timelines.
            </p>
          </div>

          {/* Stepper Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8" id="process-stepper-tabs">
            {processSteps.map((step) => {
              const isActive = activeTimelineStep === step.number;
              return (
                <button
                  key={step.number}
                  onClick={() => setActiveTimelineStep(step.number)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)] border border-blue-500/30' 
                      : 'bg-slate-950 border border-slate-900 text-slate-400 hover:text-slate-200'
                  }`}
                  id={`timeline-tab-${step.number}`}
                >
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${isActive ? 'bg-white text-blue-600' : 'bg-slate-900 text-slate-400'}`}>
                    {step.number}
                  </span>
                  <span>{step.title}</span>
                </button>
              );
            })}
          </div>

          {/* Display active step detail card */}
          <div className="max-w-4xl mx-auto" id="process-step-display">
            {processSteps.map((step) => {
              if (step.number !== activeTimelineStep) return null;
              return (
                <div 
                  key={step.number}
                  className="bg-slate-950 border border-slate-900 p-8 rounded-3xl text-left grid grid-cols-1 md:grid-cols-12 gap-8 shadow-2xl animate-fade-in relative overflow-hidden"
                  id={`process-detail-card-${step.number}`}
                >
                  {/* Decorative background number */}
                  <span className="absolute -bottom-10 -right-4 text-9xl font-mono font-bold text-slate-900/10 select-none">
                    0{step.number}
                  </span>

                  <div className="md:col-span-7 flex flex-col gap-4 relative z-10">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold">{step.phase}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                    </div>
                    <h3 className="text-white text-2xl font-sans font-bold">
                      0{step.number}. {step.title}
                    </h3>
                    <p className="text-slate-400 text-sm font-sans leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div className="md:col-span-5 bg-slate-950 border border-slate-900 p-6 rounded-2xl flex flex-col gap-3 relative z-10" id="process-deliverables-box">
                    <h4 className="text-xs font-mono text-slate-400 uppercase font-semibold border-b border-slate-900 pb-2">
                      Key Deliverables
                    </h4>
                    <ul className="flex flex-col gap-2">
                      {step.deliverables.map((deliv, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 font-sans leading-snug">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{deliv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 6. STATISTICS COUNTER SECTION */}
      <section className="relative py-20 border-t border-slate-900/60 bg-slate-950/40" id="home-stats">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" id="stats-counter-grid">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col gap-2 text-left bg-slate-950/50 border border-slate-900 p-6 rounded-2xl" id={`stat-box-${idx}`}>
                <div className="text-4xl sm:text-5xl font-mono font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                  {stat.current}{stat.suffix}
                </div>
                <div className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wide mt-1">
                  {stat.label}
                </div>
                <p className="text-slate-500 font-sans text-xs leading-relaxed mt-1">
                  {stat.subtext}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PORTFOLIO PREVIEW */}
      <section className="relative py-28 border-t border-slate-900/60 bg-[#040613]" id="home-portfolio">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-16">
            <div className="text-left">
              <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase font-bold">Pricing & Packages</span>
              <h2 className="text-3xl sm:text-4xl font-sans font-bold text-white tracking-tight mt-1">Transparent Service Pricing</h2>
            </div>
            <button
              onClick={() => {
                setActiveView('portfolio');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-5 py-3 rounded-xl border border-slate-900 hover:border-cyan-500/20 bg-slate-950 text-xs font-mono text-slate-400 hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
              id="view-all-portfolio-button"
            >
              <span>Explore Pricing Packages</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="portfolio-cards-grid">
            {projectsData.slice(0, 2).map((project) => (
              <div 
                key={project.id}
                onClick={() => handleProjectClick(project.id)}
                className="group bg-slate-950 border border-slate-900 hover:border-blue-500/30 rounded-3xl p-8 flex flex-col gap-6 text-left transition-all duration-300 hover:shadow-[0_15px_40px_rgba(59,130,246,0.06)] cursor-pointer interactive-card relative overflow-hidden"
                id={`project-preview-${project.id}`}
              >
                {/* Visual glow backdrop */}
                <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
                
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-blue-600/10 border border-blue-500/20 text-[10px] font-mono text-cyan-400 rounded-md">
                    {project.category}
                  </span>
                  <div className="text-xs font-mono text-slate-400 group-hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                    <span>Interactive Sandbox Demo</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                <div className="flex flex-col gap-2.5">
                  <h3 className="text-white text-xl font-sans font-bold group-hover:text-cyan-300 transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 font-sans text-xs leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Performance Metric highlight */}
                <div className="bg-[#0a112a]/50 border border-blue-500/10 p-4 rounded-xl flex items-center justify-between text-xs font-mono mt-2">
                  <span className="text-slate-500 uppercase">{project.metrics.label}</span>
                  <span className="text-cyan-400 font-bold">{project.metrics.value}</span>
                </div>

                {/* Tech stack tags */}
                <div className="flex flex-wrap gap-1.5 mt-auto" id="project-preview-tech-tags">
                  {project.stack.slice(0, 3).map((item, idx) => (
                    <span key={idx} className="bg-slate-900 px-2 py-1 rounded text-[10px] font-mono text-slate-400">
                      {item}
                    </span>
                  ))}
                  {project.stack.length > 3 && (
                    <span className="bg-slate-900 px-2 py-1 rounded text-[10px] font-mono text-slate-500">
                      +{project.stack.length - 3} More
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. TESTIMONIALS CAROUSEL */}
      <section className="relative py-28 border-t border-slate-900/60" id="home-testimonials">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-3">
            <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase font-bold">Client Validation</span>
            <h2 className="text-3xl sm:text-4xl font-sans font-bold text-white tracking-tight">What Our Partners Say</h2>
            <p className="text-slate-400 font-sans text-sm leading-relaxed max-w-xl">
              We focus on building reliable trust networks. Our partners value Zentro for our exceptional quality of engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="testimonials-grid">
            {testimonialsData.map((test) => (
              <div 
                key={test.id}
                className="bg-slate-950/70 backdrop-blur-md border border-slate-900 rounded-3xl p-6 text-left flex flex-col justify-between relative group"
                id={`testimonial-${test.id}`}
              >
                {/* Backing quote icon decoration */}
                <Quote className="absolute top-6 right-6 w-10 h-10 text-slate-900/30 select-none pointer-events-none group-hover:text-slate-800/40 transition-colors" />

                <div className="flex flex-col gap-4">
                  {/* Rating */}
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  <p className="text-slate-300 font-sans text-xs leading-relaxed italic relative z-10">
                    "{test.comment}"
                  </p>
                </div>

                <div className="flex items-center gap-4 border-t border-slate-900/80 pt-5 mt-6">
                  {/* Styled Avatar */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 via-purple-500 to-cyan-500 flex items-center justify-center font-bold text-white text-xs shadow-md">
                    {test.name.charAt(0)}{test.name.split(' ')[1]?.charAt(0) || ''}
                  </div>
                  <div>
                    <h4 className="text-white text-xs font-bold leading-none">{test.name}</h4>
                    <span className="text-[10px] text-slate-500 font-mono mt-1 block">
                      {test.role}, <span className="text-cyan-400 font-semibold">{test.company}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 9. CTA BANNER SECTION */}
      <section className="relative py-28 border-t border-slate-900/60" id="home-cta">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">          <div className="relative bg-white/[0.03] border border-white/[0.05] px-8 py-16 sm:px-12 sm:py-20 rounded-[30px] overflow-hidden text-center shadow-[0_12px_36px_rgba(59,130,246,0.08)]">
            {/* Ambient visual glowing spheres */}
            <div className="absolute top-0 left-1/4 w-[250px] h-[250px] bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[250px] h-[250px] bg-purple-500/10 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center gap-6 max-w-3xl mx-auto">
              <span className="immersive-tag-mono">// ENGINEERING TOMORROW'S INFRASTRUCTURE</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold text-white tracking-tight">
                Ready to Build Something <br />Extraordinary?
              </h2>
              <p className="text-white/60 text-sm font-sans leading-relaxed max-w-xl">
                Schedule a complimentary 30-minute system review with our AI architects to evaluate custom models optimization and SaaS infrastructure scaling.
              </p>
              
              <button
                onClick={() => {
                  setActiveView('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-8 py-3.5 bg-white hover:bg-slate-100 rounded-full text-sm font-sans font-semibold tracking-wider text-[#050816] transition-all duration-300 shadow-[0_4px_15px_rgba(255,255,255,0.1)] hover:shadow-[0_4px_25px_rgba(255,255,255,0.2)] cursor-pointer active:scale-95 flex items-center gap-2 mt-4"
                id="cta-bottom-button"
              >
                <Terminal className="w-4 h-4 text-[#050816]" />
                Book a Free Consultation
              </button>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
