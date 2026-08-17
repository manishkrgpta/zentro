/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement | null>(null);
  const cursorRingRef = useRef<HTMLDivElement | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkTouch = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsMobile(hasTouch);
      setIsVisible(!hasTouch);
    };

    checkTouch();

    if (isMobile) return;

    const mousePos = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100 };

    const onMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
      if (!isVisible) setIsVisible(true);
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`;
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const addHoverEvents = () => {
      const interactiveElements = document.querySelectorAll(
        'button, a, [role="button"], input, select, textarea, .interactive-card, canvas'
      );
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => setIsHovering(true));
        el.addEventListener('mouseleave', () => setIsHovering(false));
      });
    };

    let animationFrameId: number;
    const updateRing = () => {
      const ease = 0.15;
      ringPos.x += (mousePos.x - ringPos.x) * ease;
      ringPos.y += (mousePos.y - ringPos.y) * ease;
      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringPos.x - 16}px, ${ringPos.y - 16}px, 0)`;
      }
      animationFrameId = requestAnimationFrame(updateRing);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    updateRing();

    const observer = new MutationObserver(addHoverEvents);
    observer.observe(document.body, { childList: true, subtree: true });
    addHoverEvents();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, [isMobile, isVisible]);

  if (isMobile || !isVisible) return null;

  return (
    <>
      <div 
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-violet-500 rounded-full pointer-events-none z-50 transition-transform duration-[0.03s] ease-out will-change-transform"
        id="custom-cursor-dot"
      />
      <div 
        ref={cursorRingRef}
        className={`fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-50 transition-all duration-200 ease-out will-change-transform ${
          isClicking 
            ? 'scale-75 bg-fuchsia-200/50 border border-fuchsia-400' 
            : isHovering 
              ? 'scale-[1.6] bg-violet-100/50 border border-violet-400' 
              : 'scale-100 bg-transparent border border-violet-300'
        }`}
        id="custom-cursor-ring"
      />
    </>
  );
}