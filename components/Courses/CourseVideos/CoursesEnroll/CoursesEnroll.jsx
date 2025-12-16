{picked && pickedObj && (() => {
  const slots = buildTimeSlots(it.window_start, it.window_end);
  const startSlots = slots.slice(0, -1); // start cannot be the last one (window_end)

  const startVal = pickedObj.start_time || it.window_start;
  const endVal = pickedObj.end_time || it.window_end;

  return (
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">
          Preferred start
        </label>
        <select
          value={startVal}
          onChange={(e) => updatePickedTime(it.key, "start_time", e.target.value)}
          className="w-full rounded-xl border border-gray-200 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
        >
          {startSlots.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">
          Preferred end
        </label>
        <select
          value={endVal}
          onChange={(e) => updatePickedTime(it.key, "end_time", e.target.value)}
          className="w-full rounded-xl border border-gray-200 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
        >
          {slots.map((t) => {
            const disabled = timeToMinutes(t) <= timeToMinutes(startVal);
            return (
              <option key={t} value={t} disabled={disabled}>
                {t}
              </option>
            );
          })}
        </select>
      </div>

      <div className="sm:col-span-2 text-xs text-gray-500">
        Must stay inside:{" "}
        <span className="font-semibold">
          {it.window_start} - {it.window_end}
        </span>
      </div>
    </div>
  );
})()}
