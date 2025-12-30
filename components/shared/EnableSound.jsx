"use client";

import { useEffect, useState } from "react";
import {
  loadNotifSoundSettings,
  setNotifMuted,
  setNotifVolume,
  playNotifSound,
} from "../../utils/notificationSound";
import { Bell, Volume2, VolumeX } from "lucide-react";

export default function SoundController() {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    loadNotifSoundSettings();
    const m = localStorage.getItem("notif_muted") === "true";
    const v = localStorage.getItem("notif_volume");
    setIsMuted(m);
    if (v) setVolume(Number(v));
  }, []);

  const handleToggleMute = async () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    setNotifMuted(newMuted);

    if (!newMuted) {
      // Play sound to unlock audio context when enabling
      await playNotifSound("alert");
    }
  };

  return (
    <div className="group transition-all">
      <div
        className=" items-center group-hover:flex hidden   gap-2 bg-white/90 backdrop-blur border shadow-lg rounded-full p-1.5 pr-4 transition-all duration-300"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <button
          type="button"
          onClick={handleToggleMute}
          className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
            isMuted
              ? "bg-gray-100 text-gray-500 hover:bg-gray-200"
              : "bg-[#02AAA0] text-white hover:bg-[#02958c]"
          }`}
          title={isMuted ? "Unmute" : "Mute"}
        >
          {!isMuted ? <Volume2 /> : <VolumeX />}
        </button>

        <div
          className={`flex items-center gap-2 overflow-hidden transition-all duration-300 ${
            isMuted ? "w-0 opacity-0" : "w-auto opacity-100"
          }`}
        >
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => {
              const v = Number(e.target.value);
              setVolume(v);
              setNotifVolume(v);
            }}
            className="w-20 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#02AAA0]"
          />
          <span className="text-xs font-medium text-gray-600 min-w-[24px]">
            {Math.round(volume * 100)}%
          </span>
        </div>

        {isMuted && (
          <span
            className="text-xs font-medium text-gray-500 whitespace-nowrap cursor-pointer"
            onClick={handleToggleMute}
          >
            Enable Sound
          </span>
        )}
      </div>
      <div className="w-14 h-14  group-hover:hidden rounded-full">
        <button
          type="button"
          onClick={handleToggleMute}
          className={`w-14 h-14 flex items-center justify-center rounded-full transition-colors ${
            isMuted
              ? "bg-gray-100 text-gray-500 hover:bg-gray-200"
              : "bg-[#02AAA0] text-white hover:bg-[#02958c]"
          }`}
          title={isMuted ? "Unmute" : "Mute"}
        >
          {!isMuted ? <Volume2 /> : <VolumeX />}
        </button>
      </div>
    </div>
  );
}

export function NotificationSoundControls() {
  return <SoundController />;
}
