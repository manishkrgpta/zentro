/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Shield, Sparkles, CheckCircle2, ChevronRight, Users, Target, Rocket, Award, Cpu } from 'lucide-react';
import { teamMembersData } from '../data';

interface RadarNode {
  name: string;
  category: string;
  r: number; // 0 to 1 distance from center
  angle: number; // in degrees
  status: 'adopt' | 'trial' | 'assess';
  desc: string;
}

export default function AboutView() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hoveredNode, setHoveredNode] = useState<RadarNode | null>(null);

  // Radar categories and specific technologies
  const categories = ['Cognitive AI', 'Frontend UI/UX', 'Cloud Cluster', 'Backend Ops', 'Databases', 'SecOps'];
  
  const nodes: RadarNode[] = [
    { name: 'Gemini LLMs', category: 'Cognitive AI', r: 0.15, angle: 30, status: 'adopt', desc: 'Direct server-side integration via the modern Google Gen AI SDK.' },
    { name: 'RAG Engines', category: 'Cognitive AI', r: 0.25, angle: 45, status: 'adopt', desc: 'Semantic semantic search models with context cache parameters.' },
    { name: 'LangGraph', category: 'Cognitive AI', r: 0.65, angle: 15, status: 'assess', desc: 'Testing cyclic multi-agent workflow state machines.' },
    
    { name: 'React 19 & Vite', category: 'Frontend UI/UX', r: 0.20, angle: 95, status: 'adopt', desc: 'Standard compile frameworks using lightweight asset configurations.' },
    { name: 'Framer Motion', category: 'Frontend UI/UX', r: 0.35, angle: 105, status: 'adopt', desc: 'High-fidelity animations mapped to spring-physics transitions.' },
    { name: 'GSAP Canvas', category: 'Frontend UI/UX', r: 0.55, angle: 115, status: 'trial', desc: 'Complex visual renderers and gravity controllers.' },
    
    { name: 'Vercel CDN', category: 'Cloud Cluster', r: 0.25, angle: 145, status: 'adopt', desc: 'Automated global edge distribution with instant cache resets.' },
    { name: 'Docker Comp', category: 'Cloud Cluster', r: 0.35, angle: 155, status: 'adopt', desc: 'Containerized modular software stacks ready for orchestration.' },
    { name: 'Kubernetes', category: 'Cloud Cluster', r: 0.70, angle: 165, status: 'assess', desc: 'Dynamic auto-healing scale clusters for large enterprises.' },
    
    { name: 'FastAPI Ops', category: 'Backend Ops', r: 0.18, angle: 210, status: 'adopt', desc: 'Strictly typed python routes for high-speed AI gateways.' },
    { name: 'Node / NestJS', category: 'Backend Ops', r: 0.30, angle: 225, status: 'adopt', desc: 'Modular class architectures designed for robust RBAC middleware.' },
    { name: 'Go REST APIs', category: 'Backend Ops', r: 0.60, angle: 235, status: 'trial', desc: 'High concurrency pipelines engineered for microsecond latency.' },
    
    { name: 'PostgreSQL', category: 'Databases', r: 0.15, angle: 275, status: 'adopt', desc: 'Relational data cores utilizing transaction partitions.' },
    { name: 'Pinecone DB', category: 'Databases', r: 0.35, angle: 285, status: 'adopt', desc: 'High-density vector indexing storing semantic word embeds.' },
    { name: 'Redis Cache', category: 'Databases', r: 0.45, angle: 295, status: 'adopt', desc: 'Transient cache keys and state persistence layers.' },
    
    { name: 'SOC2 Security', category: 'SecOps', r: 0.20, angle: 325, status: 'adopt', desc: 'Granular log trails and data partition boundaries.' },
    { name: 'OAuth / JWT', category: 'SecOps', r: 0.35, angle: 335, status: 'adopt', desc: 'Cryptographically signed auth states safeguarding user endpoints.' },
    { name: 'SSL Telemetry', category: 'SecOps', r: 0.50, angle: 345, status: 'adopt', desc: 'Continuous audit networks tracking operational status.' },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 400;
    let height = 400;
    let centerX = 200;
    let centerY = 200;
    let maxRadius = 180;
    let animationFrameId: number;

    const resizeRadar = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      width = rect?.width || 400;
      height = rect?.height || 400;
      centerX = width / 2;
      centerY = height / 2;
      maxRadius = Math.min(width, height) * 0.42;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resizeRadar();
    window.addEventListener('resize', resizeRadar);

    let mouseX = -1000;
    let mouseY = -1000;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const onMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
      setHoveredNode(null);
    };

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);

    const drawRadar = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw polar radial rings (Adopt, Trial, Assess)
      const ringRatios = [0.35, 0.65, 1.0]; // divisions of maxRadius
      const ringLabels = ['ADOPT', 'TRIAL', 'ASSESS'];

      ringRatios.forEach((ratio, idx) => {
        const r = maxRadius * ratio;
        ctx.strokeStyle = idx === 0 ? 'rgba(59, 130, 246, 0.25)' : idx === 1 ? 'rgba(139, 92, 246, 0.15)' : 'rgba(34, 211, 238, 0.1)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.stroke();

        // Write small radial status headers
        ctx.font = '500 8px "JetBrains Mono", monospace';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.textAlign = 'center';
        ctx.fillText(ringLabels[idx], centerX, centerY - r + 10);
      });

      // 2. Draw category radial slice division lines
      const sliceAngle = (2 * Math.PI) / categories.length;
      categories.forEach((cat, idx) => {
        const angle = idx * sliceAngle;
        const targetX = centerX + Math.cos(angle) * maxRadius;
        const targetY = centerY + Math.sin(angle) * maxRadius;

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(targetX, targetY);
        ctx.stroke();

        // Label categories around perimeter
        const labelRadius = maxRadius + 16;
        const lx = centerX + Math.cos(angle + sliceAngle / 2) * labelRadius;
        const ly = centerY + Math.sin(angle + sliceAngle / 2) * labelRadius;

        ctx.font = 'bold 9px "JetBrains Mono", monospace';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        
        // Dynamic alignments depending on quadrants
        if (Math.cos(angle + sliceAngle/2) > 0.1) {
          ctx.textAlign = 'left';
        } else if (Math.cos(angle + sliceAngle/2) < -0.1) {
          ctx.textAlign = 'right';
        } else {
          ctx.textAlign = 'center';
        }
        ctx.textBaseline = 'middle';
        ctx.fillText(cat, lx, ly);
      });

      // 3. Draw active technology nodes
      let currentHovered: RadarNode | null = null;
      let minDistance = 8; // pixel trigger range

      nodes.forEach(node => {
        // Find which quadrant category we are in
        const categoryIdx = categories.indexOf(node.category);
        const sectorBaseAngle = categoryIdx * sliceAngle;
        
        // Calculate coordinate in polar math (r, theta)
        const nodeAngleRad = sectorBaseAngle + (node.angle % 60) * (sliceAngle / 60);
        const nodeRadius = node.r * maxRadius;

        const nx = centerX + Math.cos(nodeAngleRad) * nodeRadius;
        const ny = centerY + Math.sin(nodeAngleRad) * nodeRadius;

        // Proximity hover validation
        const dx = nx - mouseX;
        const dy = ny - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < minDistance) {
          currentHovered = node;
        }

        const isNodeHovered = hoveredNode?.name === node.name;
        
        // Node coloring based on status
        let color = '#3B82F6'; // blue (adopt)
        if (node.status === 'trial') color = '#8B5CF6'; // purple
        if (node.status === 'assess') color = '#22D3EE'; // cyan

        // Glowing backdrop
        if (isNodeHovered) {
          ctx.fillStyle = `${color}40`;
          ctx.beginPath();
          ctx.arc(nx, ny, 8, 0, Math.PI * 2);
          ctx.fill();
        }

        // Core node dot
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(nx, ny, isNodeHovered ? 4.5 : 3, 0, Math.PI * 2);
        ctx.fill();

        // Node micro name label text (faded unless hovered)
        ctx.font = '500 8px "Inter", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = isNodeHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.4)';
        ctx.fillText(node.name, nx, ny - 7);
      });

      if (currentHovered !== hoveredNode) {
        setHoveredNode(currentHovered);
      }

      animationFrameId = requestAnimationFrame(drawRadar);
    };

    drawRadar();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeRadar);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [hoveredNode]);

  return (
    <div className="relative w-full pt-28 pb-20" id="zentro-about-view-container">
      {/* Glow filters */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Header Title */}
        <div className="text-left mb-16 max-w-4xl border-b border-slate-900 pb-10 flex flex-col gap-3">
          <span className="immersive-tag-mono">// CORPORATE IDENTITY</span>
          <h1 className="text-4xl sm:text-5xl font-sans font-extrabold text-white tracking-tight mt-2 text-transparent bg-clip-text bg-gradient-to-b from-white to-[#94a3b8] leading-tight">
            The Team & The Tech Stack
          </h1>
          <p className="text-white/60 text-sm sm:text-base font-sans leading-relaxed mt-2">
            Zentro operates as an elite team of researchers, backend specialists, and frontend creators. We combine advanced systems modeling with deep aesthetic values to craft outstanding digital products.
          </p>
        </div>

        {/* 1. MISSION STATEMENT & INTERACTIVE TECH RADAR BENTO GRID */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24 items-center">
          
          {/* Left Column: Mission copy */}
          <div className="lg:col-span-6 text-left flex flex-col gap-6" id="about-mission-block">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold uppercase">
              <Target className="w-4 h-4" />
              <span>Core Mission & Objective</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-sans font-bold text-white leading-tight">
              Building Intelligent Software <br />for the Future.
            </h2>
            <p className="text-slate-400 text-sm font-sans leading-relaxed">
              Our engineering philosophy is rooted in architectural honesty. We reject cookie-cutter templates, sluggish backend containers, and unoptimized prompt wrappers. Instead, we compile custom, robust, and SOC2-ready software pipelines built for speed, security, and enterprise scale.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2" id="about-values-list">
              {[
                { title: 'AI-First Core', desc: 'Direct neural modeling integration in every asset layer.' },
                { title: 'SOC2 Security', desc: 'Granular log histories and partitioned database layers.' },
                { title: 'Speed Optimization', desc: 'Lightweight, lightning-fast rendering states under 12ms.' },
                { title: 'Elite Talent', desc: 'Founders and developers with extensive corporate track records.' }
              ].map((val, idx) => (
                <div key={idx} className="bg-white/[0.02] border border-white/[0.05] p-4 rounded-xl text-left">
                  <h4 className="text-white text-xs font-bold flex items-center gap-2 font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    {val.title}
                  </h4>
                  <p className="text-white/40 text-[11px] font-sans mt-1 leading-normal">{val.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Polar Radar Canvas */}
          <div className="lg:col-span-6 bg-gradient-to-b from-slate-950 to-[#040613] border border-blue-500/10 p-6 sm:p-8 rounded-3xl shadow-2xl relative overflow-hidden flex flex-col items-center">
            
            <div className="text-center mb-4">
              <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold tracking-wider">Interactive Dial Radar</span>
              <h3 className="text-white text-lg font-sans font-bold mt-0.5">Zentro Tech Radar</h3>
              <p className="text-[10px] text-slate-500 font-mono mt-0.5">Hover nodes to analyze architectural parameters</p>
            </div>

            <div ref={containerRef} className="w-full max-w-[360px] aspect-square flex items-center justify-center relative">
              <canvas ref={canvasRef} className="block pointer-events-auto" id="tech-radar-canvas" />
            </div>

            {/* Floating radar information display overlay */}
            <div className="w-full bg-[#0a0f29]/50 border border-slate-900 p-3.5 rounded-xl mt-4 h-20 text-left relative z-10" id="radar-details-box">
              {hoveredNode ? (
                <div className="animate-fade-in text-[10px] font-mono text-slate-300">
                  <div className="flex items-center justify-between border-b border-slate-900 pb-1">
                    <span className="text-white font-bold uppercase">{hoveredNode.name}</span>
                    <span className={`font-bold ${hoveredNode.status === 'adopt' ? 'text-emerald-400' : hoveredNode.status === 'trial' ? 'text-purple-400' : 'text-cyan-400'}`}>
                      STATUS: {hoveredNode.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-slate-400 leading-relaxed mt-1 text-[11px] font-sans">{hoveredNode.desc}</p>
                </div>
              ) : (
                <div className="text-slate-500 font-mono text-[10px] italic flex items-center justify-center h-full">
                  Hover over any node on the circular radar grid to inspect tech details.
                </div>
              )}
            </div>

          </div>

        </section>

        {/* 2. DETAILED TEAM MEMBERS BLOCK */}
        <section id="about-team-section">
          
          <div className="text-left mb-12 flex flex-col gap-1 border-b border-slate-900 pb-6">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold uppercase">
              <Users className="w-4 h-4" />
              <span>The Zentro Founders</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-sans font-bold text-white tracking-tight">
              Elite Engineering Profiles
            </h2>
            <p className="text-slate-400 font-sans text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              We operate as a flat, highly collaborative team. No middle management, no unnecessary delay buffers. Just pure, direct engineering competence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" id="team-members-grid">
            {teamMembersData.map((member, idx) => (
              <div 
                key={idx}
                className="bg-white/[0.03] border border-white/[0.05] hover:border-blue-500/20 p-5 rounded-2xl text-left flex flex-col gap-4 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 relative overflow-hidden"
                id={`team-card-${member.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {/* Backing accent glow */}
                <div className="absolute top-0 right-0 w-[120px] h-[120px] bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />

                {/* Team photo placeholder styled beautifully */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 via-purple-600 to-cyan-500 flex items-center justify-center font-bold text-white text-base shadow-lg">
                  {member.name.charAt(0)}{member.name.split(' ')[1]?.charAt(0) || ''}
                </div>

                <div className="flex flex-col gap-1">
                  <h3 className="text-white text-sm font-bold font-sans leading-none">{member.name}</h3>
                  <span className="text-[10px] text-cyan-400 font-mono mt-1 font-semibold uppercase tracking-wider">{member.role}</span>
                </div>

                <p className="text-slate-400 text-xs font-sans leading-relaxed">
                  {member.bio}
                </p>

                {/* Specialties list */}
                <div className="flex flex-wrap gap-1 mt-auto pt-3 border-t border-slate-900/60">
                  {member.specialties.map((spec, i) => (
                    <span 
                      key={i}
                      className="bg-[#0a0f29] border border-blue-500/10 px-2 py-0.5 rounded text-[9px] font-mono text-slate-300"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

              </div>
            ))}
          </div>

        </section>

      </div>
    </div>
  );
}
