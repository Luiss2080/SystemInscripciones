"use client";

import { useEffect, useState } from "react";
import { motion, animate, type HTMLMotionProps } from "framer-motion";

interface MotionFadeInProps extends HTMLMotionProps<"div"> {
  delay?: number;
  duration?: number;
  y?: number;
}

export function MotionFadeIn({
  children,
  delay = 0,
  duration = 0.35,
  y = 12,
  className = "",
  ...rest
}: MotionFadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

interface MotionStaggerItemProps extends HTMLMotionProps<"div"> {
  index?: number;
}

export function MotionStaggerItem({
  children,
  index = 0,
  className = "",
  ...rest
}: MotionStaggerItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.32,
        delay: Math.min(index * 0.045, 0.32),
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -2, transition: { duration: 0.18 } }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

interface AnimatedProgressBarProps {
  percentage: number;
  className?: string;
  barClassName?: string;
  minPercent?: number;
}

export function AnimatedProgressBar({
  percentage,
  className = "",
  barClassName = "bg-gradient-to-r from-cyan-400 to-blue-500",
  minPercent = 4,
}: AnimatedProgressBarProps) {
  const clamped = Math.max(percentage > 0 ? minPercent : 0, Math.min(100, percentage));

  return (
    <div
      className={`h-1.5 w-full rounded-full bg-slate-900 overflow-hidden border border-slate-800/80 ${className}`}
    >
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${clamped}%` }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className={`relative h-full rounded-full overflow-hidden ${barClassName}`}
      >
        <span className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer-sweep" />
      </motion.div>
    </div>
  );
}

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        setDisplayValue(latest);
      },
    });
    return () => controls.stop();
  }, [value]);

  return (
    <span>
      {prefix}
      {decimals > 0 ? displayValue.toFixed(decimals) : Math.round(displayValue)}
      {suffix}
    </span>
  );
}
