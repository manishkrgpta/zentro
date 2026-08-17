/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface ZentroLogoProps {
  className?: string;
  size?: number;
}

export default function ZentroLogo({ className = '', size = 40 }: ZentroLogoProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`relative select-none ${className}`}
      id="zentro-custom-vector-logo"
    >
      <defs>
        <linearGradient id="zentroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="50%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#e0e7ff" />
        </linearGradient>
        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c084fc" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="superGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 2 -0.1" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <circle cx="50" cy="50" r="35" fill="rgba(168, 85, 247, 0.1)" filter="blur(10px)" />
      <path 
        d="M32 22 H78 L48 54 H78 V64 H32 L62 32 H32 V22 Z" 
        fill="url(#zentroGrad)" 
        stroke="rgba(168,85,247,0.3)"
        strokeWidth="1.5"
        strokeLinejoin="round"
        className="transition-all duration-300"
      />
      <g opacity="0.7" stroke="url(#lineGrad)" strokeWidth="1" strokeLinecap="round">
        <line x1="78" y1="22" x2="42" y2="31" />
        <line x1="78" y1="22" x2="54" y2="31" />
        <line x1="78" y1="22" x2="64" y2="31" />
        <line x1="32" y1="22" x2="42" y2="31" />
        <line x1="42" y1="31" x2="54" y2="31" />
        <line x1="54" y1="31" x2="64" y2="31" />
        <line x1="42" y1="31" x2="48" y2="44" />
        <line x1="54" y1="31" x2="48" y2="44" />
        <line x1="64" y1="31" x2="48" y2="44" />
        <line x1="48" y1="44" x2="51" y2="52" />
        <line x1="51" y1="52" x2="47" y2="65" />
        <line x1="51" y1="52" x2="60" y2="65" />
        <line x1="47" y1="65" x2="60" y2="65" />
        <line x1="32" y1="78" x2="47" y2="65" />
        <line x1="32" y1="78" x2="51" y2="52" />
        <line x1="32" y1="78" x2="60" y2="65" />
      </g>
      <circle cx="42" cy="31" r="2.5" fill="#c084fc" filter="url(#neonGlow)" />
      <circle cx="54" cy="31" r="2.5" fill="#a855f7" filter="url(#neonGlow)" />
      <circle cx="64" cy="31" r="2.5" fill="#c084fc" filter="url(#neonGlow)" />
      <circle cx="48" cy="44" r="3" fill="#a855f7" filter="url(#neonGlow)" />
      <circle cx="51" cy="52" r="3" fill="#8b5cf6" filter="url(#neonGlow)" />
      <circle cx="47" cy="65" r="2.5" fill="#c084fc" filter="url(#neonGlow)" />
      <circle cx="60" cy="65" r="2.5" fill="#a855f7" filter="url(#neonGlow)" />
      <circle cx="78" cy="22" r="4.5" fill="#a855f7" filter="url(#superGlow)" className="animate-pulse" />
      <circle cx="32" cy="78" r="4.5" fill="#7c3aed" filter="url(#superGlow)" className="animate-pulse" />
    </svg>
  );
}