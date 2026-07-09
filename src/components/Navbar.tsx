/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Menu, X, Sparkles, Terminal } from 'lucide-react';
import ZentroLogo from './ZentroLogo';

interface NavbarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

export default function Navbar({ activeView, setActiveView }: NavbarProps) {
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
    // Scroll smoothly to top when switching views
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav 
      className="fixed top-0 left-0 w-full z-40 bg-[#050816]/75 backdrop-blur-xl border-b border-blue-500/10 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
      id="zentro-main-navbar"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Brand section */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => handleNavClick('home')}
            id="navbar-logo-container"
          >
            <div className="relative flex items-center justify-center transition-all duration-300 group-hover:scale-105">
              <ZentroLogo size={38} />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-sans text-xl font-bold tracking-widest uppercase bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-300">
                ZENTRO
              </span>
              <span className="text-[9px] font-mono text-cyan-400 tracking-wider font-semibold -mt-1 uppercase">
                AI Tech Co.
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8" id="navbar-desktop-menu">
            {navItems.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-2 text-sm font-sans tracking-wide font-medium transition-all duration-300 cursor-pointer ${
                    isActive 
                      ? 'text-cyan-400 font-semibold' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                  id={`nav-item-${item.id}`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full shadow-[0_1px_8px_rgba(34,211,238,0.6)] animate-fade-in" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Consultation Button */}
          <div className="hidden md:block" id="navbar-cta-container">
            <button
              onClick={() => handleNavClick('contact')}
              className="px-5 py-2.5 rounded-full text-xs font-sans font-bold uppercase tracking-wider text-[#050816] bg-white hover:bg-slate-100 transition-all duration-300 shadow-[0_4px_15px_rgba(255,255,255,0.1)] active:scale-95 flex items-center gap-2 cursor-pointer"
              id="navbar-cta-button"
            >
              <Terminal className="w-3.5 h-3.5 text-[#050816]" />
              Book Consultation
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden" id="navbar-mobile-toggle-container">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900/50 border border-slate-800 focus:outline-none"
              id="navbar-mobile-toggle-button"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer (Slide down) */}
      {isOpen && (
        <div 
          className="md:hidden border-t border-slate-900 bg-[#050816]/95 backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] animate-fade-in"
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
                      ? 'bg-blue-600/10 text-cyan-400 border border-blue-500/20' 
                      : 'text-slate-300 hover:bg-slate-900/50'
                  }`}
                  id={`mobile-nav-item-${item.id}`}
                >
                  {item.label}
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />}
                </button>
              );
            })}
            <div className="pt-4 border-t border-slate-900">
              <button
                onClick={() => handleNavClick('contact')}
                className="w-full py-3.5 rounded-full text-center text-sm font-sans font-bold uppercase tracking-widest text-[#050816] bg-white hover:bg-slate-100 shadow-[0_4px_15px_rgba(255,255,255,0.1)] transition-all duration-300 flex items-center justify-center gap-2"
                id="mobile-navbar-cta"
              >
                <Terminal className="w-4 h-4 text-[#050816]" />
                Book Consultation
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
