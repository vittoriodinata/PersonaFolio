import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playSound, changeAudio } from "./utils/sound-manager";


const NOTE_POSITION = {
  "below-left" : "left-0 top-full mt-3 origin-top-left",
  "below-right" : "right-0 top-full mt-3 origin-top-right",
  "right" : "left-full top-0 ml-5 origin-top-left",
  "left" : "right-full top-0 mr-5 origin-top-right",
};

function StatNote({ stat }) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleY: 0.1, x: stat.note === "below-right" ? 24 : -24 }}
      animate={{ opacity: 1, scaleY: 1, x: 0 }}
      exit={{ opacity: 0, scaleY: 0.1 }}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
      className={`pointer-events-none absolute z-20 w-[270px] bg-black px-5 py-4 shadow-[6px_6px_0px_rgba(212,0,0,0.85)] ${NOTE_POSITION[stat.note]}`}
    >
      <p className="text-sm font-bold leading-relaxed text-white">{stat.desc}</p>

      <div className="mt-3 flex items-center gap-1.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={`h-2.5 w-5 -skew-x-12 ${i < stat.val ? "bg-[#fce300]" : "bg-neutral-700"}`}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default function StatusChart() {
  const [hovered, setHovered] = useState(null);

    const stats = [
    {
      name: "Logic",
      sub: "Encyclopedic",
      val: 4,
      note: "right",
      desc: "Breaks complex problems into manageable steps, with a strong understanding of algorithms, data structures, and the foundations of machine learning.",
    },
    {
      name: "Projects",
      sub: "Masterful",
      val: 4,
      note: "below-left",
      desc: "Enjoys turning ideas into working products, from computer vision and recommendation systems to AI applications and full-stack platforms.",
    },
    {
      name: "Coding",
      sub: "Skilled",
      val: 3,
      note: "right",
      desc: "Learns best through hands-on development, constantly exploring new technologies by building, experimenting, and refining practical solutions.",
    },
    {
      name: "Social",
      sub: "Selfless",
      val: 4,
      note: "left",
      desc: "Works well with others, communicates thoughtfully, and is always willing to share knowledge or lend a hand when someone gets stuck.",
    },
    {
      name: "Design",
      sub: "Skilled",
      val: 3,
      note: "below-right",
      desc: "Combines technical thinking with an eye for usability, focusing on digital experiences that are intuitive, purposeful, and enjoyable to use.",
    },
  ];

  //config
  const size = 1200;
  const cx = size / 2;
  const cy = size / 2;
  const maxRadius = 320;
  const innerFactor = 0.4;

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
                  fill={hovered === i ? "#fbbf24" : "#d97706"}
                  stroke="#b45309"
                  strokeWidth="2"
                />

                <motion.polygon
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: i * 0.1 + 0.05, type: "spring" }}
                  style={{ transformOrigin: `${cx}px ${cy}px` }}
                  points={`${cx},${cy} ${tip.x},${tip.y} ${nextInner.x},${nextInner.y}`}
                  fill={hovered === i ? "#fff3a0" : "#fbbf24"}
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
              className={`absolute pointer-events-none ${hovered === i ? "z-30" : "z-10"}`}
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
                onMouseEnter={() => {
                  playSound(changeAudio);
                  setHovered(i);
                }}
                onMouseLeave={() => setHovered(null)}
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

              <AnimatePresence>
                {hovered === i && <StatNote stat={stat} />}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}