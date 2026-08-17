/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Sparkles } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import FloatingParticles from './components/FloatingParticles';
import ZentroLogo from './components/ZentroLogo';

// Page Views
import HomeView from './components/HomeView';
import ServicesView from './components/ServicesView';
import PortfolioView from './components/PortfolioView';
import AboutView from './components/AboutView';
import ContactView from './components/ContactView';

import { Project } from './types';

export default function App() {
  const [activeView, setActiveView] = useState('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage for user preference
    const stored = localStorage.getItem('zentro-dark-mode');
    if (stored !== null) {
      return stored === 'true';
    }
    // Otherwise, check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const newMode = !prev;
      localStorage.setItem('zentro-dark-mode', newMode.toString());
      return newMode;
    });
  };

  useEffect(() => {
    const root = document.getElementById('zentro-global-root');
    if (root) {
      if (darkMode) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
    // Also update body class for consistency (optional)
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);
  
  // Loading screen states
  const [loading, setLoading] = useState(true);
  const [loadPercent, setLoadPercent] = useState(0);
  const [bootMessage, setBootMessage] = useState('Booting Zentro Core VM...');

  useEffect(() => {
    // Progress loading bar
    const interval = setInterval(() => {
      setLoadPercent(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 400);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 12 + 5);
        return Math.min(100, next);
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Update booting text messages corresponding to progress percentage
  useEffect(() => {
    if (loadPercent < 25) {
      setBootMessage('Booting Zentro Core VM...');
    } else if (loadPercent < 55) {
      setBootMessage('Loading tactile interface modules...');
    } else if (loadPercent < 85) {
      setBootMessage('Compiling Canvas and WebGL globe models...');
    } else {
      setBootMessage('Zentro systems operational. Interface active.');
    }
  }, [loadPercent]);

  return (
    <div className="relative min-h-screen text-slate-900 bg-white font-sans selection:bg-violet-200 selection:text-violet-900" id="zentro-global-root">
      
      {/* Dynamic Floating Particles Backdrop */}
      <FloatingParticles />

      {/* Tactile custom cursor tracking */}
      <CustomCursor />

      {/* Global AnimatePresence for transitions */}
      <AnimatePresence mode="wait">
        
        {/* 1. INITIAL SYSTEM BOOT LOADING SCREEN */}
        {loading ? (
          <motion.div 
            key="loading-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center p-4"
            id="zentro-loading-gate"
          >
            <div className="relative flex flex-col items-center gap-6 max-w-sm w-full text-center">
              
              {/* Logo block */}
              <div className="relative group select-none">
                <ZentroLogo size={64} className="hover:scale-105 transition-transform duration-500" />
              </div>

              {/* Branding name */}
              <div className="flex flex-col gap-1">
                <span className="text-slate-900 font-sans text-2xl font-bold tracking-[0.25em] uppercase">
                  ZENTRO
                </span>
                <span className="text-[10px] font-mono text-violet-600 tracking-widest font-semibold uppercase">
                  AI Technologies
                </span>
              </div>

              {/* Terminal progress messages */}
              <div className="w-full flex flex-col gap-2 mt-4 text-left bg-slate-50 p-4 rounded-xl border border-slate-200" id="boot-console">
                <div className="flex items-center gap-1.5 border-b border-slate-200 pb-2 mb-1">
                  <Terminal className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-[9px] font-mono text-slate-400">boot-sequence.sh</span>
                </div>
                <div className="text-[10px] font-mono text-slate-500 min-h-[16px] leading-relaxed">
                  {bootMessage}
                </div>
                {/* Horizontal loader track */}
                <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden mt-1 relative">
                  <div 
                    className="absolute h-full left-0 bg-violet-500 shadow-[0_0_8px_rgba(124,58,237,0.5)] transition-all duration-100"
                    style={{ width: `${loadPercent}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[8px] font-mono text-slate-400 mt-1">
                  <span>SSL SECURE LINK</span>
                  <span>{loadPercent}% COMPLETE</span>
                </div>
              </div>

            </div>
          </motion.div>
        ) : (
          /* 2. THE MAIN FULLY-INTERACTIVE APPLICATION INTERFACE */
          <motion.div 
            key="app-shell"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col min-h-screen relative z-10"
            id="zentro-shell-container"
          >
            {/* Top glassmorphic backdrop Navigation bar */}
            <Navbar activeView={activeView} setActiveView={setActiveView} toggleDarkMode={toggleDarkMode} darkMode={darkMode} />

            {/* Main view router wrapper with animation hooks */}
            <main className="flex-grow">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeView}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="w-full"
                >
                  {activeView === 'home' && (
                    <HomeView 
                      setActiveView={setActiveView} 
                      setSelectedProject={setSelectedProject} 
                    />
                  )}
                  {activeView === 'services' && (
                    <ServicesView />
                  )}
                  {activeView === 'portfolio' && (
                    <PortfolioView 
                      selectedProject={selectedProject} 
                      setSelectedProject={setSelectedProject} 
                    />
                  )}
                  {activeView === 'about' && (
                    <AboutView />
                  )}
                  {activeView === 'contact' && (
                    <ContactView setActiveView={setActiveView} />
                  )}
                </motion.div>
              </AnimatePresence>
            </main>

            {/* Shared bottom corporate footer bar */}
            <Footer setActiveView={setActiveView} />

          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
