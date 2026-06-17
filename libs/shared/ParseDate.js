export function toDate(input) {
  if (!input) return null;
  if (input instanceof Date) return input;

  const s = String(input).trim().replace(/^"|"$/g, "");

  // SQL: "2025-11-30 09:48:55" -> نخليه ISO عشان Date يفهمه
  if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(s)) {
    // ده هيتفسر كـ local time
    const ms = Date.parse(s.replace(" ", "T"));
    return Number.isNaN(ms) ? null : new Date(ms);
  }

  const ms = Date.parse(s);
  return Number.isNaN(ms) ? null : new Date(ms);
}

// 1) "March 15, 2024"
export function formatToLongEnglish(input, timeZone = "Africa/Cairo") {
  const d = toDate(input);
  if (!d) return "";

  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
}

// 2) "2025-11-30 09:48:55"
export function formatToSqlDateTime(input, { useUTC = false } = {}) {
  const d = toDate(input);
  if (!d) return "";

  const pad = (n) => String(n).padStart(2, "0");

  const Y = useUTC ? d.getUTCFullYear() : d.getFullYear();
  const M = (useUTC ? d.getUTCMonth() : d.getMonth()) + 1;
  const D = useUTC ? d.getUTCDate() : d.getDate();
  const h = useUTC ? d.getUTCHours() : d.getHours();
  const m = useUTC ? d.getUTCMinutes() : d.getMinutes();
  const s = useUTC ? d.getUTCSeconds() : d.getSeconds();

  return `${Y}-${pad(M)}-${pad(D)} ${pad(h)}:${pad(m)}:${pad(s)}`;
}
