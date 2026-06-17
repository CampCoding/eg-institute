export const DAY_ORDER = [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

export const isISODate = (v) => /^\d{4}-\d{2}-\d{2}$/.test(String(v || ""));

export const toISODate = (value) => {
  if (!value) return new Date().toISOString().slice(0, 10);
  if (isISODate(value)) return value;

  const d = new Date(value);
  if (!Number.isNaN(d.getTime())) return d.toISOString().slice(0, 10);

  return new Date().toISOString().slice(0, 10);
};

export const parseJwt = (token) => {
  try {
    const parts = String(token || "").split(".");
    if (parts.length !== 3) return null;
    const payload = JSON.parse(atob(parts[1]));
    return payload;
  } catch {
    return null;
  }
};

// "09:00:00" | "09:00" -> "09:00"
export const toHHMM = (t) => {
  if (!t) return "";
  const [hh = "00", mm = "00"] = String(t).split(":");
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
};

// "09:00" -> "09:00:00"
export const toHHMMSS = (hhmm) => {
  if (!hhmm) return "";
  const [hh = "00", mm = "00"] = String(hhmm).split(":");
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}:00`;
};

export const timeToMinutes = (hhmm) => {
  const [h = "0", m = "0"] = String(hhmm || "0:0").split(":");
  return Number(h) * 60 + Number(m);
};

export const minutesToHHMM = (mins) => {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
};

export const mergeWindows = (windows) => {
  if (!Array.isArray(windows) || windows.length === 0) return [];

  const dayGroups = {};
  windows.forEach((w) => {
    const day = w.day_of_week;
    if (!dayGroups[day]) dayGroups[day] = [];
    dayGroups[day].push({
      ...w,
      startMin: timeToMinutes(toHHMM(w.start_time)),
      endMin: timeToMinutes(toHHMM(w.end_time)),
    });
  });

  const merged = [];

  Object.entries(dayGroups).forEach(([day, dayWindows]) => {
    dayWindows.sort((a, b) => a.startMin - b.startMin);

    let dayMerged = [];

    for (const w of dayWindows) {
      const last = dayMerged[dayMerged.length - 1];

      if (!last) {
        dayMerged.push({ ...w });
        continue;
      }

      if (w.startMin <= last.endMin) {
        last.endMin = Math.max(last.endMin, w.endMin);
      } else {
        dayMerged.push({ ...w });
      }
    }

    dayMerged.forEach((w, idx) => {
      merged.push({
        key: `${day}-${idx}`,
        day_of_week: day,
        window_start: minutesToHHMM(w.startMin),
        window_end: minutesToHHMM(w.endMin),
      });
    });
  });

  return merged;
};

export const format24to12 = (time24) => {
  if (!time24) return "";
  const [hours, minutes] = time24.split(":");
  const hour = parseInt(hours);
  const ampm = hour < 12 ? "AM" : "PM";
  const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${hour12}:${minutes} ${ampm}`;
};

export const validateTimeInWindow = (time, windowStart, windowEnd) => {
  const timeMins = timeToMinutes(time);
  const startMins = timeToMinutes(windowStart);
  const endMins = timeToMinutes(windowEnd);

  return timeMins >= startMins && timeMins <= endMins;
};
