export default function LiveStats({ typed, passage, timeLeft, duration }) {
  const elapsed = duration - timeLeft;
  const typedWords = typed.trim().split(/\s+/).filter(Boolean);
  const wpm = elapsed > 0 ? Math.round((typedWords.length / elapsed) * 60) : 0;
  const passageWords = passage.split(" ");
  const doneWords = typed.split(" ").slice(0, -1);
  let correct = 0;
  doneWords.forEach((w, i) => { if (w === passageWords[i]) correct++; });
  const acc = doneWords.length > 0 ? Math.round((correct / doneWords.length) * 100) : null;

  return (
    <div className="flex gap-6 mb-5">
      {[{ val: wpm, label: "WPM" }, { val: acc !== null ? acc + "%" : "—", label: "Accuracy" }].map(({ val, label }) => (
        <div key={label} className="text-right">
          <div className="text-2xl font-bold text-white">{val}</div>
          <div className="text-[10px] text-gray-600 uppercase tracking-widest">{label}</div>
        </div>
      ))}
    </div>
  );
}
