import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { playSound, selectAudio, changeAudio, backAudio } from "./utils/soundManager";

export default function Menu({ setPage }) {
  const items = ["PROFILE", "STATUS", "PROJECTS", "CONTACT"];
  const [active, setActive] = useState(0);

  // keyboard_navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key.toLowerCase();

      if (key === "s" || key === "d" || key === "arrowdown") {
        setActive((prev) => {
          playSound(changeAudio);
          return (prev + 1) % items.length;
        });
      } else if (key === "w" || key === "a" || key === "arrowup") {
        setActive((prev) => {
          playSound(changeAudio);
          return (prev - 1 + items.length) % items.length;
        });
      } else if (key === "enter" || key === " ") {
        playSound(selectAudio);
        setPage(items[active]);
      } else if (key === "escape") {
        playSound(backAudio);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [active, items, setPage]);

  return (
    <div className="flex flex-col gap-6 relative select-none z-20">
      {items.map((item, i) => (
        <motion.div
          key={item}
          onMouseEnter={() => {
            setActive(i);
            playSound(changeAudio);
          }}
          onClick={() => {
            playSound(selectAudio);
            setPage(item);
          }}
          animate={{
            x: active === i ? 40 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 250,
            damping: 20
          }}
          className={`
            relative cursor-pointer text-5xl font-black tracking-wider rotate-[-8deg]
            transition-colors duration-200 pl-4
            ${active === i ? "text-white" : "text-gray-500"}
          `}
        >
          {active === i && (
            <motion.div
              layoutId="peekLine"
              className="absolute left-0 top-1 bottom-1 w-2 bg-[#d40000] shadow-[0_0_15px_#d40000]"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}

          {item}
        </motion.div>
      ))}
    </div>
  );
}