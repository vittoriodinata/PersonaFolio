import React from "react";
import { motion } from "framer-motion";
import { playSound, changeAudio } from "./utils/soundManager";

export default function StatusChart() {
  const stats = [
    { name: "Logic", sub: "Encyclopedic", val: 4 },
    { name: "Projects", sub: "Masterful", val: 4 },
    { name: "Coding", sub: "Skilled", val: 3 },
    { name: "Social", sub: "Selfless", val: 4 },
    { name: "Design", sub: "Skilled", val: 3 },
  ];

  // chart_config
  const size = 1000;
  const cx = size / 2;
  const cy = size / 2;
  const maxRadius = 320;
  const innerFactor = 0.35;

  const getCoordinates = (isBackground = false) => {
    let tips = [];
    let inners = [];

    for (let i = 0; i < 5; i++) {
      const angleTip = (i * 2 * Math.PI) / 5 - Math.PI / 2;
      const valTip = isBackground ? 5 : stats[i].val;
      const rTip = (valTip / 5) * maxRadius;

      tips.push({
        x: cx + rTip * Math.cos(angleTip),
        y: cy + rTip * Math.sin(angleTip),
      });

      const angleInner = angleTip + Math.PI / 5;
      const nextIdx = (i + 1) % 5;
      const avgVal = isBackground ? 5 : (stats[i].val + stats[nextIdx].val) / 2;
      const rInner = (avgVal / 5) * maxRadius * innerFactor;

      inners.push({
        x: cx + rInner * Math.cos(angleInner),
        y: cy + rInner * Math.sin(angleInner),
      });
    }

    return { tips, inners };
  };

  const bgCoords = getCoordinates(true);
  const fillCoords = getCoordinates(false);

  return (
    <div className="w-full h-full max-h-[85vh] overflow-auto bg-black/20 scrollbar-thin scrollbar-thumb-[#fce300] scrollbar-track-neutral-900 flex justify-center">
      <div
        className="relative flex-none"
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="absolute inset-0 w-full h-full drop-shadow-[0_0_40px_rgba(250,204,21,0.25)] rotate-[-2deg]"
        >
          <polygon
            points={bgCoords.tips.map((t, i) => `${t.x},${t.y} ${bgCoords.inners[i].x},${bgCoords.inners[i].y}`).join(" ")}
            fill="#2a2a2a"
            stroke="#404040"
            strokeWidth="5"
          />

          {fillCoords.tips.map((tip, i) => {
            const prevInner = fillCoords.inners[(i - 1 + 5) % 5];
            const nextInner = fillCoords.inners[i];

            return (
              <g key={`3d-star-part-${i}`}>
                <motion.polygon
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: i * 0.1, type: "spring" }}
                  style={{ transformOrigin: `${cx}px ${cy}px` }}
                  points={`${cx},${cy} ${prevInner.x},${prevInner.y} ${tip.x},${tip.y}`}
                  fill="#d97706"
                  stroke="#b45309"
                  strokeWidth="2"
                />

                <motion.polygon
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: i * 0.1 + 0.05, type: "spring" }}
                  style={{ transformOrigin: `${cx}px ${cy}px` }}
                  points={`${cx},${cy} ${tip.x},${tip.y} ${nextInner.x},${nextInner.y}`}
                  fill="#fbbf24"
                  stroke="#d97706"
                  strokeWidth="2"
                />

                <circle cx={tip.x} cy={tip.y} r="4" fill="#fff" opacity="0.6" />
                <circle cx={prevInner.x} cy={prevInner.y} r="3" fill="#000" opacity="0.4" />
              </g>
            );
          })}
        </svg>

        {stats.map((stat, i) => {
          const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
          const radiusOffset = 420;
          const xPos = cx + radiusOffset * Math.cos(angle);
          const yPos = cy + radiusOffset * Math.sin(angle);

          return (
            <div
              key={stat.name}
              className="absolute z-10 pointer-events-none"
              style={{
                left: `${xPos}px`,
                top: `${yPos}px`,
                transform: `translate(-50%, -50%) rotate(${i % 2 === 0 ? "-3deg" : "2deg"})`,
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.5 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ scale: 1.15, rotate: [-2, 2, -1] }}
                onMouseEnter={() => playSound(changeAudio)}
                transition={{
                  duration: 0.5,
                  delay: 0.5 + i * 0.1,
                  type: "spring",
                  bounce: 0.5,
                }}
                className="pointer-events-auto cursor-default drop-shadow-[6px_6px_0_rgba(0,0,0,0.8)]"
              >
                <div className="flex flex-col items-center">
                  <div className="flex items-end gap-1">
                    <div className="bg-[#fce300] border-2 border-black px-4 py-1 transform skew-x-[-10deg]">
                      <span className="font-black italic text-2xl md:text-3xl tracking-tighter text-black uppercase transform skew-x-[10deg] block">
                        {stat.name}
                      </span>
                    </div>

                    <span className="font-black italic text-xl md:text-2xl text-white transform rotate-[-5deg] [text-shadow:_-2px_-2px_0_#000,_2px_-2px_0_#000,_-2px_2px_0_#000,_2px_2px_0_#000]">
                      {stat.val === 5 ? "MAX" : `LV.${stat.val}`}
                    </span>
                  </div>

                  <span className="text-[#fce300] font-black tracking-widest text-sm md:text-base uppercase mt-1 [text-shadow:_1px_1px_0_#000,_-1px_-1px_0_#000]">
                    {stat.sub}
                  </span>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}