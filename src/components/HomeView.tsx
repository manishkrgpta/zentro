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
    if (project) { setSelectedProject(project); setActiveView('portfolio'); }
  };

  const getServiceIcon = (name: string) => {
    switch (name) {
      case 'Cpu': return <Cpu className="w-6 h-6 text-violet-600" />;
      case 'Globe': return <Globe className="w-6 h-6 text-fuchsia-600" />;
      case 'Layers': return <Layers className="w-6 h-6 text-purple-600" />;
      case 'Smartphone': return <Smartphone className="w-6 h-6 text-fuchsia-600" />;
      case 'BarChart3': return <BarChart3 className="w-6 h-6 text-violet-600" />;
      case 'Network': return <Network className="w-6 h-6 text-purple-600" />;
      default: return <Cpu className="w-6 h-6 text-violet-600" />;
    }
  };

  return (
    <div className="relative w-full overflow-hidden bg-white" id="zentro-home-view-container">
      
      <section className="relative min-h-screen pt-28 pb-20 flex items-center justify-center" id="home-hero">
        <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-violet-200/40 rounded-full blur-[100px] pointer-events-none animate-pulse duration-[6s]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-fuchsia-200/40 rounded-full blur-[120px] pointer-events-none animate-pulse duration-[8s]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            <div className="lg:col-span-7 flex flex-col gap-6 text-left animate-fade-in" id="hero-text-block">
              <div className="flex items-center gap-2.5 bg-violet-50 border border-violet-200 px-3.5 py-1.5 rounded-full w-fit mb-2">
                <ZentroLogo size={20} />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-violet-700">zentro.</span>
                <span className="text-xs font-mono text-slate-300">|</span>
                <span className="text-xs font-mono text-slate-400 font-medium tracking-wide">THE FUTURE OF INTELLIGENCE</span>
              </div>

              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="text-4xl sm:text-5xl lg:text-[64px] font-sans font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-slate-900 to-slate-500 leading-[1.1]"
                id="hero-headline"
              >
                Transform Your Business <br className="hidden sm:inline" />
                with AI-Powered Software
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-slate-500 text-base sm:text-[18px] font-sans leading-relaxed max-w-[540px] mb-4"
                id="hero-subheadline"
              >
                Zentro designs and develops modern websites, AI automation agents, custom SaaS platforms, and mobile applications that help businesses grow faster.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.45 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-2"
                id="hero-ctas"
              >
                <button
                  onClick={() => { setActiveView('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="px-8 py-3.5 rounded-full text-sm font-sans font-semibold tracking-wide text-white bg-violet-600 hover:bg-violet-500 transition-all duration-300 shadow-[0_4px_15px_rgba(124,58,237,0.2)] hover:shadow-[0_4px_25px_rgba(124,58,237,0.3)] flex items-center justify-center gap-2 cursor-pointer active:scale-95 group"
                  id="hero-cta-get-started"
                >
                  <Terminal className="w-4 h-4 text-white" />
                  Get Started
                  <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1.5 transition-transform duration-200" />
                </button>
                <button
                  onClick={() => { setActiveView('portfolio'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="px-8 py-3.5 rounded-full text-sm font-sans font-semibold tracking-wide text-violet-700 bg-violet-50 border border-violet-200 hover:bg-violet-100 hover:border-violet-300 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                  id="hero-cta-view-work"
                >
                  View Our Work
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-4 border-t border-slate-200 pt-6 text-xs font-mono text-slate-400"
                id="hero-social-proof"
              >
                <div className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-emerald-500" /><span>SOC2 Ready</span></div>
                <div className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-amber-500" /><span>Elite Speed (Lighthouse 99+)</span></div>
                <div className="flex items-center gap-1.5"><TrendingUp className="w-4 h-4 text-violet-500" /><span>120% Avg ROI Boost</span></div>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="lg:col-span-5 relative flex items-center justify-center"
              id="hero-globe-block"
            >
              <div className="relative w-full aspect-square max-w-[480px]">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30 z-0">
                  <div className="absolute w-[360px] h-[360px] border border-violet-300/30 rounded-full animate-[spin_20s_linear_infinite]" style={{ transform: 'rotateX(60deg) rotateY(0deg)' }} />
                  <div className="absolute w-[360px] h-[360px] border border-fuchsia-300/30 rounded-full animate-[spin_25s_linear_infinite]" style={{ transform: 'rotateX(60deg) rotateY(120deg)' }} />
                  <div className="absolute w-[360px] h-[360px] border border-purple-300/30 rounded-full animate-[spin_30s_linear_infinite]" style={{ transform: 'rotateX(60deg) rotateY(240deg)' }} />
                </div>

                <div className="absolute top-8 -left-4 z-20 bg-white/80 backdrop-blur-md px-4 py-3 rounded-2xl border border-slate-200 shadow-lg flex items-center gap-3 animate-bounce duration-[4s]" id="floating-glass-card-1">
                  <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center">
                    <Cpu className="w-4.5 h-4.5 text-violet-600" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-slate-400 leading-none">AI Workflow Active</div>
                    <div className="text-slate-800 text-xs font-bold font-sans mt-0.5">Automating RAG Pipeline</div>
                  </div>
                </div>

                <div className="absolute bottom-12 -right-4 z-20 bg-white/80 backdrop-blur-md px-4 py-3 rounded-2xl border border-slate-200 shadow-lg flex items-center gap-3 animate-bounce duration-[5s] delay-1000" id="floating-glass-card-2">
                  <div className="w-8 h-8 rounded-lg bg-fuchsia-100 flex items-center justify-center">
                    <TrendingUp className="w-4.5 h-4.5 text-fuchsia-600" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-slate-400 leading-none">Global CDN</div>
                    <div className="text-slate-800 text-xs font-bold font-sans mt-0.5">Latency: 14ms (Tokyo)</div>
                  </div>
                </div>

                <InteractiveGlobe />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative py-12 border-y border-slate-200 bg-slate-50/50" id="featured-tech">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="flex flex-col">
              <span className="text-[11px] font-mono text-violet-600 tracking-widest font-semibold uppercase">Engineered With</span>
              <h2 className="text-slate-800 text-lg font-sans font-bold mt-0.5">Enterprise Core Stack</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full md:w-auto" id="tech-stack-badges">
              {[
                { category: 'Frontend', items: 'React · Tailwind · TS' },
                { category: 'Backend', items: 'Node.js · NestJS · Go' },
                { category: 'Databases', items: 'Postgres · Redis' },
                { category: 'AI Models', items: 'Gemini · OpenAI' }
              ].map((tech, idx) => (
                <div key={idx} className="bg-white border border-slate-200 p-3.5 rounded-xl flex flex-col gap-1 text-left">
                  <span className="text-[9px] font-mono text-slate-400 uppercase font-semibold">{tech.category}</span>
                  <span className="text-xs text-slate-600 font-sans font-medium">{tech.items}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-28" id="home-services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-3">
            <span className="text-xs font-mono text-violet-600 tracking-widest uppercase font-bold">Solutions Stack</span>
            <h2 className="text-3xl sm:text-4xl font-sans font-bold text-slate-900 tracking-tight">Our Core Offerings</h2>
            <p className="text-slate-500 font-sans text-sm leading-relaxed max-w-xl">We design, test, and deploy resilient solutions utilizing modern technologies.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="services-cards-grid">
            {servicesData.slice(0, 3).map((service) => (
              <div key={service.id} className="group relative bg-white hover:bg-violet-50/30 border border-slate-200 hover:border-violet-300 rounded-2xl p-6 transition-all duration-300 flex flex-col gap-5 hover:shadow-md text-left interactive-card" id={`service-card-${service.id}`}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-violet-300 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(139,92,246,0.15)] transition-shadow duration-300 text-violet-600">
                  {getServiceIcon(service.iconName)}
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-slate-900 font-sans text-lg font-bold group-hover:text-violet-700 transition-colors duration-200">{service.title}</h3>
                  <p className="text-slate-500 font-sans text-xs leading-relaxed line-clamp-3">{service.shortDesc}</p>
                </div>
                <div className="mt-auto border-t border-slate-100 pt-4 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400 uppercase">{service.metrics.label}</span>
                  <span className="text-violet-600 font-bold">{service.metrics.value}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12" id="services-all-cta-container">
            <button
              onClick={() => { setActiveView('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-violet-200 hover:border-violet-400 bg-white hover:bg-violet-50 text-xs font-mono text-slate-500 hover:text-slate-800 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer group shadow-sm"
              id="view-all-services-button"
            >
              <span>Explore All Our Services</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => { setActiveView('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); setTimeout(() => { const el = document.getElementById('tactile-project-cost-estimator'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }, 500); }}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-xs font-mono font-bold text-white transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_15px_rgba(124,58,237,0.2)] hover:shadow-[0_4px_20px_rgba(139,92,246,0.3)]"
              id="calculate-estimate-cta-btn"
            >
              <span>Calculate Custom Estimate</span>
              <Sparkles className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      <section className="relative py-28 border-t border-slate-200 bg-slate-50/30" id="why-choose-us">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-3">
            <span className="text-xs font-mono text-violet-600 tracking-widest uppercase font-bold">Why Zentro</span>
            <h2 className="text-3xl sm:text-4xl font-sans font-bold text-slate-900 tracking-tight">The AI-First Engineering Advantage</h2>
            <p className="text-slate-500 font-sans text-sm leading-relaxed max-w-xl">We replace legacy development models with high-throughput automated AI-driven workflows.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="bento-values-grid">
            <div className="md:col-span-2 relative bg-white border border-slate-200 p-8 rounded-3xl flex flex-col justify-between overflow-hidden group text-left" id="bento-value-1">
              <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-violet-100/50 rounded-full blur-3xl pointer-events-none group-hover:bg-violet-100 transition-colors" />
              <div className="flex flex-col gap-4">
                <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center"><Cpu className="w-5 h-5 text-violet-600" /></div>
                <h3 className="text-slate-900 text-xl font-sans font-bold">AI-First Core Architecture</h3>
                <p className="text-slate-500 text-sm font-sans leading-relaxed max-w-lg">Every product we architect integrates AI features from the ground up.</p>
              </div>
              <div className="flex gap-4 mt-8 pt-6 border-t border-slate-100 text-xs font-mono text-slate-400"><span>· Autonomous workflows</span><span>· Custom embeddings</span><span>· Cognitive routing</span></div>
            </div>

            <div className="bg-white border border-slate-200 p-8 rounded-3xl flex flex-col justify-between relative group text-left" id="bento-value-2">
              <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-violet-100/50 rounded-full blur-2xl pointer-events-none" />
              <div className="flex flex-col gap-4">
                <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center"><Zap className="w-5 h-5 text-violet-600" /></div>
                <h3 className="text-slate-900 text-xl font-sans font-bold">Lightning-Fast Delivery</h3>
                <p className="text-slate-500 text-sm font-sans leading-relaxed">We deliver production-ready software in weeks, not months.</p>
              </div>
              <div className="text-xs font-mono text-violet-600 font-semibold mt-6">Avg Delivery Duration: 4-6 Weeks</div>
            </div>

            <div className="bg-white border border-slate-200 p-8 rounded-3xl flex flex-col justify-between relative group text-left" id="bento-value-3">
              <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-fuchsia-100/50 rounded-full blur-2xl pointer-events-none" />
              <div className="flex flex-col gap-4">
                <div className="w-10 h-10 rounded-lg bg-fuchsia-100 flex items-center justify-center"><Shield className="w-5 h-5 text-fuchsia-600" /></div>
                <h3 className="text-slate-900 text-xl font-sans font-bold">Enterprise Security</h3>
                <p className="text-slate-500 text-sm font-sans leading-relaxed">Every API is rate-limited, every database is partitioned.</p>
              </div>
              <div className="text-xs font-mono text-fuchsia-600 font-semibold mt-6">SOC2 Type II - Compliant Ready</div>
            </div>

            <div className="md:col-span-2 relative bg-white border border-slate-200 p-8 rounded-3xl flex flex-col justify-between overflow-hidden group text-left" id="bento-value-4">
              <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-fuchsia-100/50 rounded-full blur-3xl pointer-events-none" />
              <div className="flex flex-col gap-4">
                <div className="w-10 h-10 rounded-lg bg-fuchsia-100 flex items-center justify-center"><BarChart3 className="w-5 h-5 text-fuchsia-600" /></div>
                <h3 className="text-slate-900 text-xl font-sans font-bold">Premium Modern UI/UX Design</h3>
                <p className="text-slate-500 text-sm font-sans leading-relaxed max-w-lg">We compose stunning interfaces, pixel-perfect layouts, and fluid visual transitions.</p>
              </div>
              <div className="flex gap-4 mt-8 pt-6 border-t border-slate-100 text-xs font-mono text-slate-400"><span>· Dark mode default</span><span>· Fluid motion states</span><span>· Responsive bento grids</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-28 border-t border-slate-200" id="home-process">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-3">
            <span className="text-xs font-mono text-violet-600 tracking-widest uppercase font-bold">Operational Lifecycle</span>
            <h2 className="text-3xl sm:text-4xl font-sans font-bold text-slate-900 tracking-tight">Our 7-Step Delivery Pipeline</h2>
            <p className="text-slate-500 font-sans text-sm leading-relaxed max-w-xl">From initial discovery to active production maintenance.</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 mb-8" id="process-stepper-tabs">
            {processSteps.map((step) => {
              const isActive = activeTimelineStep === step.number;
              return (
                <button key={step.number} onClick={() => setActiveTimelineStep(step.number)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer ${isActive ? 'bg-violet-600 text-white shadow-[0_0_15px_rgba(124,58,237,0.3)] border border-violet-400' : 'bg-white border border-slate-200 text-slate-500 hover:text-slate-800'}`}
                  id={`timeline-tab-${step.number}`}
                >
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${isActive ? 'bg-white text-violet-600' : 'bg-slate-200 text-slate-500'}`}>{step.number}</span>
                  <span>{step.title}</span>
                </button>
              );
            })}
          </div>

          <div className="max-w-4xl mx-auto" id="process-step-display">
            {processSteps.map((step) => {
              if (step.number !== activeTimelineStep) return null;
              return (
                <div key={step.number} className="bg-white border border-slate-200 p-8 rounded-3xl text-left grid grid-cols-1 md:grid-cols-12 gap-8 shadow-md animate-fade-in relative overflow-hidden" id={`process-detail-card-${step.number}`}>
                  <span className="absolute -bottom-10 -right-4 text-9xl font-mono font-bold text-slate-100 select-none">0{step.number}</span>
                  <div className="md:col-span-7 flex flex-col gap-4 relative z-10">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-mono text-violet-600 uppercase tracking-widest font-semibold">{step.phase}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-ping" />
                    </div>
                    <h3 className="text-slate-900 text-2xl font-sans font-bold">0{step.number}. {step.title}</h3>
                    <p className="text-slate-500 text-sm font-sans leading-relaxed">{step.description}</p>
                  </div>
                  <div className="md:col-span-5 bg-slate-50 border border-slate-200 p-6 rounded-2xl flex flex-col gap-3 relative z-10" id="process-deliverables-box">
                    <h4 className="text-xs font-mono text-slate-500 uppercase font-semibold border-b border-slate-200 pb-2">Key Deliverables</h4>
                    <ul className="flex flex-col gap-2">
                      {step.deliverables.map((deliv, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 font-sans leading-snug">
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

      <section className="relative py-20 border-t border-slate-200 bg-slate-50/50" id="home-stats">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" id="stats-counter-grid">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col gap-2 text-left bg-white border border-slate-200 p-6 rounded-2xl" id={`stat-box-${idx}`}>
                <div className="text-4xl sm:text-5xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">{stat.current}{stat.suffix}</div>
                <div className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wide mt-1">{stat.label}</div>
                <p className="text-slate-400 font-sans text-xs leading-relaxed mt-1">{stat.subtext}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-28 border-t border-slate-200 bg-slate-50/30" id="home-portfolio">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-16">
            <div className="text-left">
              <span className="text-xs font-mono text-violet-600 tracking-widest uppercase font-bold">Pricing & Packages</span>
              <h2 className="text-3xl sm:text-4xl font-sans font-bold text-slate-900 tracking-tight mt-1">Transparent Service Pricing</h2>
            </div>
            <button onClick={() => { setActiveView('portfolio'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="px-5 py-3 rounded-xl border border-slate-200 hover:border-violet-300 bg-white text-xs font-mono text-slate-500 hover:text-slate-800 transition-all cursor-pointer flex items-center gap-1.5" id="view-all-portfolio-button">
              <span>Explore Pricing Packages</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="portfolio-cards-grid">
            {projectsData.slice(0, 2).map((project) => (
              <div key={project.id} onClick={() => handleProjectClick(project.id)}
                className="group bg-white border border-slate-200 hover:border-violet-300 rounded-3xl p-8 flex flex-col gap-6 text-left transition-all duration-300 hover:shadow-md cursor-pointer interactive-card relative overflow-hidden" id={`project-preview-${project.id}`}>
                <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-violet-100/30 rounded-full blur-3xl pointer-events-none" />
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-violet-100 border border-violet-200 text-[10px] font-mono text-violet-700 rounded-md">{project.category}</span>
                  <div className="text-xs font-mono text-slate-400 group-hover:text-violet-600 transition-colors flex items-center gap-1.5">
                    <span>Interactive Sandbox Demo</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
                <div className="flex flex-col gap-2.5">
                  <h3 className="text-slate-900 text-xl font-sans font-bold group-hover:text-violet-700 transition-colors duration-200">{project.title}</h3>
                  <p className="text-slate-500 font-sans text-xs leading-relaxed">{project.description}</p>
                </div>
                <div className="bg-violet-50/50 border border-violet-200 p-4 rounded-xl flex items-center justify-between text-xs font-mono mt-2">
                  <span className="text-slate-500 uppercase">{project.metrics.label}</span>
                  <span className="text-violet-600 font-bold">{project.metrics.value}</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-auto" id="project-preview-tech-tags">
                  {project.stack.slice(0, 3).map((item, idx) => (
                    <span key={idx} className="bg-slate-100 px-2 py-1 rounded text-[10px] font-mono text-slate-500">{item}</span>
                  ))}
                  {project.stack.length > 3 && <span className="bg-slate-100 px-2 py-1 rounded text-[10px] font-mono text-slate-400">+{project.stack.length - 3} More</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-28 border-t border-slate-200" id="home-testimonials">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-3">
            <span className="text-xs font-mono text-violet-600 tracking-widest uppercase font-bold">Client Validation</span>
            <h2 className="text-3xl sm:text-4xl font-sans font-bold text-slate-900 tracking-tight">What Our Partners Say</h2>
            <p className="text-slate-500 font-sans text-sm leading-relaxed max-w-xl">We focus on building reliable trust networks.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="testimonials-grid">
            {testimonialsData.map((test) => (
              <div key={test.id} className="bg-white border border-slate-200 rounded-3xl p-6 text-left flex flex-col justify-between relative group" id={`testimonial-${test.id}`}>
                <Quote className="absolute top-6 right-6 w-10 h-10 text-slate-100 select-none pointer-events-none group-hover:text-slate-200 transition-colors" />
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-1 text-amber-400">{[...Array(test.rating)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-current" />))}</div>
                  <p className="text-slate-600 font-sans text-xs leading-relaxed italic relative z-10">"{test.comment}"</p>
                </div>
                <div className="flex items-center gap-4 border-t border-slate-100 pt-5 mt-6">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-violet-500 via-purple-500 to-fuchsia-500 flex items-center justify-center font-bold text-white text-xs shadow-sm">
                    {test.name.charAt(0)}{test.name.split(' ')[1]?.charAt(0) || ''}
                  </div>
                  <div>
                    <h4 className="text-slate-900 text-xs font-bold leading-none">{test.name}</h4>
                    <span className="text-[10px] text-slate-400 font-mono mt-1 block">{test.role}, <span className="text-violet-600 font-semibold">{test.company}</span></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-28 border-t border-slate-200" id="home-cta">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="relative bg-gradient-to-br from-violet-50 to-fuchsia-50 border border-violet-200 px-8 py-16 sm:px-12 sm:py-20 rounded-[30px] overflow-hidden text-center shadow-sm">
            <div className="absolute top-0 left-1/4 w-[250px] h-[250px] bg-violet-200/40 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[250px] h-[250px] bg-fuchsia-200/40 rounded-full blur-[80px] pointer-events-none" />
            <div className="relative z-10 flex flex-col items-center gap-6 max-w-3xl mx-auto">
              <span className="immersive-tag-mono">// ENGINEERING TOMORROW'S INFRASTRUCTURE</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold text-slate-900 tracking-tight">Ready to Build Something <br />Extraordinary?</h2>
              <p className="text-slate-500 text-sm font-sans leading-relaxed max-w-xl">Schedule a complimentary 30-minute system review with our AI architects.</p>
              <button onClick={() => { setActiveView('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="px-8 py-3.5 bg-violet-600 hover:bg-violet-500 rounded-full text-sm font-sans font-semibold tracking-wider text-white transition-all duration-300 shadow-[0_4px_15px_rgba(124,58,237,0.2)] hover:shadow-[0_4px_25px_rgba(124,58,237,0.3)] cursor-pointer active:scale-95 flex items-center gap-2 mt-4" id="cta-bottom-button">
                <Terminal className="w-4 h-4 text-white" />
                Book a Free Consultation
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}