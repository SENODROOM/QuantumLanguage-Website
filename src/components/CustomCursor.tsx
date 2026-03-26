import React from 'react';
import { motion } from 'motion/react';

export const CustomCursor = () => {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = React.useState(false);
  const [isClicking, setIsClicking] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const moveMouse = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
      
      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') !== null ||
        target.closest('a') !== null
      );
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', moveMouse);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveMouse);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-cyan-500/30 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: isClicking ? 0.9 : isPointer ? 1.4 : 1,
          borderWidth: isPointer ? '1px' : '2px',
          borderColor: isPointer ? 'rgba(6, 182, 212, 0.5)' : 'rgba(6, 182, 212, 0.2)',
        }}
        transition={{ type: "spring", damping: 25, stiffness: 200, mass: 0.5 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-cyan-500 pointer-events-none z-[9999] hidden md:block shadow-[0_0_10px_rgba(6,182,212,0.5)]"
        animate={{
          x: position.x - 3,
          y: position.y - 3,
          scale: isClicking ? 1.5 : isPointer ? 0.5 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "spring", damping: 35, stiffness: 350, mass: 0.2 }}
      />
      {isPointer && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.2, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className="fixed top-0 left-0 w-12 h-12 bg-cyan-500 rounded-full blur-xl pointer-events-none z-[9998] hidden md:block"
          style={{
            x: position.x - 24,
            y: position.y - 24,
          }}
        />
      )}
    </>
  );
};
