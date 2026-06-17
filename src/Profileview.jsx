import React from "react";
import { motion as m } from "framer-motion";
import charImage from "./assets/noyba.png";

export default function ProfileView() {
  const statsData = [
    { name: "Coding", current: 56, total: 100 },
    { name: "Problem Solving", current: 78, total: 100 },
    { name: "Design", current: 58, total: 100 },
    { name: "Teamwork", current: 76, total: 100 },
    { name: "Learning", current: 80, total: 100 },
  ];

  const hobbyData = [
    { name: "Gaming", current: 10, total: 10 },
    { name: "Fishing", current: 5, total: 10 },
    { name: "Reading", current: 4, total: 10 },
    { name: "Coding", current: 6, total: 10 },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 overflow-y-auto max-h-[85vh] scrollbar-thin scrollbar-thumb-red-600 scrollbar-track-black pr-6">
      <div className="text-left mb-8">
        <h2 className="text-6xl font-black italic tracking-tighter text-white uppercase inline-block [text-shadow:_4px_4px_0_#d40000]">
          PROFILE
        </h2>
        <div className="h-1 w-full bg-white/20 mt-2"></div>
      </div>

      <div className="flex flex-col md:flex-row items-start justify-center gap-10 pb-12">
        <div className="flex flex-col gap-6 w-full md:w-[55%]">
          <m.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            whileHover={{ scale: 1.05, rotate: 0, x: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="bg-white text-black py-2 px-12 font-black text-4xl italic uppercase rotate-[-1deg] border-2 border-black shadow-[6px_6px_0px_#d40000] inline-block self-start cursor-pointer hover:bg-neutral-200"
          >
            NAME: VITTORIO DINATA
          </m.div>

          <m.div
            whileHover={{ scale: 1.05, rotate: 0, y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="bg-black border-4 border-white p-4 rotate-[0.5deg] shadow-[8px_8px_0px_rgba(255,255,255,0.15)] w-full max-w-md cursor-pointer hover:shadow-[10px_10px_0px_#d40000]"
          >
            <div className="text-3xl font-black italic text-white mb-2 tracking-widest">
              LVL <span className="text-5xl text-amber-400">20</span>
            </div>

            <div className="flex gap-6 font-black italic text-lg border-t border-white/20 pt-2 tracking-wider">
              <div className="text-[#00ffcc] [text-shadow:_1px_1px_0_#000]">
                HP <span className="text-white">20 / 06</span>
              </div>
              <div className="text-[#ff00ff] [text-shadow:_1px_1px_0_#000]">
                SP <span className="text-white">18 / 09</span>
              </div>
            </div>
          </m.div>

          <m.div
            whileHover={{ scale: 1.05, rotate: -2, x: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 12 }}
            className="bg-black/90 border-2 border-white p-5 rotate-[-0.5deg] w-full max-w-md shadow-[5px_5px_0px_#d40000] cursor-pointer hover:border-amber-400"
          >
            <h3 className="text-amber-400 font-black italic text-xl uppercase mb-3 border-b border-amber-400 inline-block tracking-widest">
              HOBBIES
            </h3>

            <div className="flex flex-col gap-3">
              {hobbyData.map((hobby) => (
                <div key={hobby.name} className="flex items-center justify-between gap-4">
                  <span className="font-black text-sm uppercase text-white tracking-widest">
                    {hobby.name}
                  </span>

                  <div className="flex gap-1">
                    {Array.from({ length: hobby.total }).map((_, i) => (
                      <div
                        key={i}
                        className={`h-4 w-4 rotate-[-5deg] ${i < hobby.current ? "bg-amber-400" : "bg-neutral-800"}`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </m.div>
          
          <m.div
            whileHover={{ scale: 1.03, rotate: 0, y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="bg-black/90 border-2 border-dashed border-white/30 p-5 rotate-[1deg] w-full max-w-lg cursor-pointer hover:border-solid hover:border-white hover:shadow-[10px_10px_0px_#d40000]"
          >
            <h3 className="text-white font-black italic text-2xl uppercase border-b-2 border-[#d40000] mb-4 tracking-widest">
              BASE ATTRIBUTES
            </h3>

            <div className="flex flex-col gap-6">
              {statsData.map((stat) => (
                <div key={stat.name} className="flex items-center gap-4">
                  <span className="font-black text-sm uppercase text-white tracking-widest w-36 [text-shadow:_2px_2px_0_#000]">
                    {stat.name}
                  </span>

                  <div className="w-12 font-black italic text-2xl text-white flex items-baseline gap-1 [text-shadow:_2px_2px_0_#000]">
                    {stat.current}
                  </div>

                  <div className="relative flex-1 h-6">
                    <div className="absolute top-1 left-1 w-full h-full bg-white border-2 border-white" />

                    <div className="absolute top-0 left-0 w-full h-full bg-neutral-800 overflow-hidden">
                      <div
                        className="h-full bg-[#d40000] transition-all duration-1000 ease-out drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]"
                        style={{ width: `${(stat.current / stat.total) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </m.div>
        </div>

        <div className="w-full md:w-[40%] flex justify-center sticky top-8">
          <div className="border-4 border-white/20 p-2 bg-black/40 rotate-[3deg] shadow-[15px_15px_0px_rgba(0,0,0,0.5)] transition-all hover:rotate-0">
            <img
              src={charImage}
              alt="Vittorio Character"
              className="w-full max-h-[750px] object-contain transition-all duration-500 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </div>
  );
}