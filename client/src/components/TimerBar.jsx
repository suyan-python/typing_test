export default function TimerBar({ timeLeft, duration }) {
  const pct = (timeLeft / duration) * 100;
  const color = timeLeft <= 10 ? "bg-red-500" : timeLeft <= 20 ? "bg-yellow-500" : "bg-white";
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  return (
    <div className="mb-5">
      <div className="flex justify-between items-baseline mb-2">
        <span className="text-4xl font-bold tabular-nums text-white">
          {mins}:{secs.toString().padStart(2, "0")}
        </span>
        <span className="text-[10px] text-gray-600 uppercase tracking-widest">remaining</span>
      </div>
      <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-1000 ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
