import React, { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { playSound, selectAudio, changeAudio, backAudio } from "./utils/sound-manager";

import Img1 from "./assets/images/project1.avif";
import Img2 from "./assets/images/project2.avif";
import Img3 from "./assets/images/project3.avif";
import Img4 from "./assets/images/project4.avif";
import Img5 from "./assets/images/project5.avif";
import Img6 from "./assets/images/project6.avif";

const projects = [
  {
    id: 1,
    title: "Sudoku Solver",
    role: "OCR / Model Development",
    desc: "Computer vision based Sudoku solver using CNN-based OCR to recognize puzzle digits, combined with image processing and backtracking algorithm.",
    tags: ["Python", "Computer Vision", "CNN", "OCR"],
    overview:
      "Used by taking a photo of a Sudoku puzzle and it returns the solved grid. The image is cleaned up, the grid is found through contour-based detection, and the board is split into cells. Each cell is checked for blank or digit, the digits are read by a CNN, and the recognized board goes to a backtracking solver.",
    contribution:
      "Built the OCR side: training the digit-recognition model, tuning the grid detection and blank-cell threshold, and evaluating the whole pipeline so the reported accuracy reflects what the system actually does.",
    highlights: [
      "DigitCNN trained on TMNIST for digit recognition",
      "Contour-based grid detection with a tuned blank-cell threshold",
      "Backtracking solver for the recognized puzzle",
      "Evaluated with six metrics",
    ],
    links: [
      { label: "WEBSITE", 
        url: "https://huggingface.co/spaces/asipnana/SudokuProject",
      },
      { label: "GITHUB", 
        url: "https://github.com/aliciaajsp/CompvisSudokuProject",
      },
    ],
    img: Img1,
    rotate: "-3deg",
    borderColor: "border-white",
  },
  {
    id: 2,
    title: "Poker Decision Advisor",
    role: "Model Architecture & Training",
    desc: "Machine learning powered poker assistant that analyzes hand strength, board state, position, and opponent tendencies to recommend optimal actions.",
    tags: ["Python", "Machine Learning", "Streamlit"],
    overview:
      "A poker assistant that looks at your hand strength, the board, your position, and how opponents tend to play, then recommends an action. It runs as a Streamlit app so you can enter a situation and get a suggestion right away.",
    contribution:
      "Designed the model architecture and handled training. A big part of the work was keeping the features identical between training and the live app, so the model sees the same inputs in both places.",
    highlights: [
      "Recommends actions from hand strength, board state, position and opponent tendencies",
      "One shared feature definition used by both training and inference",
      "Organized as a five-file Python architecture",
    ],
    links: [
      { label: "WEBSITE", 
        url: "https://pokerml-ovmrb6qydwttlsyzm2sax3.streamlit.app/",
       },
      { label: "GITHUB", 
        url: "https://github.com/vittoriodinata/PokerML",
       },
    ],
    img: Img2,
    rotate: "2deg",
    borderColor: "border-[#d40000]",
  },
  {
    id: 3,
    title: "Unicomp Competition Website",
    role: "Backend & Database Developer",
    desc: "A web platform for discovering and managing IT competitions, connecting participants with events, organizers, and competition information.",
    tags: ["Web App", "Backend", "Database", "Team Project"],
    overview:
      "A platform where students can discover IT competitions, and organizers can publish and manage them. It brings participants, events, organizers and competition details together in one place instead of scattered posts and chats.",
    contribution:
      "Backend and database developer on the team: designing how competition, organizer and participant data is stored, and building the server logic the rest of the site depends on.",
    highlights: [
      "Browse and manage IT competitions in one place",
      "Connects participants, organizers and event information",
      "Built as a team software engineering project",
    ],
    links: [
      { label: "Website", 
        url: "https://software-engineering-project-group12.vercel.app/",
       },
      { label: "GITHUB", 
        url: "https://github.com/Alvarochann/Software-Engineering-Project-Group12",
       },
    ],
    img: Img3,
    rotate: "-2deg",
    borderColor: "border-white",
  },
  {
    id: 4,
    title: "AlgoRhythm: Music Recommender",
    role: "Frontend Developer",
    desc: "Content-based music recommendation system using K-Nearest Neighbors and cosine similarity to analyze audio features and find similar tracks.",
    tags: ["Python", "Streamlit", "KNN", "Cosine Similarity"],
    overview:
      "Instead of guessing from genres or listening history, AlgoRhythm compares the sound itself. It takes Spotify audio features for each track and uses K-Nearest Neighbors with cosine similarity to find songs that are closest to the one you picked.",
    contribution:
      "Built the frontend: the Streamlit interface where you choose a track and get your recommendations back.",
    highlights: [
      "Content-based, so it works from the song's own audio features",
      "KNN with cosine similarity ranks the closest tracks",
      "Interactive Streamlit interface",
    ],
    links: [
      {
        label: "WEBSITE",
        url: "https://music-recommender-machine-learning-final-project-tvwau93gk66ms.streamlit.app/",
      },
      { label: "GITHUB", 
        url: "https://github.com/Willer312/Music-Recommender-Machine-Learning-Final-Project" 
      },
    ],
    img: Img4,
    rotate: "4deg",
    borderColor: "border-[#d40000]",
  },
  {
    id: 5,
    title: "Atrial Fibrillation Detection",
    role: "Writing & Research",
    desc: "Research paper on ECG-based Atrial Fibrillation detection using machine learning classifiers like Random Forest, SVM, and Logistic Regression.",
    tags: ["ECG", "Random Forest", "SVM", "Logistic Regression", "Research Paper"],
    overview:
      "A research paper on detecting Atrial Fibrillation (AFib) from ECG signals with machine learning. It looks at how classifiers such as Random Forest, SVM and Logistic Regression perform on the task.",
    contribution:
      "Handled the writing and research: drafting sections, finding recent sources, and checking that every citation actually supports the claim it is attached to.",
    highlights: [
      "ECG-based AFib detection with classical ML classifiers",
      "Sources checked so citations match their claims",
    ],
    links: [
      {
        label: "READ PAPER",
        url: "https://www.sciencedirect.com/science/article/pii/S1877050926029844",
      },
    ],
    img: Img5,
    rotate: "-4deg",
    borderColor: "border-white",
  },
  {
    id: 6,
    title: "Cold Chain Risk & Failure Analytics",
    role: "Lead ML & Supply Chain Engineer",
    desc: "Predictive risk modeling and automated decision advisory system to prevent thermal excursions and silent failures in cold chain logistics.",
    tags: ["XGBoost", "Python", "Predictive Risk Modeling", "Logistics", "Machine Learning"],
    overview:
      "An end-to-end analytical framework and web advisory interface for evaluating temperature-controlled shipment risks. The system utilizes gradient boosting to calculate real-time failure probabilities, trigger risk-adjusted thresholds, and recommend actionable packaging and routing mitigations.",
    contribution:
      "Designed and trained the XGBoost classifier (ROC-AUC: 0.8446, PR-AUC: 0.5659) utilizing cost-sensitive optimization (3.5:1 FN/FP cost ratio). Built the dynamic JS-based dashboard, data pipeline, and integrated GDACS disaster geofencing and real-time weather risk scoring.",
    highlights: [
      "Cost-sensitive XGBoost model optimized for silent failure detection",
      "Real-time risk scoring using transit days, fill ratios, and transfer legs",
      "Automated advisory system triggering high-risk and manual review thresholds",
    ],
    links: [
      {
        label: "WEBSITE",
        url: "#overview",
      },
      {
        label: "GITHUB",
        url: "#model",
      },
    ],
    img: Img6,
    rotate: "-4deg",
    borderColor: "border-[#d40000]",
  },
];

function Section({ title, children }) {
  return (
    <section className="mt-6">
      <h3 className="mb-3 inline-block border-b-2 border-[#d40000] text-xl font-black italic uppercase tracking-widest text-white">
        {title}
      </h3>
      {children}
    </section>
  );
}

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" || e.key === "Backspace") {
        e.stopPropagation();
        onClose();
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 80, opacity: 0, rotate: 3, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, rotate: -0.6, scale: 1 }}
        exit={{ y: 80, opacity: 0, rotate: 3, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
        className="relative max-h-[88vh] w-full max-w-3xl overflow-y-auto border-4 border-white bg-black shadow-[12px_12px_0px_#d40000] scrollbar-thin scrollbar-thumb-red-600 scrollbar-track-black"
      >
        <div className="relative h-56 w-full overflow-hidden border-b-4 border-white bg-neutral-900">
          <img
            src={project.img}
            alt={project.title}
            className="h-full w-full object-cover contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          <span className="absolute bottom-3 left-4 border border-white bg-black px-2 py-0.5 text-xs font-black text-white">
            0{project.id}
          </span>
          <button
            onClick={onClose}
            className="absolute right-3 top-3 -skew-x-6 cursor-pointer border-2 border-white bg-[#d40000] px-4 py-1 text-base font-black text-white transition-colors hover:bg-white hover:text-black focus:outline-none"
          >
            <span className="inline-block skew-x-6">✕ ESC</span>
          </button>
        </div>

        <div className="p-6 md:p-8">
          <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white [text-shadow:_4px_4px_0_#d40000] md:text-5xl">
            {project.title}
          </h2>
          <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-1">
            <span className="text-sm font-black uppercase tracking-widest text-[#d40000]">
              ROLE: {project.role}
            </span>
            <span className="font-mono text-xs italic tracking-widest opacity-50">
              // STATUS: COMPLETED | 2026
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="-skew-x-6 border-2 border-white bg-black px-3 py-0.5 text-xs font-black uppercase tracking-wider text-white"
              >
                <span className="inline-block skew-x-6">{tag}</span>
              </span>
            ))}
          </div>

          <Section title="Overview">
            <p className="text-sm font-medium leading-relaxed text-gray-200 md:text-base">
              {project.overview}
            </p>
          </Section>

          <Section title="My Contribution">
            <p className="text-sm font-medium leading-relaxed text-gray-200 md:text-base">
              {project.contribution}
            </p>
          </Section>

          <Section title="Highlights">
            <ul className="flex flex-col gap-2 text-sm font-bold text-gray-200 md:text-base">
              {project.highlights.map((h) => (
                <li key={h} className="flex gap-3">
                  <span className="font-black text-[#d40000]">[◉]</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </Section>

          <div className="mt-8 flex flex-wrap gap-4 border-t-2 border-dashed border-neutral-700 pt-6">
            {project.links.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => playSound(changeAudio)}
                onClick={() => playSound(selectAudio)}
                whileHover={{ x: 6 }}
                className={`inline-flex -skew-x-6 cursor-pointer items-center border-2 border-white px-6 py-2 text-lg font-black italic uppercase tracking-wider shadow-[4px_4px_0px_rgba(255,255,255,0.25)] transition-colors hover:bg-white hover:text-black ${
                  i === 0 ? "bg-[#d40000] text-white" : "bg-black text-white"
                }`}
              >
                <span className="inline-block skew-x-6">
                  {i === 0 ? "▶" : "◆"} {link.label}
                </span>
              </motion.a>
            ))}
          </div>

          <div className="mt-6 flex h-2 gap-1 opacity-60">
            <div className="w-16 bg-white"></div>
            <div className="w-3 bg-[#d40000]"></div>
            <div className="w-2 bg-white"></div>
            <div className="w-28 bg-white"></div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsList() {
  const [selected, setSelected] = useState(null);

  const openProject = (project) => {
    playSound(selectAudio);
    setSelected(project);
  };

  const closeProject = useCallback(() => {
    playSound(backAudio);
    setSelected(null);
  }, []);

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
          <motion.div
            key={project.id}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && openProject(project)}
            onMouseEnter={() => playSound(changeAudio)}
            onClick={() => openProject(project)}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, rotate: "0deg", zIndex: 40 }}
            style={{ transform: `rotate(${project.rotate})` }}
            className={`bg-black/80 p-4 border-4 ${project.borderColor} shadow-[8px_8px_0px_rgba(255,255,255,0.1)] hover:shadow-[-8px_8px_0px_#d40000] hover:bg-white hover:text-black focus:outline-none focus-visible:shadow-[-8px_8px_0px_#d40000] transition-all duration-200 cursor-pointer group flex flex-col justify-between`}
          >
            <div>
              <div className="w-full h-44 bg-neutral-900 border-2 border-black overflow-hidden relative mb-4">
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-full object-cover contrast-125 transition-all duration-300 group-hover:scale-110"
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

              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="-skew-x-6 border border-neutral-600 bg-neutral-900 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-gray-300 transition-colors group-hover:border-black group-hover:bg-black group-hover:text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>
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
                  DETAILS+
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {createPortal(
        <AnimatePresence>
          {selected && <ProjectModal key={selected.id} project={selected} onClose={closeProject} />}
        </AnimatePresence>, 
        document.body
      )}
    </div>
  );
}