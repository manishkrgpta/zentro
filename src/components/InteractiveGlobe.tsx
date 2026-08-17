/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';

interface Point3D { x: number; y: number; z: number; baseX: number; baseY: number; baseZ: number; color: string; size: number; }
interface CityPin { name: string; lat: number; lng: number; x: number; y: number; z: number; screenX: number; screenY: number; visible: boolean; }

export default function InteractiveGlobe() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const rotationX = useRef(0.2);
  const rotationY = useRef(0);
  const targetRotationX = useRef(0.2);
  const targetRotationY = useRef(0);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const autoRotateSpeed = useRef(0.003);

  const cities: CityPin[] = [
    { name: 'San Francisco', lat: 37.7749, lng: -122.4194, x: 0, y: 0, z: 0, screenX: 0, screenY: 0, visible: false },
    { name: 'London', lat: 51.5074, lng: -0.1278, x: 0, y: 0, z: 0, screenX: 0, screenY: 0, visible: false },
    { name: 'Tokyo', lat: 35.6762, lng: 139.6503, x: 0, y: 0, z: 0, screenX: 0, screenY: 0, visible: false },
    { name: 'Singapore', lat: 1.3521, lng: 103.8198, x: 0, y: 0, z: 0, screenX: 0, screenY: 0, visible: false },
    { name: 'Berlin', lat: 52.5200, lng: 13.4050, x: 0, y: 0, z: 0, screenX: 0, screenY: 0, visible: false },
    { name: 'Sydney', lat: -33.8688, lng: 151.2093, x: 0, y: 0, z: 0, screenX: 0, screenY: 0, visible: false },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 450, height = 450, radius = 170;

    const resizeCanvas = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      width = rect?.width || 450;
      height = rect?.height || 450;
      radius = Math.min(width, height) * 0.40;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles: Point3D[] = [];
    const particleCount = 700;
    for (let i = 0; i < particleCount; i++) {
      const phi = Math.acos(1 - 2 * (i / particleCount));
      const theta = Math.sqrt(particleCount * Math.PI) * phi;
      const x = Math.sin(phi) * Math.cos(theta);
      const y = Math.cos(phi);
      const z = Math.sin(phi) * Math.sin(theta);
      let color = 'rgba(139, 92, 246, 0.4)';
      if (i % 3 === 1) color = 'rgba(168, 85, 247, 0.35)';
      if (i % 3 === 2) color = 'rgba(192, 132, 252, 0.35)';
      particles.push({ x: x * radius, y: y * radius, z: z * radius, baseX: x * radius, baseY: y * radius, baseZ: z * radius, color, size: Math.random() * 1.5 + 0.8 });
    }

    const latLngTo3D = (lat: number, lng: number) => {
      const latRad = (lat * Math.PI) / 180;
      const lngRad = (lng * Math.PI) / 180;
      return { x: radius * Math.cos(latRad) * Math.sin(lngRad), y: -radius * Math.sin(latRad), z: radius * Math.cos(latRad) * Math.cos(lngRad) };
    };
    cities.forEach(city => { const c = latLngTo3D(city.lat, city.lng); city.x = c.x; city.y = c.y; city.z = c.z; });

    const connections = [
      { from: cities[0], to: cities[2], progress: 0.0, speed: 0.007 },
      { from: cities[2], to: cities[3], progress: 0.2, speed: 0.009 },
      { from: cities[3], to: cities[5], progress: 0.4, speed: 0.006 },
      { from: cities[1], to: cities[0], progress: 0.6, speed: 0.005 },
      { from: cities[4], to: cities[1], progress: 0.1, speed: 0.012 },
      { from: cities[0], to: cities[4], progress: 0.8, speed: 0.008 }
    ];

    let mouseX = -1000, mouseY = -1000;
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left; mouseY = e.clientY - rect.top;
      if (isDragging) {
        const dx = e.clientX - lastMousePos.current.x;
        const dy = e.clientY - lastMousePos.current.y;
        targetRotationY.current += dx * 0.005;
        targetRotationX.current += dy * 0.005;
        targetRotationX.current = Math.max(-Math.PI/2.5, Math.min(Math.PI/2.5, targetRotationX.current));
        lastMousePos.current = { x: e.clientX, y: e.clientY };
      }
    };
    const onMouseDown = (e: MouseEvent) => { setIsDragging(true); autoRotateSpeed.current = 0; lastMousePos.current = { x: e.clientX, y: e.clientY }; };
    const onMouseUp = () => { setIsDragging(false); setTimeout(() => { if (!isDragging) autoRotateSpeed.current = 0.0015; }, 3000); };
    const onMouseLeave = () => { mouseX = -1000; mouseY = -1000; setIsDragging(false); };

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('mouseleave', onMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      rotationX.current += (targetRotationX.current - rotationX.current) * 0.1;
      rotationY.current += (targetRotationY.current - rotationY.current) * 0.1;
      if (!isDragging) targetRotationY.current += autoRotateSpeed.current;

      const cosX = Math.cos(rotationX.current), sinX = Math.sin(rotationX.current);
      const cosY = Math.cos(rotationY.current), sinY = Math.sin(rotationY.current);
      const centerX = width / 2, centerY = height / 2, fov = 400;

      const gradient = ctx.createRadialGradient(centerX, centerY, radius * 0.3, centerX, centerY, radius * 1.4);
      gradient.addColorStop(0, 'rgba(255,255,255,0)');
      gradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.03)');
      gradient.addColorStop(0.8, 'rgba(192, 132, 252, 0.04)');
      gradient.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gradient;
      ctx.beginPath(); ctx.arc(centerX, centerY, radius * 1.4, 0, Math.PI * 2); ctx.fill();

      const projected = particles.map(p => {
        let x1 = p.baseX * cosY - p.baseZ * sinY, z1 = p.baseX * sinY + p.baseZ * cosY;
        let y2 = p.baseY * cosX - z1 * sinX, z2 = p.baseY * sinX + z1 * cosX;
        const scale = fov / (fov + z2);
        return { sx: centerX + x1 * scale, sy: centerY + y2 * scale, z: z2, color: p.color, size: p.size * scale, visible: z2 < 60 };
      });
      projected.sort((a, b) => b.z - a.z);
      projected.forEach(p => {
        const alphaFactor = p.z > 0 ? Math.max(0.08, 1 - p.z / radius) : 1;
        ctx.fillStyle = p.color.replace('0.4', (0.4 * alphaFactor).toString()).replace('0.35', (0.35 * alphaFactor).toString());
        ctx.beginPath(); ctx.arc(p.sx, p.sy, p.size, 0, Math.PI * 2); ctx.fill();
      });

      let currentHoveredCity: string | null = null;
      const minDistance = 15;
      cities.forEach(city => {
        let x1 = city.x * cosY - city.z * sinY, z1 = city.x * sinY + city.z * cosY;
        let y2 = city.y * cosX - z1 * sinX, z2 = city.y * sinX + z1 * cosX;
        const scale = fov / (fov + z2);
        city.screenX = centerX + x1 * scale; city.screenY = centerY + y2 * scale; city.visible = z2 < 10;
        if (city.visible) {
          const dx = city.screenX - mouseX, dy = city.screenY - mouseY;
          if (Math.sqrt(dx*dx+dy*dy) < minDistance) currentHoveredCity = city.name;
        }
      });
      if (currentHoveredCity !== hoveredCity) setHoveredCity(currentHoveredCity);

      connections.forEach(conn => {
        const { from, to } = conn;
        conn.progress += conn.speed;
        if (conn.progress > 1) conn.progress = 0;
        if (from.visible && to.visible) {
          ctx.beginPath(); ctx.moveTo(from.screenX, from.screenY);
          const midX = (from.screenX + to.screenX) / 2, midY = (from.screenY + to.screenY) / 2;
          const dx = midX - centerX, dy = midY - centerY;
          const ctrlX = centerX + dx * 1.15, ctrlY = centerY + dy * 1.15;
          ctx.quadraticCurveTo(ctrlX, ctrlY, to.screenX, to.screenY);
          const grad = ctx.createLinearGradient(from.screenX, from.screenY, to.screenX, to.screenY);
          grad.addColorStop(0, 'rgba(139, 92, 246, 0.06)');
          grad.addColorStop(0.5, 'rgba(192, 132, 252, 0.15)');
          grad.addColorStop(1, 'rgba(168, 85, 247, 0.06)');
          ctx.strokeStyle = grad; ctx.lineWidth = 1.2; ctx.stroke();

          const t = conn.progress;
          const px = (1-t)*(1-t)*from.screenX + 2*(1-t)*t*ctrlX + t*t*to.screenX;
          const py = (1-t)*(1-t)*from.screenY + 2*(1-t)*t*ctrlY + t*t*to.screenY;
          const glow = ctx.createRadialGradient(px, py, 1, px, py, 6);
          glow.addColorStop(0, '#ffffff');
          glow.addColorStop(0.4, 'rgba(192, 132, 252, 0.9)');
          glow.addColorStop(1, 'rgba(192, 132, 252, 0)');
          ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(px, py, 6, 0, Math.PI * 2); ctx.fill();
        }
      });

      cities.forEach(city => {
        if (!city.visible) return;
        const isHovered = hoveredCity === city.name;
        const color = isHovered ? '#c084fc' : '#7c3aed';
        ctx.strokeStyle = isHovered ? 'rgba(192, 132, 252, 0.5)' : 'rgba(139, 92, 246, 0.3)';
        ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(city.screenX, city.screenY, isHovered ? 8 : 5, 0, Math.PI * 2); ctx.stroke();
        const pulseSize = (Math.sin(Date.now() * 0.006) + 1) * 1.5 + 2;
        ctx.fillStyle = color; ctx.beginPath(); ctx.arc(city.screenX, city.screenY, isHovered ? 3.5 : pulseSize, 0, Math.PI * 2); ctx.fill();
        ctx.font = '500 10px "JetBrains Mono", monospace';
        ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)'; ctx.lineWidth = 3;
        ctx.strokeText(city.name, city.screenX + 10, city.screenY);
        ctx.fillStyle = isHovered ? '#1e293b' : 'rgba(50, 50, 70, 0.7)';
        ctx.fillText(city.name, city.screenX + 10, city.screenY);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [hoveredCity, isDragging]);

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[350px] md:min-h-[450px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none" id="zentro-hero-globe-container">
      <canvas ref={canvasRef} className="block pointer-events-auto" id="zentro-interactive-globe-canvas" />
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-violet-200 flex items-center gap-2 text-[10px] font-mono text-slate-400">
        <span className="w-1.5 h-1.5 bg-violet-500 rounded-full animate-ping" id="globe-status-ping"></span>
        <span>Drag to rotate · Hover pins for routing</span>
      </div>
      {hoveredCity && (
        <div className="absolute top-4 right-4 bg-white/85 backdrop-blur-md px-4 py-2 rounded-xl border border-violet-200 text-[11px] font-mono text-slate-500 pointer-events-none animate-fade-in shadow-sm" id="globe-city-toast">
          <div className="text-violet-700 font-semibold uppercase tracking-wider">Active Edge Node</div>
          <div className="text-slate-900 text-xs font-bold mt-0.5">{hoveredCity}</div>
          <div className="text-[10px] text-slate-400 mt-1">Status: Operational (99.9% Up)</div>
        </div>
      )}
    </div>
  );
}