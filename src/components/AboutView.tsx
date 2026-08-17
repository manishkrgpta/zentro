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
  r: number;
  angle: number;
  status: 'adopt' | 'trial' | 'assess';
  desc: string;
}

export default function AboutView() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hoveredNode, setHoveredNode] = useState<RadarNode | null>(null);

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

    let width = 400, height = 400, centerX = 200, centerY = 200, maxRadius = 180;
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

    let mouseX = -1000, mouseY = -1000;
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    const onMouseLeave = () => { mouseX = -1000; mouseY = -1000; setHoveredNode(null); };
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);

    const drawRadar = () => {
      ctx.clearRect(0, 0, width, height);
      const ringRatios = [0.35, 0.65, 1.0];
      const ringLabels = ['ADOPT', 'TRIAL', 'ASSESS'];
      ringRatios.forEach((ratio, idx) => {
        const r = maxRadius * ratio;
        ctx.strokeStyle = idx === 0 ? 'rgba(139, 92, 246, 0.25)' : idx === 1 ? 'rgba(168, 85, 247, 0.15)' : 'rgba(192, 132, 252, 0.1)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.font = '500 8px "JetBrains Mono", monospace';
        ctx.fillStyle = 'rgba(100, 100, 120, 0.4)';
        ctx.textAlign = 'center';
        ctx.fillText(ringLabels[idx], centerX, centerY - r + 10);
      });

      const sliceAngle = (2 * Math.PI) / categories.length;
      categories.forEach((cat, idx) => {
        const angle = idx * sliceAngle;
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.06)';
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + Math.cos(angle) * maxRadius, centerY + Math.sin(angle) * maxRadius);
        ctx.stroke();
        const labelRadius = maxRadius + 16;
        const lx = centerX + Math.cos(angle + sliceAngle / 2) * labelRadius;
        const ly = centerY + Math.sin(angle + sliceAngle / 2) * labelRadius;
        ctx.font = 'bold 9px "JetBrains Mono", monospace';
        ctx.fillStyle = 'rgba(70, 70, 90, 0.7)';
        ctx.textAlign = Math.cos(angle + sliceAngle/2) > 0.1 ? 'left' : Math.cos(angle + sliceAngle/2) < -0.1 ? 'right' : 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(cat, lx, ly);
      });

      let currentHovered: RadarNode | null = null;
      const minDistance = 8;
      nodes.forEach(node => {
        const categoryIdx = categories.indexOf(node.category);
        const sectorBaseAngle = categoryIdx * sliceAngle;
        const nodeAngleRad = sectorBaseAngle + (node.angle % 60) * (sliceAngle / 60);
        const nodeRadius = node.r * maxRadius;
        const nx = centerX + Math.cos(nodeAngleRad) * nodeRadius;
        const ny = centerY + Math.sin(nodeAngleRad) * nodeRadius;

        if (Math.sqrt((nx - mouseX) ** 2 + (ny - mouseY) ** 2) < minDistance) currentHovered = node;

        const isNodeHovered = hoveredNode?.name === node.name;
        let color = '#7c3aed';
        if (node.status === 'trial') color = '#a855f7';
        if (node.status === 'assess') color = '#c084fc';

        if (isNodeHovered) {
          ctx.fillStyle = `${color}30`;
          ctx.beginPath(); ctx.arc(nx, ny, 8, 0, Math.PI * 2); ctx.fill();
        }
        ctx.fillStyle = color;
        ctx.beginPath(); ctx.arc(nx, ny, isNodeHovered ? 4.5 : 3, 0, Math.PI * 2); ctx.fill();
        ctx.font = '500 8px "Inter", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = isNodeHovered ? '#1e293b' : 'rgba(70, 70, 90, 0.5)';
        ctx.fillText(node.name, nx, ny - 7);
      });
      if (currentHovered !== hoveredNode) setHoveredNode(currentHovered);
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
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-violet-200/30 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-fuchsia-200/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="text-left mb-16 max-w-4xl border-b border-slate-200 pb-10 flex flex-col gap-3">
          <span className="immersive-tag-mono">// CORPORATE IDENTITY</span>
          <h1 className="text-4xl sm:text-5xl font-sans font-extrabold text-slate-900 tracking-tight mt-2">The Team & The Tech Stack</h1>
          <p className="text-slate-500 text-sm sm:text-base font-sans leading-relaxed mt-2">
            Zentro operates as an elite team of researchers, backend specialists, and frontend creators.
          </p>
        </div>

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24 items-center">
          <div className="lg:col-span-6 text-left flex flex-col gap-6" id="about-mission-block">
            <div className="flex items-center gap-2 text-violet-700 font-mono text-xs font-semibold uppercase">
              <Target className="w-4 h-4" />
              <span>Core Mission & Objective</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-sans font-bold text-slate-900 leading-tight">
              Building Intelligent Software <br />for the Future.
            </h2>
            <p className="text-slate-500 text-sm font-sans leading-relaxed">
              Our engineering philosophy is rooted in architectural honesty. We reject cookie-cutter templates, sluggish backend containers, and unoptimized prompt wrappers.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2" id="about-values-list">
              {[
                { title: 'AI-First Core', desc: 'Direct neural modeling integration in every asset layer.' },
                { title: 'SOC2 Security', desc: 'Granular log histories and partitioned database layers.' },
                { title: 'Speed Optimization', desc: 'Lightweight, lightning-fast rendering states under 12ms.' },
                { title: 'Elite Talent', desc: 'Founders and developers with extensive corporate track records.' }
              ].map((val, idx) => (
                <div key={idx} className="bg-white border border-slate-200 p-4 rounded-xl text-left">
                  <h4 className="text-slate-700 text-xs font-bold flex items-center gap-2 font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5 text-violet-500" />
                    {val.title}
                  </h4>
                  <p className="text-slate-400 text-[11px] font-sans mt-1 leading-normal">{val.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-sm flex flex-col items-center">
            <div className="text-center mb-4">
              <span className="text-[10px] font-mono text-violet-600 uppercase font-bold tracking-wider">Interactive Dial Radar</span>
              <h3 className="text-slate-900 text-lg font-sans font-bold mt-0.5">Zentro Tech Radar</h3>
              <p className="text-[10px] text-slate-400 font-mono mt-0.5">Hover nodes to analyze architectural parameters</p>
            </div>
            <div ref={containerRef} className="w-full max-w-[360px] aspect-square flex items-center justify-center relative">
              <canvas ref={canvasRef} className="block pointer-events-auto" id="tech-radar-canvas" />
            </div>
            <div className="w-full bg-white border border-slate-200 p-3.5 rounded-xl mt-4 h-20 text-left" id="radar-details-box">
              {hoveredNode ? (
                <div className="animate-fade-in text-[10px] font-mono text-slate-500">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-1">
                    <span className="text-slate-900 font-bold uppercase">{hoveredNode.name}</span>
                    <span className={`font-bold ${hoveredNode.status === 'adopt' ? 'text-emerald-600' : hoveredNode.status === 'trial' ? 'text-fuchsia-600' : 'text-violet-600'}`}>
                      STATUS: {hoveredNode.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-slate-500 leading-relaxed mt-1 text-[11px] font-sans">{hoveredNode.desc}</p>
                </div>
              ) : (
                <div className="text-slate-400 font-mono text-[10px] italic flex items-center justify-center h-full">
                  Hover over any node on the circular radar grid to inspect tech details.
                </div>
              )}
            </div>
          </div>
        </section>

        <section id="about-team-section">
          <div className="text-left mb-12 flex flex-col gap-1 border-b border-slate-200 pb-6">
            <div className="flex items-center gap-2 text-violet-700 font-mono text-xs font-semibold uppercase">
              <Users className="w-4 h-4" />
              <span>The Zentro Founders</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-sans font-bold text-slate-900 tracking-tight">Elite Engineering Profiles</h2>
            <p className="text-slate-500 font-sans text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">We operate as a flat, highly collaborative team.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" id="team-members-grid">
            {teamMembersData.map((member, idx) => (
              <div key={idx} className="bg-white border border-slate-200 hover:border-violet-300 p-5 rounded-2xl text-left flex flex-col gap-4 transition-all duration-300 hover:shadow-md hover:-translate-y-1 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[120px] h-[120px] bg-violet-100/50 rounded-full blur-2xl pointer-events-none" />
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-violet-500 via-purple-500 to-fuchsia-500 flex items-center justify-center font-bold text-white text-base shadow-sm">
                  {member.name.charAt(0)}{member.name.split(' ')[1]?.charAt(0) || ''}
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-slate-900 text-sm font-bold font-sans leading-none">{member.name}</h3>
                  <span className="text-[10px] text-violet-700 font-mono mt-1 font-semibold uppercase tracking-wider">{member.role}</span>
                </div>
                <p className="text-slate-500 text-xs font-sans leading-relaxed">{member.bio}</p>
                <div className="flex flex-wrap gap-1 mt-auto pt-3 border-t border-slate-100">
                  {member.specialties.map((spec, i) => (
                    <span key={i} className="bg-violet-50 border border-violet-200 px-2 py-0.5 rounded text-[9px] font-mono text-slate-600">{spec}</span>
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