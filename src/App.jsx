import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Menu from "./Menu.jsx";
import Background from "./Background.jsx";
import Profile from "./Profile.jsx";
import StatusChart from "./StatusChart.jsx";
import ProjectsList from "./Projectlist.jsx";
import ProfileView from "./Profileview.jsx";
import Contact from "./Contact.jsx";

export default function App() {
  const [currentPage, setCurrentPage] = useState("HOME");

  // keyboard_navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" || e.key === "Backspace") {
        setCurrentPage("HOME");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <main className="h-screen overflow-hidden bg-black text-white relative select-none">
      <Background />

      <div className="relative h-full w-full flex items-center justify-between px-20">
        <AnimatePresence mode="wait">
          {currentPage === "HOME" ? (
            // home_page
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
            // detail_page
            <motion.div
              key="content-page"
              initial={{ x: 300, opacity: 0, rotate: [5, 0] }}
              animate={{ x: 0, opacity: 1, rotate: 0 }}
              exit={{ x: 300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="absolute inset-0 z-30 flex flex-col justify-between p-16 bg-black/40 backdrop-blur-md"
            >
              <div className="text-left">
                <button
                  onClick={() => setCurrentPage("HOME")}
                  className="
                    cursor-pointer 
                    text-2xl 
                    font-black 
                    bg-[#800000] 
                    text-white 
                    px-6 
                    py-2 
                    rotate-[-4deg] 
                    border-2 
                    border-white 
                    hover:bg-white 
                    hover:text-black 
                    transition-all 
                    duration-200
                    shadow-[5px_5px_0px_rgba(255,255,255,0.3)]
                  "
                >
                  ◀ [BACK] ESC
                </button>
              </div>

              <div className="flex-1 flex flex-col justify-center items-center w-full mt-4">
                {currentPage === "STATUS" ? (
                  <StatusChart />
                ) : currentPage === "PROJECTS" ? (
                  <ProjectsList />
                ) : currentPage === "PROFILE" ? (
                  <ProfileView />
                ) : currentPage === "CONTACT" ? (
                  <Contact />
                ) : (
                  <div className="text-left pl-10 w-full">
                    <h1 className="text-7xl font-black italic tracking-tighter text-white drop-shadow-[5px_5px_0px_#800000] uppercase">
                      {currentPage}
                    </h1>
                  </div>
                )}
              </div>

              <div className="flex gap-1 h-3 opacity-50">
                <div className="w-20 bg-white"></div>
                <div className="w-4 bg-[#800000]"></div>
                <div className="w-2 bg-white"></div>
                <div className="w-40 bg-white"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}