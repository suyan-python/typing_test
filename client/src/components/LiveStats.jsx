import React, { useMemo } from "react";

export default function LiveStats({ typed, passage, timeLeft, duration }) {
  const elapsed = Math.max(0, duration - timeLeft);

  const stats = useMemo(() => {
    // Standard typing speed: 5 characters = 1 word
    const wpm = elapsed > 0 ? Math.round((typed.length / 5 / elapsed) * 60) : 0;

    // Character-level accuracy
    let correctChars = 0;

    for (let i = 0; i < typed.length; i++) {
      if (typed[i] === passage[i]) {
        correctChars++;
      }
    }

    const accuracy =
      typed.length > 0 ? Math.round((correctChars / typed.length) * 100) : null;

    return {
      wpm,
      accuracy,
    };
  }, [typed, passage, elapsed]);

  const items = [
    {
      label: "Typing Speed",
      value: stats.wpm,
      suffix: "WPM",
      description: "Words per minute",
      icon: "⌨",
    },
    {
      label: "Accuracy",
      value: stats.accuracy !== null ? stats.accuracy : "—",
      suffix: stats.accuracy !== null ? "%" : "",
      description: "Character accuracy",
      icon: "◎",
    },
  ];

  return (
    <div className="flex items-stretch gap-3 mb-5">
      {items.map((item) => (
        <div
          key={item.label}
          className="min-w-[105px] bg-white border border-gray-200
          rounded-xl px-4 py-3 shadow-sm"
        >
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              {item.label}
            </span>

            <span className="text-gray-400 text-sm">{item.icon}</span>
          </div>

          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-gray-900 tabular-nums">
              {item.value}
            </span>

            <span className="text-xs font-semibold text-[#b18b35]">
              {item.suffix}
            </span>
          </div>

          <p className="text-[10px] text-gray-400 mt-1">{item.description}</p>
        </div>
      ))}
    </div>
  );
}
