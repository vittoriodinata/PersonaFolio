import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playSound, backAudio } from "./utils/sound-manager.js";

import Menu, { ContactBar } from "./menu.jsx";
import Background from "./background.jsx";
import Profile from "./menu-profile.jsx";
import StatusChart from "./status-chart.jsx"; 
import ProjectsList from "./project-list.jsx";
import ProfileView from "./profile-view.jsx";
import Certificate from "./certificate.jsx";

// Page mapping lookup object
const PAGE_COMPONENTS = {
  STATUS: <StatusChart />,
  PROJECTS: <ProjectsList />,
  PROFILE: <ProfileView />,
  CERTIFICATE: <Certificate />,
};

export default function App() {
  const [currentPage, setCurrentPage] = useState("HOME");

  const handleGoHome = () => {
    playSound(backAudio);
    setCurrentPage("HOME");
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (currentPage !== "HOME" && (e.key === "Escape" || e.key === "Backspace")) {
        handleGoHome();
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage]);

  const renderContent = () => {
    return (
      PAGE_COMPONENTS[currentPage] || (
        <div className="text-left pl-10 w-full">
          <h1 className="text-7xl font-black italic tracking-tighter text-white drop-shadow-[5px_5px_0px_#800000] uppercase">
            {currentPage}
          </h1>
        </div>
      )
    );
  };

  return (
    <main className="h-screen overflow-hidden bg-black text-white relative select-none">
      <Background />

      <div className="relative h-full w-full flex items-center justify-between px-20">
        <AnimatePresence mode="wait">
          {currentPage === "HOME" ? (
            <motion.div
              key="home-page"
              initial={{ opacity: 1 }}
              exit={{ x: -200, opacity: 0, transition: { duration: 0.3 } }}
              className="w-full flex items-center justify-between"
            >
              <Menu setPage={setCurrentPage} />
              <div className="relative z-20">
                <Profile />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="content-page"
              initial={{ x: 300, opacity: 0, rotate: 5 }}
              animate={{ x: 0, opacity: 1, rotate: 0 }}
              exit={{ x: 300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="absolute inset-0 z-30 flex flex-col justify-between p-16 bg-black/40 backdrop-blur-md"
            >
              <div className="text-left">
                <button
                  onClick={handleGoHome}
                  className="cursor-pointer text-2xl font-black bg-[#800000] text-white px-6 py-2 
                  rotate-[-4deg] border-2 border-white hover:bg-white hover:text-black 
                  transition-all duration-200 shadow-[5px_5px_0px_rgba(255,255,255,0.3)]"
                >
                  ◀ [BACK] ESC
                </button>
              </div>

              <div className="flex-1 flex flex-col justify-center items-center w-full mt-4">
                {renderContent()}
              </div>
              
            </motion.div>
          )}
        </AnimatePresence>

        {/* contact buttons, only on the home page */}
        <AnimatePresence>
          {currentPage === "HOME" && <ContactBar key="contact-bar" />}
        </AnimatePresence>
      </div>
    </main>
  );
}