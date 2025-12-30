"use client";

const SOUND_URL = {
  alert: "/sound/alert.mp3",
  message: "/sound/message.mp3",
};

let volume = 0.6; // 0..1
let muted = false;

export function setNotifVolume(v) {
  volume = Math.min(1, Math.max(0, v));
  localStorage.setItem("notif_volume", String(volume));
}

export function setNotifMuted(m) {
  muted = m;
  localStorage.setItem("notif_muted", String(muted));
}

export function loadNotifSoundSettings() {
  const v = localStorage.getItem("notif_volume");
  const m = localStorage.getItem("notif_muted");
  if (v !== null) volume = Number(v);
  if (m !== null) muted = m === "true";
}

export async function playNotifSound(name) {
  if (muted) return;

  // مهم: لازم يكون فيه "user gesture" مرة واحدة قبل أول play في بعض المتصفحات
  const audio = new Audio(SOUND_URL[name]);
  audio.volume = volume;

  try {
    await audio.play();
  } catch (e) {
    // لو المتصفح منع autoplay
    console.warn("Audio blocked until user interaction:", e);
  }
}
