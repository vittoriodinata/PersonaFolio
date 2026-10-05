import { useEffect, useReducer } from "react";
import {
  audio,
  player,
  TRACKS,
  subscribe,
  togglePlay,
  next,
  prev,
  toggleShuffle,
  cycleRepeat,
  seekToRatio,
} from "./utils/music-manager";

const fmt = (s) =>
  !isFinite(s)
    ? "0:00"
    : `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

const act = (fn) => (e) => {
  fn();
  e.currentTarget.blur();
};

const Icon = ({ children, stroke = false }) => (
  <svg
    viewBox="0 0 24 24"
    className="h-5 w-5"
    fill={stroke ? "none" : "currentColor"}
    stroke={stroke ? "currentColor" : "none"}
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
);

export default function MusicPlayer({ className = "" }) {
  const [, rerender] = useReducer((n) => n + 1, 0);

  useEffect(() => subscribe(rerender), []);

  const track = TRACKS[player.index];
  const playing = !audio.paused;
  const duration = audio.duration;
  const pct =
    isFinite(duration) && duration > 0 ? (audio.currentTime / duration) * 100 : 0;

  const seek = (e) => {
    if (!isFinite(audio.duration)) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    seekToRatio(ratio);
  };

  const ctrl = "relative flex h-9 w-9 items-center justify-center transition-colors focus:outline-none";
  const dot = <span className="absolute bottom-0 h-1 w-1 rounded-full bg-[#d40000]" />;

  return (
    <div
      className={`w-full rotate-[-0.5deg] select-none border-[3px] border-white bg-black p-4 text-white shadow-[-8px_8px_0_rgba(0,0,0,0.45)] ${className}`}
    >
      {/* cover + title */}
      <div className="flex items-center gap-3">
        <div
          className="relative h-14 w-14 shrink-0 overflow-hidden bg-neutral-900"
          style={{ backgroundImage: "repeating-linear-gradient(135deg,#d40000 0 8px,#8b0000 8px 16px)" }}
        >
          {track.cover && (
            <img
              key={track.src}
              src={track.cover}
              alt={track.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-base font-black">{track.title}</div>
          <div className="truncate text-sm font-bold text-gray-400">{track.artist}</div>
        </div>
      </div>

      {/* controls */}
      <div className="mt-3 flex items-center justify-center gap-4">
        <button
          onClick={act(toggleShuffle)}
          aria-label="Shuffle"
          aria-pressed={player.shuffle}
          className={`${ctrl} ${player.shuffle ? "text-[#d40000]" : "text-gray-400 hover:text-white"}`}
        >
          <Icon stroke>
            <path d="M3 17h3.5a4 4 0 003.2-1.6L14 9.6A4 4 0 0117.2 8H21M3 7h3.5a4 4 0 013.2 1.6M14 14.4a4 4 0 003.2 1.6H21M18 5l3 3-3 3M18 13l3 3-3 3" />
          </Icon>
          {player.shuffle && dot}
        </button>

        <button onClick={act(prev)} aria-label="Previous track" className={`${ctrl} text-gray-400 hover:text-white`}>
          <Icon>
            <path d="M6 6h2.5v12H6zM9.5 12L19 18V6z" />
          </Icon>
        </button>

        <button
          onClick={act(togglePlay)}
          aria-label={playing ? "Pause" : "Play"}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-black transition-transform hover:scale-105 hover:bg-[#d40000] hover:text-white focus:outline-none"
        >
          <Icon>
            {playing ? <path d="M6 5h4v14H6zM14 5h4v14h-4z" /> : <path d="M8 5v14l11-7z" />}
          </Icon>
        </button>

        <button onClick={act(next)} aria-label="Next track" className={`${ctrl} text-gray-400 hover:text-white`}>
          <Icon>
            <path d="M15.5 6H18v12h-2.5zM5 18V6l9.5 6z" />
          </Icon>
        </button>

        <button
          onClick={act(cycleRepeat)}
          aria-label={`Repeat: ${player.repeat}`}
          className={`${ctrl} ${player.repeat === "off" ? "text-gray-400 hover:text-white" : "text-[#d40000]"}`}
        >
          <Icon stroke>
            <path d="M17 2l4 4-4 4M3 11V9a3 3 0 013-3h15M7 22l-4-4 4-4M21 13v2a3 3 0 01-3 3H3" />
          </Icon>
          {player.repeat === "one" && (
            <span className="absolute text-[9px] font-black leading-none">1</span>
          )}
          {player.repeat !== "off" && dot}
        </button>
      </div>

      {/* progress */}
      <div className="mt-1 flex items-center gap-3 text-xs font-bold text-gray-400">
        <span className="w-9 text-right">{fmt(audio.currentTime)}</span>
        <div
          className="group relative flex h-4 flex-1 cursor-pointer touch-none items-center"
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            seek(e);
          }}
          onPointerMove={(e) => e.buttons === 1 && seek(e)}
        >
          <div className="relative h-1 w-full rounded-full bg-gray-700">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-white group-hover:bg-[#d40000]"
              style={{ width: `${pct}%` }}
            />
            <div
              className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-0 group-hover:opacity-100"
              style={{ left: `${pct}%` }}
            />
          </div>
        </div>
        <span className="w-9">{fmt(duration)}</span>
      </div>
    </div>
  );
}