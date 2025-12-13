

import React, { useEffect, useMemo, useState } from "react";
import { X, Calendar, Clock, Phone, Video, Send, User, MessageSquare } from "lucide-react";

/**
 * OralMeetingModal
 * ---------------------------------------------------------
 * A drop-in replacement for the placement-test modal UI.
 * Collects name, email, contact method, date, time, timezone,
 * and notes to request an oral meeting.
 *
 * Props:
 * - open: boolean
 * - onClose: () => void
 * - onSubmit?: (payload) => Promise<void> | void  // receive validated data
 * - initial?: Partial<payload>
 *
 * Styling: TailwindCSS
 */
export default function OralMeetingModal({ open, onClose, onSubmit, initial = {} }) {
  const [form, setForm] = useState({
    platform: initial.platform || "Zoom",
    date: initial.date || "",
    time: initial.time || "",
    timezone: initial.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
    notes: initial.notes || "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!open) {
      setSuccess(false);
      setSubmitting(false);
      setErrors({});
    }
  }, [open]);

  const tzList = useMemo(() => {
    // Minimal TZ list. You can swap with a full list if needed.
    return [
      "Africa/Cairo",
      "Europe/London",
      "Asia/Riyadh",
      "Asia/Dubai",
      "Asia/Amman",
      "Europe/Berlin",
      "America/New_York",
      Intl.DateTimeFormat().resolvedOptions().timeZone,
    ].filter((v, i, a) => !!v && a.indexOf(v) === i);
  }, []);

  const platforms = [
    { label: "Zoom", value: "Zoom", icon: Video },
    { label: "Google Meet", value: "Google Meet", icon: Video },
    { label: "WhatsApp", value: "WhatsApp", icon: Phone },
    { label: "Phone Call", value: "Phone Call", icon: Phone },
  ];

  function update(k, v) {
    setForm((s) => ({ ...s, [k]: v }));
  }

  function validate() {
    const e = {};
    if (!form.date) e.date = "Select a date";
    if (!form.time) e.time = "Select a time";
    if (!form.timezone) e.timezone = "Select a timezone";
    return e;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    try {
      setSubmitting(true);
      const payload = { ...form };
      // Option 1: delegate to parent handler
      if (onSubmit) await onSubmit(payload);
      // Option 2 (example): send to your API endpoint
      // await fetch("/api/meetings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });

      setSuccess(true);
    } catch (err) {
      setErrors({ submit: err?.message || "Failed to submit. Try again." });
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-teal-50">
          <div>
            <p className="text-xs text-gray-500">Egyptian Arabic Complete Course</p>
            <h2 className="text-xl font-semibold text-gray-800">Request an Oral Meeting</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white text-gray-600" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">
          {success ? (
            <SuccessState onClose={onClose} />
          ) : (
            <>
              <div className="grid md:grid-cols-2 gap-4">


         
            <div className="col-span-2">

                <Field label="Preferred platform">
                  <div className="grid grid-cols-2 gap-2">
                    {platforms.map((p) => (
                      <button
                      type="button"
                      key={p.value}
                      onClick={() => update("platform", p.value)}
                      className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-sm transition ${
                          form.platform === p.value
                          ? "bg-teal-50 border-teal-300 text-teal-800"
                          : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                        }`}
                        aria-pressed={form.platform === p.value}
                        >
                        <p.icon className="w-4 h-4" /> {p.label}
                      </button>
                    ))}
                  </div>
                </Field>
                    </div>

                <Field label="Meeting date" error={errors.date}>
                  <div className="relative">
                    <Calendar className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                    <input
                      type="date"
                      value={form.date}
                      onChange={(e) => update("date", e.target.value)}
                      className="w-full rounded-xl border-gray-200 pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </Field>

                <Field label="Time" error={errors.time}>
                  <div className="relative">
                    <Clock className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                    <input
                      type="time"
                      value={form.time}
                      onChange={(e) => update("time", e.target.value)}
                      className="w-full rounded-xl border-gray-200 pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </Field>
                
                <div className="col-span-2">

                <Field label="Timezone" error={errors.timezone}>
                  <select
                    value={form.timezone}
                    onChange={(e) => update("timezone", e.target.value)}
                    className="w-full rounded-xl border-gray-200 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                    {tzList.map((tz) => (
                      <option key={tz} value={tz}>{tz}</option>
                    ))}
                  </select>
                </Field>
                    </div>

               
             
              </div>

              <Field label="Notes (optional)">
                <div className="relative">
                  <MessageSquare className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                  <textarea
                    rows={4}
                    value={form.notes}
                    onChange={(e) => update("notes", e.target.value)}
                    className="w-full rounded-xl border-gray-200 pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Tell us anything helpful (level, goals, availability)…"
                  />
                </div>
              </Field>

              {errors.submit && (
                <p className="text-sm text-red-600">{errors.submit}</p>
              )}

              <div className="flex items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-medium hover:opacity-95 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  {submitting ? "Sending…" : "Request Meeting"}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-gray-800 mb-1">{label}</span>
      {children}
      {error && <span className="block mt-1 text-xs text-red-600">{error}</span>}
    </label>
  );
}

function SuccessState({ onClose }) {
  return (
    <div className="py-10 text-center">
      <div className="mx-auto w-14 h-14 rounded-full bg-teal-100 flex items-center justify-center mb-4">
        <Send className="w-6 h-6 text-teal-700" />
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-1">Request sent!</h3>
      <p className="text-gray-600 max-w-md mx-auto">
        We’ll email you shortly to confirm the meeting time and share the call details.
      </p>
      <button onClick={onClose} className="mt-6 px-5 py-2.5 rounded-xl bg-teal-600 text-white hover:bg-teal-700">Close</button>
    </div>
  );
}

/**
 * Example usage:
 *
 * const [open, setOpen] = useState(false);
 * <button onClick={() => setOpen(true)}>Book an oral meeting</button>
 * <OralMeetingModal open={open} onClose={() => setOpen(false)} onSubmit={(data) => {
 *   // Send to backend or Zapier/Make
 *   console.log('meeting request', data);
 * }} />
 */
