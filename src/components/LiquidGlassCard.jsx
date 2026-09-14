import React, { useState } from 'react';
import { motion } from 'motion/react';

function cn(...parts) {
  return parts.filter(Boolean).join(' ');
}

const BLUR_PX = { sm: 4, md: 12, lg: 16, xl: 24 };

const SHADOW_STYLES = {
  none: 'inset 0 0 0 0 rgba(255, 255, 255, 0)',
  xs: 'inset 1px 1px 1px 0 rgba(255, 255, 255, 0.3), inset -1px -1px 1px 0 rgba(255, 255, 255, 0.3)',
  sm: 'inset 2px 2px 2px 0 rgba(255, 255, 255, 0.35), inset -2px -2px 2px 0 rgba(255, 255, 255, 0.35)',
  md: 'inset 3px 3px 3px 0 rgba(255, 255, 255, 0.45), inset -3px -3px 3px 0 rgba(255, 255, 255, 0.45)',
  lg: 'inset 4px 4px 4px 0 rgba(255, 255, 255, 0.5), inset -4px -4px 4px 0 rgba(255, 255, 255, 0.5)',
  xl: 'inset 6px 6px 6px 0 rgba(255, 255, 255, 0.55), inset -6px -6px 6px 0 rgba(255, 255, 255, 0.55)',
};

const GLOW_STYLES = {
  none: '0 4px 4px rgba(0, 0, 0, 0.05), 0 0 12px rgba(0, 0, 0, 0.05)',
  xs: '0 4px 4px rgba(0, 0, 0, 0.15), 0 0 12px rgba(0, 0, 0, 0.08), 0 0 16px rgba(255, 255, 255, 0.05)',
  sm: '0 4px 4px rgba(0, 0, 0, 0.15), 0 0 12px rgba(0, 0, 0, 0.08), 0 0 24px rgba(255, 255, 255, 0.1)',
  md: '0 4px 4px rgba(0, 0, 0, 0.15), 0 0 12px rgba(0, 0, 0, 0.08), 0 0 32px rgba(255, 255, 255, 0.15)',
  lg: '0 4px 4px rgba(0, 0, 0, 0.15), 0 0 12px rgba(0, 0, 0, 0.08), 0 0 40px rgba(255, 255, 255, 0.2)',
  xl: '0 4px 4px rgba(0, 0, 0, 0.15), 0 0 12px rgba(0, 0, 0, 0.08), 0 0 48px rgba(255, 255, 255, 0.25)',
};

export const LiquidGlassCard = ({
  children,
  className = '',
  style,
  background,
  draggable = true,
  expandable = false,
  width,
  height,
  expandedWidth,
  expandedHeight,
  blurIntensity = 'xl',
  borderRadius = '32px',
  glowIntensity = 'sm',
  shadowIntensity = 'md',
  ...props
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleExpansion = (e) => {
    if (!expandable) return;
    if (e.target.closest('a, button, input, select, textarea')) return;
    setIsExpanded(!isExpanded);
  };

  const containerVariants = expandable
    ? {
        collapsed: {
          width: width || 'auto',
          height: height || 'auto',
          transition: { duration: 0.4, ease: [0.5, 1.5, 0.5, 1] },
        },
        expanded: {
          width: expandedWidth || 'auto',
          height: expandedHeight || 'auto',
          transition: { duration: 0.4, ease: [0.5, 1.5, 0.5, 1] },
        },
      }
    : {};

  const MotionComponent = draggable || expandable ? motion.div : 'div';

  const motionProps =
    draggable || expandable
      ? {
          variants: expandable ? containerVariants : undefined,
          animate: expandable ? (isExpanded ? 'expanded' : 'collapsed') : undefined,
          onClick: expandable ? handleToggleExpansion : undefined,
          drag: draggable,
          dragConstraints: draggable ? { left: 0, right: 0, top: 0, bottom: 0 } : undefined,
          dragElastic: draggable ? 0.3 : undefined,
          dragTransition: draggable
            ? { bounceStiffness: 300, bounceDamping: 10, power: 0.3 }
            : undefined,
          whileDrag: draggable ? { scale: 1.02 } : undefined,
          whileHover: { scale: 1.01 },
          whileTap: { scale: 0.98 },
        }
      : {};

  return (
    <>
      <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
        <defs>
          <filter id="glass-blur" x="0" y="0" width="100%" height="100%" filterUnits="objectBoundingBox">
            <feTurbulence type="fractalNoise" baseFrequency="0.003 0.007" numOctaves="1" result="turbulence" />
            <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="30" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
      <MotionComponent
        className={cn(className)}
        style={{
          position: 'relative',
          borderRadius,
          overflow: 'hidden',
          cursor: draggable ? 'grab' : expandable ? 'pointer' : undefined,
          ...(width && !expandable ? { width } : null),
          ...(height && !expandable ? { height } : null),
          ...style,
        }}
        {...motionProps}
        {...props}
      >
        {/* Bend layer: backdrop blur with distortion */}
        <div
          style={{
            position: 'absolute', inset: 0, zIndex: 0,
            borderRadius,
            backdropFilter: `blur(${BLUR_PX[blurIntensity]}px)`,
            WebkitBackdropFilter: `blur(${BLUR_PX[blurIntensity]}px)`,
            filter: 'url(#glass-blur)',
            background,
          }}
        />

        {/* Face layer: outer glow */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, borderRadius, boxShadow: GLOW_STYLES[glowIntensity] }} />

        {/* Edge layer: inner highlights */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 2, borderRadius, boxShadow: SHADOW_STYLES[shadowIntensity] }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 3 }}>{children}</div>
      </MotionComponent>
    </>
  );
};
