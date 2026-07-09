/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Linkedin, Github, Twitter, Youtube, Send, CheckCircle2, Sparkles } from 'lucide-react';
import ZentroLogo from './ZentroLogo';

interface FooterProps {
  setActiveView: (view: string) => void;
}

export default function Footer({ setActiveView }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please provide a valid email.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Invalid email address format.');
      return;
    }
    setError('');
    setSubscribed(true);
    setEmail('');
    setTimeout(() => {
      setSubscribed(false);
    }, 5000);
  };

  const handleNavClick = (viewId: string) => {
    setActiveView(viewId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      className="relative bg-[#040612] border-t border-slate-900/80 pt-20 pb-12 overflow-hidden"
      id="zentro-main-footer"
    >
      {/* Background glow effects */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-12 left-12 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Logo, tagline, and socials */}
          <div className="col-span-12 md:col-span-4 flex flex-col gap-5">
            <div 
              className="flex items-center gap-3 cursor-pointer group w-fit"
              onClick={() => handleNavClick('home')}
              id="footer-logo-container"
            >
              <div className="relative flex items-center justify-center transition-all duration-300 group-hover:scale-105">
                <ZentroLogo size={32} />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-sans text-lg font-bold tracking-widest uppercase">
                  ZENTRO
                </span>
                <span className="text-[8px] font-mono text-cyan-400 tracking-wider font-semibold -mt-1 uppercase">
                  AI Tech Co.
                </span>
              </div>
            </div>
            <p className="text-slate-400 text-sm font-sans leading-relaxed max-w-sm">
              Zentro designs and develops modern websites, SaaS platforms, custom AI automation workflows, and high-performance mobile apps to accelerate enterprise growth.
            </p>
            {/* Social media links */}
            <div className="flex items-center gap-3 mt-2" id="footer-socials-container">
              {[
                { icon: <Linkedin className="w-4 h-4" />, url: 'https://linkedin.com', label: 'LinkedIn' },
                { icon: <Github className="w-4 h-4" />, url: 'https://github.com', label: 'GitHub' },
                { icon: <Twitter className="w-4 h-4" />, url: 'https://x.com', label: 'X / Twitter' },
                { icon: <Youtube className="w-4 h-4" />, url: 'https://youtube.com', label: 'YouTube' }
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-950 border border-slate-900 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-[0_0_10px_rgba(34,211,238,0.15)] cursor-pointer"
                  aria-label={social.label}
                  id={`footer-social-${idx}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav Links Column 1: Navigation */}
          <div className="col-span-6 md:col-span-2 flex flex-col gap-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
              Core Links
            </h3>
            <div className="flex flex-col gap-2.5">
              {[
                { id: 'home', label: 'Home' },
                { id: 'services', label: 'Services' },
                { id: 'portfolio', label: 'Prices' },
                { id: 'about', label: 'About Us' },
                { id: 'contact', label: 'Get in Touch' }
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className="text-slate-400 hover:text-white text-sm font-sans text-left transition-colors duration-200 cursor-pointer"
                  id={`footer-nav-${link.id}`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Nav Links Column 2: Specialties */}
          <div className="col-span-6 md:col-span-2 flex flex-col gap-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
              Specialties
            </h3>
            <div className="flex flex-col gap-2.5 text-slate-400 text-sm font-sans">
              <span className="hover:text-cyan-400 transition-colors cursor-pointer" onClick={() => handleNavClick('services')}>AI Agents</span>
              <span className="hover:text-cyan-400 transition-colors cursor-pointer" onClick={() => handleNavClick('services')}>Custom Web Apps</span>
              <span className="hover:text-cyan-400 transition-colors cursor-pointer" onClick={() => handleNavClick('services')}>SaaS Portals</span>
              <span className="hover:text-cyan-400 transition-colors cursor-pointer" onClick={() => handleNavClick('services')}>iOS & Android</span>
              <span className="hover:text-cyan-400 transition-colors cursor-pointer" onClick={() => handleNavClick('services')}>Bento Dashboards</span>
            </div>
          </div>

          {/* Newsletter section */}
          <div className="col-span-12 md:col-span-4 flex flex-col gap-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
              Zentro Intelligence Newsletter
            </h3>
            <p className="text-slate-400 text-sm font-sans leading-relaxed">
              Subscribe to get modern articles on AI capabilities, SaaS architectures, and digital design guides.
            </p>
            <form onSubmit={handleSubscribe} className="relative mt-2" id="footer-newsletter-form">
              <input
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                disabled={subscribed}
                className="w-full bg-slate-950 border border-slate-900 rounded-xl px-4 py-3 text-sm font-sans text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/20 disabled:opacity-50"
                id="footer-email-input"
              />
              <button
                type="submit"
                disabled={subscribed}
                className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-blue-600 hover:bg-cyan-500 rounded-lg text-white transition-all duration-300 flex items-center justify-center hover:shadow-[0_0_10px_rgba(34,211,238,0.3)] cursor-pointer disabled:bg-emerald-600"
                aria-label="Subscribe"
                id="footer-email-submit"
              >
                {subscribed ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </form>
            {error && (
              <span className="text-red-400 text-xs font-mono" id="newsletter-error">{error}</span>
            )}
            {subscribed && (
              <span className="text-emerald-400 text-xs font-mono flex items-center gap-1.5 animate-bounce mt-1" id="newsletter-success">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Subscribed successfully! Welcome to the loop.
              </span>
            )}
          </div>
        </div>

        {/* Legal bar and credit */}
        <div className="border-t border-slate-900/60 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div id="footer-copyright">
            © {new Date().getFullYear()} Zentro Technologies, Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6" id="footer-legal-links">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-300 cursor-pointer">Security Portal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
