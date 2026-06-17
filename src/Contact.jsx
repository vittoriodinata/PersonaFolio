import React from "react";
import { motion as m } from "framer-motion";
import { playSound, changeAudio, selectAudio } from "./utils/soundManager";
import charImage from "./assets/char.png";

export default function ContactView() {
  const contacts = [
    { label: "PHONE", value: "+62 813-8881-2816", link: "https://wa.me/6281388812816" },
    { label: "EMAIL", value: "vittorio.dinata@gmail.com", link: "mailto:vittorio.dinata@gmail.com" },
    { label: "GITHUB", value: "Vittorio Dinata", link: "https://github.com/vittoriodinata" },
    { label: "LINKEDIN", value: "Vittorio Dinata", link: "https://www.linkedin.com/in/vittorio-dinata-198300325/" },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 overflow-y-auto max-h-[85vh] scrollbar-thin scrollbar-thumb-red-600 scrollbar-track-black pr-6 pb-12">
      
      {/* Header */}
      <div className="text-left mb-8">
        <h2 className="text-6xl font-black italic tracking-tighter text-white uppercase inline-block [text-shadow:_4px_4px_0_#d40000]">
          CONTACT
        </h2>
        <div className="h-1 w-full bg-white/20 mt-2"></div>
      </div>

      <div className="flex flex-col md:flex-row items-start justify-center gap-10">
        
        {/* Contact List */}
        <div className="w-full md:w-[55%] flex flex-col gap-8">
          {contacts.map((c, i) => (
            <m.a
              key={i}
              href={c.link}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => playSound(changeAudio)}
              onClick={() => playSound(selectAudio)}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.3 }}
              whileHover={{ x: 10, transition: { duration: 0.2 } }}
              
              className="bg-black/80 border-2 border-white p-6 rotate-[-1deg] shadow-[5px_5px_0px_#d40000] cursor-pointer hover:bg-black hover:border-amber-400 block transition-all"
            >
              <div className="text-amber-400 font-black italic text-sm uppercase tracking-widest mb-1">
                {c.label}
              </div>
              <div className="text-white font-black italic text-2xl tracking-wide group-hover:text-amber-400">
                {c.value}
              </div>
            </m.a>
          ))}
        </div>

        {/* Character Image Section */}
        <div className="w-full md:w-[40%] flex justify-center sticky top-8">
          <m.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            onMouseEnter={() => playSound(changeAudio)}
            className="border-4 border-white/20 p-2 bg-black/40 rotate-[3deg] shadow-[15px_15px_0px_rgba(0,0,0,0.5)] transition-all hover:rotate-0 hover:shadow-[20px_20px_0px_rgba(0,0,0,0.7)]"
          >
            <img
              src={charImage}
              alt="Vittorio Character"
              className="w-full max-h-[500px] object-contain transition-all duration-500 hover:scale-105"
            />
          </m.div>
        </div>
      </div>
    </div>
  );
}