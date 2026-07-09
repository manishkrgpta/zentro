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
        {/* Core Z body gradient */}
        <linearGradient id="zentroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" /> {/* bright cyan */}
          <stop offset="50%" stopColor="#0284c7" /> {/* ocean blue */}
          <stop offset="100%" stopColor="#0f172a" /> {/* deep slate/navy */}
        </linearGradient>

        {/* Constellation line glow gradient */}
        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>

        {/* Glow filter for nodes */}
        <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Strong glow filter for terminal corner nodes */}
        <filter id="superGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 2 -0.1" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* 1. BACKGROUND GLOW SHADOW */}
      <circle 
        cx="50" 
        cy="50" 
        r="35" 
        fill="rgba(34, 211, 238, 0.15)" 
        filter="blur(10px)" 
      />

      {/* 2. THE CHISELED GEOMETRIC 'Z' SOLID BODY */}
      {/* 
        This is a symmetric 3D block-style Z letter:
        - Top edge: (32, 22) -> (78, 22)
        - Outer diagonal drops from top-right down-left to bottom-left: (78, 22) -> (22, 78)
        - Bottom edge: (22, 78) -> (68, 78)
        - Inside slant back up: (68, 78) -> (48, 56) -> (68, 56) -> (68, 44) -> (32, 44) -> (32, 22)
        Wait, let's use the ultra-clean symmetric geometric Z path:
      */}
      <path 
        d="M32 22 H78 L48 54 H78 V64 H32 L62 32 H32 V22 Z" 
        fill="url(#zentroGrad)" 
        stroke="rgba(34,211,238,0.25)"
        strokeWidth="1.5"
        strokeLinejoin="round"
        className="transition-all duration-300"
      />

      {/* 3. CONSTELLATION NETWORK LINES (CYBER-CONNECTIONS) */}
      <g opacity="0.85" stroke="url(#lineGrad)" strokeWidth="1" strokeLinecap="round">
        {/* Top-right terminal connections */}
        <line x1="78" y1="22" x2="42" y2="31" />
        <line x1="78" y1="22" x2="54" y2="31" />
        <line x1="78" y1="22" x2="64" y2="31" />

        {/* Top bar internal mesh */}
        <line x1="32" y1="22" x2="42" y2="31" />
        <line x1="42" y1="31" x2="54" y2="31" />
        <line x1="54" y1="31" x2="64" y2="31" />
        <line x1="42" y1="31" x2="48" y2="44" />
        <line x1="54" y1="31" x2="48" y2="44" />
        <line x1="64" y1="31" x2="48" y2="44" />

        {/* Diagonal bridge lines */}
        <line x1="48" y1="44" x2="51" y2="52" />
        <line x1="51" y1="52" x2="47" y2="65" />
        <line x1="51" y1="52" x2="60" y2="65" />

        {/* Bottom bar internal mesh */}
        <line x1="47" y1="65" x2="60" y2="65" />
        <line x1="32" y1="78" x2="47" y2="65" />
        <line x1="32" y1="78" x2="51" y2="52" />
        <line x1="32" y1="78" x2="60" y2="65" />
      </g>

      {/* 4. CONSTELLATION NODES (GLOWING INTERACTIVE PIN-POINTS) */}
      {/* Standard mesh nodes */}
      <circle cx="42" cy="31" r="2.5" fill="#38bdf8" filter="url(#neonGlow)" />
      <circle cx="54" cy="31" r="2.5" fill="#22d3ee" filter="url(#neonGlow)" />
      <circle cx="64" cy="31" r="2.5" fill="#38bdf8" filter="url(#neonGlow)" />
      
      <circle cx="48" cy="44" r="3" fill="#22d3ee" filter="url(#neonGlow)" />
      <circle cx="51" cy="52" r="3" fill="#06b6d4" filter="url(#neonGlow)" />
      
      <circle cx="47" cy="65" r="2.5" fill="#38bdf8" filter="url(#neonGlow)" />
      <circle cx="60" cy="65" r="2.5" fill="#22d3ee" filter="url(#neonGlow)" />

      {/* Primary extreme glow terminal nodes (Top-Right and Bottom-Left corners) */}
      <circle cx="78" cy="22" r="4.5" fill="#22d3ee" filter="url(#superGlow)" className="animate-pulse" />
      <circle cx="32" cy="78" r="4.5" fill="#2563eb" filter="url(#superGlow)" className="animate-pulse" />
    </svg>
  );
}
