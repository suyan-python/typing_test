import React from "react";

export default function TimerBar({ timeLeft, duration }) {
  const safeTime = Math.max(0, timeLeft);
  const percentage = Math.min(100, Math.max(0, (safeTime / duration) * 100));

  const mins = Math.floor(safeTime / 60);
  const secs = safeTime % 60;

  const isCritical = safeTime <= 10;
  const isWarning = safeTime <= 20 && !isCritical;

  const timerColor = isCritical
    ? "text-red-600"
    : isWarning
      ? "text-amber-600"
      : "text-gray-900";

  const progressColor = isCritical
    ? "bg-red-500"
    : isWarning
      ? "bg-amber-500"
      : "bg-[#d6b25e]";

  return (
    <div className="w-full mb-5">
      {/* Timer Header */}
      <div className="flex items-end justify-between gap-3 mb-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-1">
            Time Remaining
          </p>

          <div
            className={`text-4xl sm:text-5xl font-bold tracking-tight tabular-nums transition-colors duration-300 ${timerColor}`}
          >
            {mins}:{secs.toString().padStart(2, "0")}
          </div>
        </div>

        {/* Status */}
        <div
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${
            isCritical
              ? "bg-red-50 border-red-100 text-red-600"
              : isWarning
                ? "bg-amber-50 border-amber-100 text-amber-600"
                : "bg-[#faf8f2] border-[#eee5d0] text-[#a17d32]"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isCritical
                ? "bg-red-500 animate-pulse"
                : isWarning
                  ? "bg-amber-500"
                  : "bg-[#d6b25e]"
            }`}
          />

          {isCritical ? "Almost over" : isWarning ? "Hurry up" : "In progress"}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-linear ${progressColor}`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Progress Footer */}
      <div className="flex justify-between mt-2">
        <span className="text-[10px] text-gray-400">Assessment progress</span>

        <span className="text-[10px] font-semibold text-gray-500 tabular-nums">
          {Math.round(100 - percentage)}% elapsed
        </span>
      </div>
    </div>
  );
}
