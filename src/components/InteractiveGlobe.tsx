/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';

interface Point3D {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  color: string;
  size: number;
}

interface CityPin {
  name: string;
  lat: number;
  lng: number; // For mapping to 3D sphere
  x: number;
  y: number;
  z: number;
  screenX: number;
  screenY: number;
  visible: boolean;
}

export default function InteractiveGlobe() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Interaction States
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  // Rotation tracking
  const rotationX = useRef(0.2);
  const rotationY = useRef(0);
  const targetRotationX = useRef(0.2);
  const targetRotationY = useRef(0);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const autoRotateSpeed = useRef(0.003);

  // Sphere cities data
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
    let width = 450;
    let height = 450;
    let radius = 170;

    // Handle high density displays
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

    // Generate globe grid particles
    const particles: Point3D[] = [];
    const particleCount = 700;

    // Distribute particles evenly on sphere surface (Fibonacci Sphere Algorithm)
    for (let i = 0; i < particleCount; i++) {
      const phi = Math.acos(1 - 2 * (i / particleCount));
      const theta = Math.sqrt(particleCount * Math.PI) * phi;

      const x = Math.sin(phi) * Math.cos(theta);
      const y = Math.cos(phi);
      const z = Math.sin(phi) * Math.sin(theta);

      // Give alternating glowing blue/purple/cyan colors
      let color = 'rgba(59, 130, 246, 0.5)'; // electric blue
      if (i % 3 === 1) color = 'rgba(139, 92, 246, 0.45)'; // purple
      if (i % 3 === 2) color = 'rgba(34, 211, 238, 0.45)'; // cyan

      particles.push({
        x: x * radius,
        y: y * radius,
        z: z * radius,
        baseX: x * radius,
        baseY: y * radius,
        baseZ: z * radius,
        color,
        size: Math.random() * 1.5 + 0.8
      });
    }

    // Convert City lat/lng to 3D sphere coords
    const latLngTo3D = (lat: number, lng: number): { x: number; y: number; z: number } => {
      const latRad = (lat * Math.PI) / 180;
      const lngRad = (lng * Math.PI) / 180;

      // Adjust axis orientation for standard canvas viewing
      const x = radius * Math.cos(latRad) * Math.sin(lngRad);
      const y = -radius * Math.sin(latRad);
      const z = radius * Math.cos(latRad) * Math.cos(lngRad);

      return { x, y, z };
    };

    // Initialize city coordinates
    cities.forEach(city => {
      const coords = latLngTo3D(city.lat, city.lng);
      city.x = coords.x;
      city.y = coords.y;
      city.z = coords.z;
    });

    // Tracking active data packets traveling between cities
    interface Connection {
      from: CityPin;
      to: CityPin;
      progress: number;
      speed: number;
    }

    const connections: Connection[] = [
      { from: cities[0], to: cities[2], progress: 0.0, speed: 0.007 }, // SF -> Tokyo
      { from: cities[2], to: cities[3], progress: 0.2, speed: 0.009 }, // Tokyo -> Singapore
      { from: cities[3], to: cities[5], progress: 0.4, speed: 0.006 }, // Singapore -> Sydney
      { from: cities[1], to: cities[0], progress: 0.6, speed: 0.005 }, // London -> SF
      { from: cities[4], to: cities[1], progress: 0.1, speed: 0.012 }, // Berlin -> London
      { from: cities[0], to: cities[4], progress: 0.8, speed: 0.008 }  // SF -> Berlin
    ];

    // Tracking mouse position for hover checks
    let mouseX = -1000;
    let mouseY = -1000;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;

      if (isDragging) {
        const deltaX = e.clientX - lastMousePos.current.x;
        const deltaY = e.clientY - lastMousePos.current.y;

        targetRotationY.current += deltaX * 0.005;
        targetRotationX.current += deltaY * 0.005;

        // Clamp vertical rotation to avoid flipping upside down
        targetRotationX.current = Math.max(-Math.PI/2.5, Math.min(Math.PI/2.5, targetRotationX.current));

        lastMousePos.current = { x: e.clientX, y: e.clientY };
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      autoRotateSpeed.current = 0; // stop auto rotate on drag
      lastMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      setIsDragging(false);
      // Resume slow rotation after a brief delay
      setTimeout(() => {
        if (!isDragging) autoRotateSpeed.current = 0.0015;
      }, 3000);
    };

    const onMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
      setIsDragging(false);
    };

    // Setup events
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('mouseleave', onMouseLeave);

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth rotation dampening
      rotationX.current += (targetRotationX.current - rotationX.current) * 0.1;
      rotationY.current += (targetRotationY.current - rotationY.current) * 0.1;

      // Apply auto-rotation
      if (!isDragging) {
        targetRotationY.current += autoRotateSpeed.current;
      }

      const cosX = Math.cos(rotationX.current);
      const sinX = Math.sin(rotationX.current);
      const cosY = Math.cos(rotationY.current);
      const sinY = Math.sin(rotationY.current);

      const centerX = width / 2;
      const centerY = height / 2;

      // Projection factor (depth)
      const fov = 400;

      // Draw subtle backing glowing orb aura
      const radialGradient = ctx.createRadialGradient(centerX, centerY, radius * 0.3, centerX, centerY, radius * 1.4);
      radialGradient.addColorStop(0, 'rgba(15, 23, 42, 0.0)');
      radialGradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.03)');
      radialGradient.addColorStop(0.8, 'rgba(139, 92, 246, 0.05)');
      radialGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = radialGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.4, 0, Math.PI * 2);
      ctx.fill();

      // Transform and Project particles
      const projectedParticles = particles.map(p => {
        // Rotate Y
        let x1 = p.baseX * cosY - p.baseZ * sinY;
        let z1 = p.baseX * sinY + p.baseZ * cosY;

        // Rotate X
        let y2 = p.baseY * cosX - z1 * sinX;
        let z2 = p.baseY * sinX + z1 * cosX;

        // Project
        const scale = fov / (fov + z2);
        const sx = centerX + x1 * scale;
        const sy = centerY + y2 * scale;

        return {
          sx,
          sy,
          z: z2,
          color: p.color,
          size: p.size * scale,
          visible: z2 < 60 // Fade back-facing particles more
        };
      });

      // Sort by depth (z-index) so back-facing particles render first
      projectedParticles.sort((a, b) => b.z - a.z);

      // Draw particles
      projectedParticles.forEach(p => {
        // Back-facing elements are fainter
        const alphaFactor = p.z > 0 ? Math.max(0.08, 1 - p.z / radius) : 1;
        ctx.fillStyle = p.color.replace('0.5', (0.5 * alphaFactor).toString())
                               .replace('0.45', (0.45 * alphaFactor).toString());
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Transform and project cities
      let currentHoveredCity: string | null = null;
      let minDistance = 15; // hover trigger distance in px

      cities.forEach(city => {
        // Rotate Y
        let x1 = city.x * cosY - city.z * sinY;
        let z1 = city.x * sinY + city.z * cosY;

        // Rotate X
        let y2 = city.y * cosX - z1 * sinX;
        let z2 = city.y * sinX + z1 * cosX;

        // Project
        const scale = fov / (fov + z2);
        city.screenX = centerX + x1 * scale;
        city.screenY = centerY + y2 * scale;
        city.visible = z2 < 10; // True if city is on the front facing side

        if (city.visible) {
          // Check hover proximity
          const dx = city.screenX - mouseX;
          const dy = city.screenY - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < minDistance) {
            currentHoveredCity = city.name;
          }
        }
      });

      if (currentHoveredCity !== hoveredCity) {
        setHoveredCity(currentHoveredCity);
      }

      // Draw connection lines between cities (only if both are somewhat visible or on front)
      connections.forEach(conn => {
        const { from, to } = conn;
        
        // Progress the data packet
        conn.progress += conn.speed;
        if (conn.progress > 1) {
          conn.progress = 0;
        }

        // Draw bezier arc connection if both are visible
        if (from.visible && to.visible) {
          ctx.beginPath();
          ctx.moveTo(from.screenX, from.screenY);
          
          // Midpoint calculated for arc elevation
          const midX = (from.screenX + to.screenX) / 2;
          const midY = (from.screenY + to.screenY) / 2;
          
          // Elevate arc outwards from center of the globe
          const dx = midX - centerX;
          const dy = midY - centerY;
          const arcElevation = 1.15; // Factor to elevate connections off surface
          const ctrlX = centerX + dx * arcElevation;
          const ctrlY = centerY + dy * arcElevation;

          ctx.quadraticCurveTo(ctrlX, ctrlY, to.screenX, to.screenY);
          
          // Gradient stroke for connection lines
          const lineGrad = ctx.createLinearGradient(from.screenX, from.screenY, to.screenX, to.screenY);
          lineGrad.addColorStop(0, 'rgba(59, 130, 246, 0.05)');
          lineGrad.addColorStop(0.5, 'rgba(34, 211, 238, 0.25)');
          lineGrad.addColorStop(1, 'rgba(139, 92, 246, 0.05)');

          ctx.strokeStyle = lineGrad;
          ctx.lineWidth = 1.2;
          ctx.stroke();

          // Draw the running packet (light pulse)
          // We can estimate the coordinates of the bezier curve at "conn.progress"
          const t = conn.progress;
          const px = (1-t)*(1-t)*from.screenX + 2*(1-t)*t*ctrlX + t*t*to.screenX;
          const py = (1-t)*(1-t)*from.screenY + 2*(1-t)*t*ctrlY + t*t*to.screenY;

          // Glowing packet
          const glowGrad = ctx.createRadialGradient(px, py, 1, px, py, 6);
          glowGrad.addColorStop(0, '#ffffff');
          glowGrad.addColorStop(0.4, 'rgba(34, 211, 238, 1)');
          glowGrad.addColorStop(1, 'rgba(34, 211, 238, 0)');
          
          ctx.fillStyle = glowGrad;
          ctx.beginPath();
          ctx.arc(px, py, 6, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Draw city pins and labels
      cities.forEach(city => {
        if (!city.visible) return;

        const isHovered = hoveredCity === city.name;
        const color = isHovered ? '#22D3EE' : '#3B82F6';
        
        // Base glowing ring
        ctx.strokeStyle = isHovered ? 'rgba(34, 211, 238, 0.6)' : 'rgba(59, 130, 246, 0.4)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(city.screenX, city.screenY, isHovered ? 8 : 5, 0, Math.PI * 2);
        ctx.stroke();

        // Pulsing core
        const pulseSize = (Math.sin(Date.now() * 0.006) + 1) * 1.5 + 2;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(city.screenX, city.screenY, isHovered ? 3.5 : pulseSize, 0, Math.PI * 2);
        ctx.fill();

        // Draw elegant label
        ctx.font = '500 10px "JetBrains Mono", monospace';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        
        // Draw backing outline for contrast
        ctx.strokeStyle = 'rgba(5, 8, 22, 0.85)';
        ctx.lineWidth = 3;
        ctx.strokeText(city.name, city.screenX + 10, city.screenY);

        ctx.fillStyle = isHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.7)';
        ctx.fillText(city.name, city.screenX + 10, city.screenY);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Cleanups
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
    <div 
      ref={containerRef} 
      className="relative w-full h-full min-h-[350px] md:min-h-[450px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
      id="zentro-hero-globe-container"
    >
      <canvas ref={canvasRef} className="block pointer-events-auto" id="zentro-interactive-globe-canvas" />

      {/* Embedded Ambient Stats Info Overlay */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-[#0a0f29]/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-blue-500/10 flex items-center gap-2 text-[10px] font-mono text-slate-400">
        <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping" id="globe-status-ping"></span>
        <span>Drag to rotate · Hover pins for routing</span>
      </div>

      {hoveredCity && (
        <div 
          className="absolute top-4 right-4 bg-slate-950/85 backdrop-blur-md px-4 py-2 rounded-xl border border-cyan-500/30 text-[11px] font-mono text-slate-300 pointer-events-none animate-fade-in shadow-[0_0_15px_rgba(34,211,238,0.1)]"
          id="globe-city-toast"
        >
          <div className="text-cyan-400 font-semibold uppercase tracking-wider">Active Edge Node</div>
          <div className="text-white text-xs font-bold mt-0.5">{hoveredCity}</div>
          <div className="text-[10px] text-slate-400 mt-1">Status: Operational (99.9% Up)</div>
        </div>
      )}
    </div>
  );
}
