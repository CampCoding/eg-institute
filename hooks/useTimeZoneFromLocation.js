import { useEffect, useRef, useState } from "react";

function haversineMeters(a, b) {
  const R = 6371000;
  const toRad = (d) => (d * Math.PI) / 180;

  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;

  return 2 * R * Math.asin(Math.sqrt(x));
}

export function useTimeZoneFromLocation({
  distanceThresholdMeters = 2000, // reduce API calls if user moves slightly
  watchOptions = { enableHighAccuracy: true, maximumAge: 30000, timeout: 10000 },
} = {}) {
  const [timeZone, setTimeZone] = useState("");
  const [coords, setCoords] = useState(null);
  const [error, setError] = useState("");
  const lastCoordsRef = useRef(null);
  const lastTzRef = useRef("");

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported on this device.");
      return;
    }

    const id = navigator.geolocation.watchPosition(
      async (pos) => {
        const next = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setCoords(next);

        const prev = lastCoordsRef.current;
        if (prev) {
          const moved = haversineMeters(prev, next);
          if (moved < distanceThresholdMeters) return;
        }
        lastCoordsRef.current = next;

        try {
          const res = await fetch(`/api/timezone?lat=${next.lat}&lng=${next.lng}`);
          const data = await res.json();

          if (!res.ok) throw new Error(data?.error || "Timezone lookup failed");

          if (data?.timeZone && data.timeZone !== lastTzRef.current) {
            lastTzRef.current = data.timeZone;
            setTimeZone(data.timeZone);
          }
        } catch (e) {
          setError(e?.message || "Failed to resolve timezone.");
        }
      },
      (e) => {
        setError(e.message || "Location permission denied.");
      },
      watchOptions
    );

    return () => navigator.geolocation.clearWatch(id);
  }, [distanceThresholdMeters, watchOptions]);

  return { timeZone, coords, error };
}
