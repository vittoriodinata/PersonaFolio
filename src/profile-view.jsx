import React from "react";
import { motion as m } from "framer-motion";
import { playSound, changeAudio } from "./utils/sound-manager";
import charImage from "./assets/images/char.avif";

const hobbyData = [
  { name: "Gaming", current: 8, total: 10 },
  { name: "Fishing", current: 4, total: 10 },
  { name: "Reading", current: 5, total: 10 },
  { name: "Coding", current: 6, total: 10 },
  { name: "Trading", current: 5, total: 10 },
];

const statsData = [
  { name: "Coding", current: 56, total: 100 },
  { name: "Problem Solving", current: 78, total: 100 },
  { name: "Design", current: 58, total: 100 },
  { name: "Teamwork", current: 76, total: 100 },
  { name: "Learning", current: 80, total: 100 },
];

/* yellow skewed heading tab (same look as the labels on the Status chart) */
function Tag({ children }) {
  return (
    <span className="mb-4 inline-block -skew-x-12 border-2 border-black bg-[#fce300] px-4 py-0.5 shadow-[3px_3px_0px_#000]">
      <span className="inline-block skew-x-12 text-lg font-black italic uppercase tracking-widest text-black">
        {children}
      </span>
    </span>
  );
}

/* one shared card style so every block on the page matches */
function Card({ title, rotate = 0, delay = 0, className = "", children }) {
  return (
    <m.section
      initial={{ opacity: 0, x: -50 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: { type: "spring", stiffness: 200, damping: 20, delay },
      }}
      whileHover={{ rotate: 0, y: -4 }}
      onMouseEnter={() => playSound(changeAudio)}
      transition={{ type: "spring", stiffness: 300, damping: 18 }}
      style={{ rotate }}
      className={`group relative w-full border-2 border-white bg-black/90 p-5 shadow-[6px_6px_0px_#d40000] transition-shadow duration-200 hover:shadow-[-8px_8px_0px_#d40000] ${className}`}
    >
      {title && <Tag>{title}</Tag>}
      {children}
    </m.section>
  );
}

export default function ProfileView() {
  return (
    <div className="mx-auto max-h-[85vh] w-full max-w-6xl overflow-y-auto px-4 pr-6 scrollbar-thin scrollbar-thumb-red-600 scrollbar-track-black">
      {/* header */}
      <div className="mb-8 text-left">
        <h2 className="inline-block text-6xl font-black italic uppercase tracking-tighter text-white [text-shadow:_4px_4px_0_#d40000]">
          PROFILE
        </h2>
        <div className="mt-2 flex h-1 gap-1">
          <div className="w-28 bg-[#d40000]"></div>
          <div className="flex-1 bg-white/20"></div>
        </div>
      </div>

      <div className="flex flex-col items-start justify-center gap-10 pb-12 md:flex-row">
        {/* ---------------- left column ---------------- */}
        <div className="flex w-full max-w-xl flex-col gap-6 md:w-[55%]">
          {/* Name */}
          <m.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            whileHover={{ scale: 1.03, rotate: 0, x: 10 }}
            onMouseEnter={() => playSound(changeAudio)}
            transition={{ type: "spring", stiffness: 400, damping: 12 }}
            style={{ rotate: -1 }}
            className="inline-block cursor-pointer self-start border-2 border-black bg-white px-10 py-2 shadow-[6px_6px_0px_#d40000]"
          >
            <div className="text-4xl font-black italic uppercase leading-tight text-black">
              Vittorio Dinata
            </div>
            <div className="text-xs font-black uppercase tracking-[0.3em] text-[#d40000]">
              Computer Science · AI Minor
            </div>
          </m.div>

          {/* Level */}
          <Card rotate={0.5} delay={0.08}>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-black italic tracking-widest text-white">
                LVL <span className="text-6xl text-amber-400 [text-shadow:_3px_3px_0_#000]">20</span>
              </div>
              <div className="flex flex-col gap-1 border-l-2 border-white/20 pl-6 text-xl font-black italic tracking-wider">
                <div className="text-[#00ffcc] [text-shadow:_1px_1px_0_#000]">
                  HP <span className="text-white">2006</span>
                </div>
                <div className="text-[#ff00ff] [text-shadow:_1px_1px_0_#000]">
                  SP <span className="text-white">1809</span>
                </div>
              </div>
            </div>
          </Card>

          {/* About me */}
          <Card title="ABOUT ME" rotate={-0.5} delay={0.16}>
            <p className="border-l-4 border-[#d40000] pl-4 text-justify text-sm font-medium italic leading-relaxed text-white/90">
              "I am a Computer Science student at Bina Nusantara University currently pursuing an AI minor,
              with a strong interest in Machine Learning, Data Analytics, and UI/UX design.
              I enjoy turning data-driven insights and intelligent technologies into usable digital products that address real-world problems and meaningful user needs.
              My goal is to combine technical knowledge with user-focused design to build practical solutions that are not only intelligent,
              but also useful, accessible, and impactful."
            </p>
          </Card>

          {/* Hobbies */}
          <Card title="HOBBIES" rotate={-0.5} delay={0.24}>
            <div className="flex flex-col gap-3">
              {hobbyData.map((hobby) => (
                <div key={hobby.name} className="flex items-center gap-4">
                  <span className="w-24 text-sm font-black uppercase tracking-widest text-white">
                    {hobby.name}
                  </span>
                  <div className="flex flex-1 gap-1">
                    {Array.from({ length: hobby.total }).map((_, i) => (
                      <div
                        key={i}
                        className={`h-4 flex-1 -skew-x-12 transition-shadow duration-200 ${
                          i < hobby.current
                            ? "bg-amber-400 group-hover:shadow-[0_0_8px_#fbbf24]"
                            : "bg-neutral-800"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Base attributes (mt-14 = the extra gap after Hobbies, change it to taste) */}
          <Card title="BASE ATTRIBUTES" rotate={1.5} delay={0.32} className="mt-1">
            <div className="flex flex-col gap-6">
              {statsData.map((stat, i) => (
                <div key={stat.name} className="flex items-center gap-4">
                  <span className="w-36 text-sm font-black uppercase tracking-widest text-white">
                    {stat.name}
                  </span>
                  <div className="w-10 text-2xl font-black italic text-white">{stat.current}</div>

                  <div className="relative h-6 flex-1 -skew-x-12">
                    <div className="absolute left-1 top-1 h-full w-full bg-white" />
                    <div className="absolute left-0 top-0 h-full w-full overflow-hidden bg-neutral-800">
                      <m.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(stat.current / stat.total) * 100}%` }}
                        transition={{ duration: 0.9, delay: 0.6 + i * 0.1, ease: "easeOut" }}
                        className="h-full bg-[#d40000]"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* ---------------- right column: character ---------------- */}
        <div className="sticky top-8 flex w-full justify-center md:w-[40%]">
          <m.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ rotate: 0 }}
            onMouseEnter={() => playSound(changeAudio)}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            style={{ rotate: 3 }}
            className="relative cursor-pointer"
          >
            {/* red slab behind the frame */}
            <div className="absolute inset-0 translate-x-4 translate-y-4 bg-[#d40000]" />

            <div className="relative border-4 border-white bg-black p-2 shadow-[10px_10px_0px_rgba(0,0,0,0.6)]">
              <div className="overflow-hidden">
                <img
                  src={charImage}
                  alt="Vittorio Character"
                  className="max-h-[62vh] w-full object-contain transition-all duration-500 hover:scale-105"
                />
              </div>
            </div>
          </m.div>
        </div>
      </div>
    </div>
  );
}
