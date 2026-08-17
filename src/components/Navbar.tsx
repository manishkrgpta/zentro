/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Menu, X, Sparkles, Terminal, Moon, Sun } from 'lucide-react';
import ZentroLogo from './ZentroLogo';

interface NavbarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  toggleDarkMode: () => void;
  darkMode: boolean;
}

export default function Navbar({ activeView, setActiveView, toggleDarkMode, darkMode }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Protofilo' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (viewId: string) => {
    setActiveView(viewId);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav 
      className="fixed top-0 left-0 w-full z-40 bg-white/80 backdrop-blur-xl border-b border-violet-200 shadow-sm"
      id="zentro-main-navbar"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => handleNavClick('home')}
            id="navbar-logo-container"
          >
            <div className="relative flex items-center justify-center transition-all duration-300 group-hover:scale-105">
              <ZentroLogo size={38} />
            </div>
            <div className="flex flex-col">
              <span className="text-slate-900 font-sans text-xl font-bold tracking-widest uppercase">
                ZENTRO
              </span>
              <span className="text-[9px] font-mono text-violet-600 tracking-wider font-semibold -mt-1 uppercase">
                AI Tech Co.
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8" id="navbar-desktop-menu">
            {navItems.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-2 text-sm font-sans tracking-wide font-medium transition-all duration-300 cursor-pointer ${
                    isActive 
                      ? 'text-violet-700 font-semibold' 
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                  id={`nav-item-${item.id}`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-violet-500 to-fuchsia-400 rounded-full shadow-[0_1px_4px_rgba(139,92,246,0.3)] animate-fade-in" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-3" id="navbar-cta-container">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 border border-slate-200 transition-all duration-300 focus:outline-none"
              id="navbar-theme-toggle"
              aria-label="Toggle dark mode"
              title={darkMode ? 'Light mode' : 'Dark mode'}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="px-5 py-2.5 rounded-full text-xs font-sans font-bold uppercase tracking-wider text-white bg-violet-600 hover:bg-violet-500 transition-all duration-300 shadow-[0_4px_10px_rgba(124,58,237,0.2)] active:scale-95 flex items-center gap-2 cursor-pointer"
              id="navbar-cta-button"
            >
              <Terminal className="w-3.5 h-3.5 text-white" />
              Book Consultation
            </button>
          </div>

          <div className="flex md:hidden items-center gap-2" id="navbar-mobile-toggle-container">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 border border-slate-200 transition-all duration-300 focus:outline-none"
              id="navbar-mobile-theme-toggle"
              aria-label="Toggle dark mode"
              title={darkMode ? 'Light mode' : 'Dark mode'}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 border border-slate-200 focus:outline-none"
              id="navbar-mobile-toggle-button"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div 
          className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-2xl shadow-xl animate-fade-in"
          id="navbar-mobile-drawer"
        >
          <div className="px-4 pt-4 pb-6 space-y-2">
            {navItems.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-base font-sans font-medium transition-all duration-200 flex items-center justify-between ${
                    isActive 
                      ? 'bg-violet-100 text-violet-700 border border-violet-200' 
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                  id={`mobile-nav-item-${item.id}`}
                >
                  {item.label}
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-violet-500 shadow-[0_0_8px_rgba(124,58,237,0.5)]" />}
                </button>
              );
            })}
            <div className="pt-4 border-t border-slate-200">
              <button
                onClick={() => handleNavClick('contact')}
                className="w-full py-3.5 rounded-full text-center text-sm font-sans font-bold uppercase tracking-widest text-white bg-violet-600 hover:bg-violet-500 shadow-[0_4px_10px_rgba(124,58,237,0.2)] transition-all duration-300 flex items-center justify-center gap-2"
                id="mobile-navbar-cta"
              >
                <Terminal className="w-4 h-4 text-white" />
                Book Consultation
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}