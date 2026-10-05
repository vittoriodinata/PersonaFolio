import React from "react";
import { motion } from "framer-motion";
import { playSound, selectAudio, changeAudio } from "./utils/sound-manager";

import cert1cover from "./assets/images/cert1-cover.avif";
import cert1hover from "./assets/images/cert1-hover.avif";
import cert2cover from "./assets/images/cert2-cover.avif";
import cert2hover from "./assets/images/cert2-hover.avif";
import cert3cover from "./assets/images/cert3-cover.avif";
import cert3hover from "./assets/images/cert3-hover.avif";

const certificates = [
  {
    title: "ICCSCI",
    issuer: "Bina Nusantara University",
    date: "2026",
    desc: "Co-authored a published research paper in Elsevier's Procedia Computer Science evaluating time-domain, frequency-domain, and non-linear HRV feature engineering strategies. Achieved a top F1-score of 0.9618 using multi-domain datasets for automated Atrial Fibrillation classification.",
    skills: ["Machine Learning", "Feature Engineering", "ECG Signal Processing", "Python"],
    cover: cert1cover,
    hover: cert1hover,
    link: "https://www.sciencedirect.com/science/article/pii/S1877050926029844",
  },
  {
    title: "TECHNO 2025",
    issuer: "HIMTI BINUS University",
    date: "2025",
    desc: "Served as Vice Coordinator of the PTK Division for TECHNO 2025 'LEVEL-UP'. Co-managed logistics, student engagement, and cross-regional coordination across multiple BINUS campuses to deliver a flagship computing event.",
    skills: ["Leadership", "Event Management", "Team Coordination", "Strategic Planning"],
    cover: cert2cover,
    hover: cert2hover,
    link: "https://drive.google.com/file/d/1VwFcrJj5dN8wrAdaSEgOl1kqJ6y7_DEG/view?usp=sharing",
  },
  {
    title: "HILET26",
  issuer: "HIMTI BINUS University",
  date: "2026",
  desc: "Participated in the HIMTI Leadership Training (HILET) program as Coordinator of the Logistics Division. Focused on managing logistics, developing advanced organizational leadership, effective communication, and collaborative work with other coordinators.",
  skills: ["Organizational Leadership", "Leadership" , "Public Relations", "Teamwork"],
  cover: cert3cover,
  hover: cert3hover,
  link: "https://drive.google.com/file/d/1Y6jJZvMGSlN_mYiW0GizdlgAozWKXKhK/view?usp=sharing",
  },
];

function CertImage({ cert }) {
  const hasAny = cert.cover || cert.hover;
  const swaps = cert.cover && cert.hover;

  return (
    <div className="relative aspect-[1.41/1] w-full overflow-hidden border-4 border-white bg-white shadow-[8px_8px_0px_rgba(255,255,255,0.15)] 
    transition-shadow duration-300 group-hover:shadow-[-10px_10px_0px_#d40000]">
      {!hasAny && (
        <div className="flex h-full w-full items-center justify-center bg-neutral-300 text-3xl font-black italic uppercase tracking-widest text-neutral-500">
          Image
        </div>
      )}

      {cert.cover && (
        <img
          src={cert.cover}
          alt={cert.title}
          className={`absolute inset-0 h-full w-full object-contain p-2 transition-all duration-500 [backface-visibility:hidden] ${
            swaps ? "group-hover:opacity-0" : "grayscale group-hover:grayscale-0"
          }`}
        />
      )}

      {cert.hover && (
        <img
          src={cert.hover}
          alt={`${cert.title} (full certificate)`}
          className="absolute inset-0 h-full w-full object-contain p-2 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [backface-visibility:hidden]"
        />
      )}

      <div className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-[#d40000] opacity-80 transition-transform duration-500 ease-out group-hover:translate-x-[420%]" />
    </div>
  );
}

export default function Certificate() {
  return (
    <div className="mx-auto max-h-[80vh] w-full max-w-6xl overflow-y-auto px-4 pr-6 scrollbar-thin scrollbar-thumb-red-600 scrollbar-track-black">
      <div className="relative mb-12 text-left">
        <h2 className="inline-block text-6xl font-black italic uppercase tracking-tighter text-white drop-shadow-[5px_5px_0px_#d40000]">
          CERTIFICATE
        </h2>
        <div className="mt-2 h-1 w-full bg-white/20" />
      </div>

      <div className="flex flex-col gap-20 pb-16">
        {certificates.map((cert, i) => {
          const reverse = i % 2 === 1;

          return (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, x: reverse ? 80 : -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ type: "spring", stiffness: 90, damping: 16 }}
              onMouseEnter={() => playSound(changeAudio)}
              className={`group relative flex flex-col items-center gap-10 md:flex-row ${
                reverse ? "md:flex-row-reverse" : ""
              }`}
            >
              <motion.div
                className="w-full shrink-0 transform-gpu [backface-visibility:hidden] md:w-[46%]"
                style={{ rotate: reverse ? 2 : -2 }}
                whileHover={{ rotate: 0, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
              >
                <CertImage cert={cert} />
              </motion.div>

              <div className={`relative w-full text-left md:flex-1 ${reverse ? "md:text-right" : ""}`}>
                <span
                  className={`pointer-events-none absolute -top-14 select-none text-9xl font-black italic text-white/5 ${
                    reverse ? "right-0" : "left-0"
                  }`}
                >
                  0{i + 1}
                </span>

                <div className="relative z-10">
                  <div className={`flex flex-wrap items-center gap-3 ${reverse ? "md:justify-end" : ""}`}>
                    <span className="inline-block -skew-x-6 bg-[#d40000] px-3 py-0.5 text-xs font-black uppercase tracking-widest text-white">
                      <span className="inline-block skew-x-6">{cert.issuer}</span>
                    </span>
                    <span className="font-mono text-xs italic tracking-widest opacity-60">
                      // {cert.date}
                    </span>
                  </div>

                  <h3 className="mt-3 text-3xl font-black italic uppercase tracking-tight text-white [text-shadow:_3px_3px_0_#d40000] md:text-4xl">
                    {cert.title}
                  </h3>

                  <p
                    className={`mt-4 max-w-xl text-sm font-medium leading-relaxed text-gray-300 ${
                      reverse ? "md:ml-auto" : ""
                    }`}
                  >
                    {cert.desc}
                  </p>

                  <div className={`mt-4 flex flex-wrap gap-2 ${reverse ? "md:justify-end" : ""}`}>
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="-skew-x-6 border border-neutral-500 bg-neutral-900 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider 
                        text-gray-300 transition-colors group-hover:border-white group-hover:text-white"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {cert.link && (
                    <motion.a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={() => playSound(changeAudio)}
                      onClick={() => playSound(selectAudio)}
                      whileHover={{ x: reverse ? -6 : 6 }}
                      className="mt-6 inline-flex -skew-x-6 cursor-pointer items-center border-2 border-white bg-black px-5 py-1.5 
                      text-base font-black italic uppercase tracking-wider text-white shadow-[4px_4px_0px_#d40000] transition-colors hover:bg-white hover:text-black"
                    >
                      <span className="inline-block skew-x-6">▶ VIEW+</span>
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}