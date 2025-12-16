"use client";
import React, { useMemo, useState, useEffect } from "react";
import { Modal } from "antd";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function TeacherReservationLessonModal({
  open,
  setOpen,
  data,
  onConfirm, // optional: function({ date, time, timezone })
}) {
  const [month, setMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [selectedDate, setSelectedDate] = useState(null); // "YYYY-MM-DD"
  const [selectedTime, setSelectedTime] = useState(null);
  const [timezone, setTimezone] = useState(data?.timezone || "UTC");


  useEffect(() => {
    if (open) {
      setSelectedDate(null);
      setSelectedTime(null);
      setTimezone(data?.timezone || "UTC");
    }
  }, [open, data?.timezone]);

  const monthLabel = month.toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });

  const goPrev = () => {
    const m = new Date(month);
    m.setMonth(m.getMonth() - 1);
    setMonth(m);
  };
  const goNext = () => {
    const m = new Date(month);
    m.setMonth(m.getMonth() + 1);
    setMonth(m);
  };

  const daysGrid = useMemo(() => {
    const first = new Date(month.getFullYear(), month.getMonth(), 1);
    const startDay = (first.getDay() + 6) % 7; // Mon=0 … Sun=6

    const cells = [];
    const startDate = new Date(first);
    startDate.setDate(first.getDate() - startDay);

    for (let i = 0; i < 42; i++) {
      const d = new Date(startDate);
      d.setDate(startDate.getDate() + i);
      const toLocalISO = (date) => {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, "0");
        const d = String(date.getDate()).padStart(2, "0");
        return `${y}-${m}-${d}`;
      };
      const iso = toLocalISO(d);

      const isCurrentMonth = d.getMonth() === month.getMonth();
      const isToday = iso === new Date().toISOString().slice(0, 10);
      const hasSlots = !!data?.slots?.[iso]?.length;
      cells.push({ date: d, iso, isCurrentMonth, isToday, hasSlots });
    }
    return cells;
  }, [month, data?.slots]);

  const timesForSelectedDate = useMemo(() => {
    if (!selectedDate) return [];
    return data?.slots?.[selectedDate] || [];
  }, [selectedDate, data?.slots]);

  const closeModal = () => setOpen(false);

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) return;
    onConfirm
      ? onConfirm({ date: selectedDate, time: selectedTime, timezone })
      : console.log({ date: selectedDate, time: selectedTime, timezone });
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onCancel={closeModal}
      footer={null}
      centered
      width={920}
      // destroyOnClose
      // bodyStyle={{ padding: 0,zIndex:"99999" ,background: "transparent" }}
    >
      <div className="bg-white rounded-3xl overflow-hidden">
        <div className="px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Calendar */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-gray-200">
                {/* Calendar header */}
                <div className="flex items-center justify-between p-4">
                  <button
                    onClick={goPrev}
                    className="h-9 w-9 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700"
                    aria-label="Previous month"
                  >
                    <ChevronLeft />
                  </button>
                  <div className="text-base font-semibold text-gray-900">
                    {monthLabel}
                  </div>
                  <button
                    onClick={goNext}
                    className="h-9 w-9 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700"
                    aria-label="Next month"
                  >
                    <ChevronRight />
                  </button>
                </div>

                {/* Weekdays */}
                <div className="grid grid-cols-7 gap-px border-t border-gray-200 bg-gray-200">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                    (d) => (
                      <div
                        key={d}
                        className="bg-white py-2 text-center text-xs font-medium text-gray-500"
                      >
                        {d}
                      </div>
                    )
                  )}
                </div>

                {/* Days */}
                <div className="grid grid-cols-7 gap-px bg-gray-200">
                  {daysGrid.map((d) => {
                    const isSelected = selectedDate === d.iso;
                    const disabled =
                      !d.hasSlots ||
                      d.date < new Date(new Date().toDateString());
                    return (
                      <button
                        key={d.iso}
                        onClick={() => {
                          if (disabled) return;
                          setSelectedDate(d.iso);
                          setSelectedTime(null);
                        }}
                        className={[
                          "relative bg-white aspect-square p-2 text-sm transition",
                          !d.isCurrentMonth ? "text-gray-300" : "text-gray-800",
                          disabled
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-primary/5",
                          isSelected ? "ring-2 ring-primary/60" : "",
                        ].join(" ")}
                      >
                        <span
                          className={[
                            "inline-flex h-7 w-7 items-center justify-center rounded-full",
                            d.isToday
                              ? "bg-primary/10 text-primary font-semibold"
                              : "",
                            isSelected ? "bg-primary text-white" : "",
                          ].join(" ")}
                        >
                          {d.date.getDate()}
                        </span>

                        {/* Availability dot */}
                        {d.hasSlots && (
                          <span className="absolute bottom-2 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-secondary" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Time slots */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-base font-semibold text-gray-900">
                  {selectedDate
                    ? `Available times for ${selectedDate}`
                    : "Select a date"}
                </h4>
                {/* <div className="text-xs text-gray-500">({timezone})</div> */}
              </div>

              <div className="rounded-2xl border border-gray-200 p-4 min-h-[260px]">
                {!selectedDate ? (
                  <div className="h-full flex items-center justify-center text-gray-500 text-sm">
                    Pick a date on the calendar to see available times.
                  </div>
                ) : timesForSelectedDate.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-gray-500 text-sm">
                    No times available for this date.
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {timesForSelectedDate.map((t) => {
                      const isSel = selectedTime === t;
                      return (
                        <button
                          key={t}
                          onClick={() => setSelectedTime(t)}
                          className={[
                            "px-3 py-2 rounded-xl border text-sm font-medium transition",
                            isSel
                              ? "bg-primary text-white border-primary"
                              : "bg-white border-gray-200 hover:border-primary/50 text-gray-800",
                          ].join(" ")}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Mobile timezone select */}
              <div className="mt-3 sm:hidden">
                <label className="block text-xs text-gray-500 mb-1">
                  Timezone
                </label>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/40"
                >
                  <option value="UTC">UTC</option>
                  <option value="Africa/Cairo">Africa/Cairo</option>
                  <option value="Asia/Riyadh">Asia/Riyadh</option>
                  <option value="Europe/London">Europe/London</option>
                  <option value="America/New_York">America/New_York</option>
                </select>
              </div>

              {/* Actions */}
              <div className="mt-4 flex items-center justify-end gap-3">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={!selectedDate || !selectedTime}
                  className={[
                    "px-4 py-2 rounded-xl text-white font-semibold transition",
                    !selectedDate || !selectedTime
                      ? "bg-primary/50 cursor-not-allowed"
                      : "bg-primary hover:brightness-95 active:brightness-90",
                  ].join(" ")}
                >
                  Confirm Reservation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
