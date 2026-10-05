import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { playSound, selectAudio, changeAudio } from "./utils/sound-manager";

const ITEMS = ["PROFILE", "STATUS", "PROJECTS", "CERTIFICATE"];
const R = 420;        // Radius
const STEP = 15;    // Degrees per menu item
const ITEM_H = 65;    // Item height
const BOX_W = 520;    
const BOX_H = 560;
const CY = BOX_H / 2; // Circle center Y
const CX = -R + 150;  // Circle left X
const PUSH = 120;     // Active item displacement

export default function Menu({ setPage }) {
  const [active, setActive] = useState(0);  
  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key.toLowerCase();
      if (key === "s" || key === "d" || key === "arrowdown") {
        setActive((prev) => {
          playSound(changeAudio);
          return (prev + 1) % ITEMS.length;
        });
      } else if (key === "w" || key === "a" || key === "arrowup") {
        setActive((prev) => {
          playSound(changeAudio);
          return (prev - 1 + ITEMS.length) % ITEMS.length;
        });
      } else if (key === "enter" || key === " ") {
        playSound(selectAudio);
        setPage(ITEMS[active]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [active, setPage]);

  return (
    <div
      className="relative z-20 select-none"
      style={{ width: BOX_W, height: BOX_H }}
    >
      {ITEMS.map((item, i) => {
        const theta = (i - (ITEMS.length - 1) / 2) * STEP;
        const rad = (theta * Math.PI) / 180;
        const left = CX + R * Math.cos(rad);
        const top = CY + R * Math.sin(rad) - ITEM_H / 2;
        const isActive = active === i;

        return (
          <motion.div
            key={item}
            onMouseEnter={() => {
              if (active !== i) {
                setActive(i);
                playSound(changeAudio);
              }
            }}
            onClick={() => {
              playSound(selectAudio);
              setPage(item);
            }}
            initial={{ opacity: 0, x: -60, y: 0, rotate: theta }}
            animate={{
              opacity: 1,
              x: isActive ? PUSH * Math.cos(rad) : 0,
              y: isActive ? PUSH * Math.sin(rad) : 0,
              rotate: theta,
            }}
            transition={{ type: "spring", stiffness: 250, damping: 20 }}
            style={{
              position: "absolute",
              left,
              top,
              height: ITEM_H,
              transformOrigin: "0% 50%",
            }}
            className={`
              flex cursor-pointer items-center whitespace-nowrap pl-4
              text-5xl font-black leading-none tracking-wider
              transition-colors duration-200
              ${isActive ? "text-white" : "text-gray-500"}
            `}
          >
            {isActive && (
              <motion.div
                key="peekLine"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="absolute left-0 top-2 bottom-2 w-2 bg-[#d40000] shadow-[0_0_15px_#d40000]"
              />
            )}

            {item}
          </motion.div>
        );
      })}
    </div>
  );
}

//contact
const CONTACTS = [
  { label: "PHONE", hint: "+62 813-8881-2816", link: "https://wa.me/6281388812816" },
  { label: "EMAIL", hint: "vittorio.dinata@gmail.com", link: "mailto:vittorio.dinata@gmail.com" },
  { label: "GITHUB", hint: "github.com/vittoriodinata", link: "https://github.com/vittoriodinata" },
  {
    label: "LINKEDIN",
    hint: "linkedin.com/in/vittorio-dinata",
    link: "https://www.linkedin.com/in/vittorio-dinata-198300325/",
  },
];

export function ContactBar() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: 40, transition: { duration: 0.3 } }}
      className="absolute bottom-8 right-20 z-20 flex select-none items-end gap-5"
    >
      {CONTACTS.map((c, i) => (
        <motion.a
          key={c.label}
          href={c.link}
          target={c.link.startsWith("http") ? "_blank" : undefined}
          rel="noopener noreferrer"
          onMouseEnter={() => playSound(changeAudio)}
          onClick={(e) => {
            playSound(selectAudio);
            e.currentTarget.blur();
          }}
          initial={{ y: 60, opacity: 0, rotate: 4 }}
          animate={{ y: 0, opacity: 1, rotate: i % 2 ? 1.5 : -1.5 }}
          transition={{ type: "spring", stiffness: 160, damping: 16, delay: 0.7 + i * 0.08 }}
          whileHover={{ y: -6, rotate: 0, transition: { type: "spring", stiffness: 300, damping: 18 } }}
          className="group relative block cursor-pointer focus:outline-none"
        >
          {/* skewed button (skew lives on inner spans so it doesn't fight framer's transforms) */}
          <span className="relative block -skew-x-12 border-2 border-white bg-black px-6 py-2 shadow-[4px_4px_0px_rgba(0,0,0,0.6)] transition-all duration-200 group-hover:bg-white group-hover:shadow-[-6px_6px_0px_#d40000]">
            <span className="block skew-x-12 text-lg font-black italic uppercase tracking-wider text-white transition-colors duration-200 group-hover:text-black">
              {c.label}
            </span>
            <span className="absolute -right-1 -top-1 h-2.5 w-2.5 bg-[#d40000] transition-colors duration-200 group-hover:bg-black" />
          </span>

          {/* hover tag showing the actual contact */}
          <span className="pointer-events-none absolute bottom-full left-1/2 mb-3 -translate-x-1/2 whitespace-nowrap bg-black px-3 py-1 text-xs font-bold tracking-wider text-[#d40000] opacity-0 shadow-[4px_4px_0px_#900000] transition-all duration-200 group-hover:-translate-y-1 group-hover:opacity-100">
            {c.hint}
          </span>
        </motion.a>
      ))}
    </motion.div>
  );
}
