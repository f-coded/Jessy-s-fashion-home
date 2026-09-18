"use client";

import { useEffect, useRef, useState } from "react";

/** Counts from 0 to `count` over `duration` ms once 40% of the element is visible. */
export default function Odometer({ count, duration = 1000 }: { count: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf: number | null = null;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || done.current) return;
        done.current = true;
        el.classList.add("odometer-animated");
        let start: number | null = null;
        const step = (ts: number) => {
          if (start === null) start = ts;
          const p = Math.min((ts - start) / duration, 1);
          setValue(p >= 1 ? count : Math.round(count * p));
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [count, duration]);

  return (
    <span className="odometer" data-count={count}>
      <span ref={ref} className="odometer" data-count={count} role="meter" aria-valuemin={0} aria-valuemax={count} aria-valuenow={value}>
        {value}
      </span>
    </span>
  );
}
