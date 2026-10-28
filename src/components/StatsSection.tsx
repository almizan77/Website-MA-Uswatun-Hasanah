import React, { useEffect, useRef, useState } from 'react';
import { statisticsData, StatisticItem } from '../data/schoolData';

const CounterItem: React.FC<{
  item: StatisticItem;
  startAnimation: boolean;
}> = ({ item, startAnimation }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startAnimation) return;

    let start = 0;
    const end = item.value;
    const duration = 1600; // ms
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [startAnimation, item.value]);

  return (
    <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/60 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1">
      <div>
        <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-on-primary transition-colors duration-200">
          <span className="material-symbols-outlined text-[26px]">
            {item.icon}
          </span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="font-headline-xl text-headline-xl font-extrabold text-on-background tracking-tight">
            {count}
          </span>
          <span className="font-headline-lg text-headline-lg font-bold text-secondary">
            {item.suffix}
          </span>
        </div>
        <h4 className="font-headline-sm text-headline-sm font-bold text-on-background mt-1">
          {item.label}
        </h4>
      </div>
      <p className="font-body-sm text-body-sm text-on-surface-variant mt-3 border-t border-outline-variant/30 pt-3">
        {item.description}
      </p>
    </div>
  );
};

export const StatsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-12 bg-surface-container-low border-b border-outline-variant/40 relative z-20 -mt-8 mx-4 sm:mx-8 lg:mx-auto max-w-container-max rounded-3xl shadow-xl"
    >
      <div className="px-6 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {statisticsData.map((stat) => (
            <CounterItem key={stat.id} item={stat} startAnimation={inView} />
          ))}
        </div>
      </div>
    </section>
  );
};
