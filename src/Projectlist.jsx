import React from "react";
import { motion } from "framer-motion";
import { playSound, selectAudio, changeAudio } from "./utils/soundManager"; 

import Img1 from "./assets/sudoku.png";
import Img2 from "./assets/poker.png";
import Img3 from "./assets/unicomp.png";
import Img4 from "./assets/music.png";
import Img5 from "./assets/afib.png";

export default function ProjectsList() {
  const projects = [
    {
      id: 1,
      title: "Sudoku Solver",
      role: "OCR / Model Development",
      desc: "Computer vision based Sudoku solver using CNN-based OCR to recognize puzzle digits, combined with image processing and backtracking algorithm.",
      img: Img1,
      link: "https://huggingface.co/spaces/asipnana/SudokuProject",
      rotate: "-3deg",
      borderColor: "border-white"
    },
    {
      id: 2,
      title: "Poker Decision Advisor",
      role: "Model Architecture & Training",
      desc: "Machine learning powered poker assistant that analyzes hand strength, board state, position, and opponent tendencies to recommend optimal actions.",
      img: Img2,
      link: "https://pokerml-ovmrb6qydwttlsyzm2sax3.streamlit.app/",
      rotate: "2deg",
      borderColor: "border-[#d40000]"
    },
    {
      id: 3,
      title: "Unicomp Competition Website",
      role: "Backend & Database Developer",
      desc: "A web platform for discovering and managing IT competitions, connecting participants with events, organizers, and competition information.",
      img: Img3,
      link: "https://software-engineering-project-group12.vercel.app/",
      rotate: "-2deg",
      borderColor: "border-white"
    },
    {
      id: 4,
      title: "AlgoRhythm: Music Recommender",
      role: "Frontend Developer",
      desc: "Content-based music recommendation system using K-Nearest Neighbors and cosine similarity to analyze audio features and find similar tracks.",
      img: Img4,
      link: "https://music-recommender-machine-learning-final-project-tvwau93gk66ms.streamlit.app/",
      rotate: "4deg",
      borderColor: "border-[#d40000]"
    },
    {
      id: 5,
      title: "Peer Review: AFib Detection",
      role: "Writing & Research",
      desc: "Research paper on ECG-based Atrial Fibrillation detection using machine learning classifiers like Random Forest, SVM, and Logistic Regression.",
      img: Img5,
      link: "https://drive.google.com/file/d/1PSWlxuYv82FjgISCdFiFWKepVzMqldMh/view?usp=sharing",
      rotate: "-4deg",
      borderColor: "border-white"
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 overflow-y-auto max-h-[80vh] scrollbar-thin scrollbar-thumb-red-600 scrollbar-track-black pr-6">
      
      <div className="text-left mb-12 relative">
        <h2 className="text-6xl font-black italic tracking-tighter text-white drop-shadow-[5px_5px_0px_#d40000] uppercase inline-block">
          PROJECTS
        </h2>
        <div className="h-1 w-full bg-white/20 mt-2"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
        {projects.map((project, index) => (
          <motion.a
            key={project.id}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            // Efek suara:
            onMouseEnter={() => playSound(changeAudio)}
            onClick={() => playSound(selectAudio)}
            
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, rotate: "0deg", zIndex: 40 }}
            style={{ transform: `rotate(${project.rotate})` }}
            className={`bg-black/80 p-4 border-4 ${project.borderColor} shadow-[8px_8px_0px_rgba(255,255,255,0.1)] hover:shadow-[-8px_8px_0px_#d40000] hover:bg-white hover:text-black transition-all duration-200 cursor-pointer group flex flex-col justify-between`}
          >
            <div>
              <div className="w-full h-44 bg-neutral-900 border-2 border-black overflow-hidden relative mb-4">
                <img 
                  src={project.img} 
                  alt={project.title}
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 contrast-125 transition-all duration-300 group-hover:scale-110" 
                />
                <span className="absolute bottom-2 right-2 bg-black text-white px-2 py-0.5 font-black text-xs border border-white group-hover:bg-[#d40000]">
                  0{project.id}
                </span>
              </div>
              <h3 className="text-xl font-black italic tracking-wide uppercase line-clamp-1 group-hover:text-[#d40000]">
                {project.title}
              </h3>
              <p className="text-xs font-bold text-gray-400 group-hover:text-black/80 mt-2 tracking-wide leading-relaxed">
                {project.desc}
              </p>
            </div>

            <div className="mt-6 pt-2 border-t-2 border-dashed border-neutral-800 group-hover:border-black">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#d40000] group-hover:text-black">
                  ROLE: {project.role}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono tracking-widest opacity-40 group-hover:opacity-100 italic">
                  // STATUS: COMPLETED | 2026
                </span>
                <span className="text-xs font-black bg-[#d40000] text-white px-2 py-0.5 group-hover:bg-black">
                  VIEW+
                </span>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}