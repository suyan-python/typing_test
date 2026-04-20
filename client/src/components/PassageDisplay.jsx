import { useEffect, useRef } from "react";

export default function PassageDisplay({ passage, typed }) {
  const passageWords = passage.split(" ");
  const typedWords = typed.split(" ");
  const ref = useRef(null);

  useEffect(() => {
    ref.current?.querySelector(".is-cursor")?.scrollIntoView({ block: "nearest" });
  }, [typed]);

  return (
    <div ref={ref} className="font-mono text-sm leading-8 p-5 bg-[#12171f] rounded-xl border border-white/5 select-none max-h-44 overflow-hidden">
      {passageWords.map((word, wi) => {
        const tw = typedWords[wi] ?? "";
        const isDone = wi < typedWords.length - 1;
        const isCurrent = wi === typedWords.length - 1;
        return (
          <span key={wi}>
            {word.split("").map((char, ci) => {
              let cls = "text-gray-600";
              if (isDone || (isCurrent && ci < tw.length)) {
                cls = tw[ci] === char ? "text-green-400" : "text-red-400 underline underline-offset-2";
              }
              const isCursorHere = isCurrent && ci === tw.length;
              return (
                <span key={ci} className={`${cls}${isCursorHere ? " is-cursor border-l-2 border-yellow-400 animate-pulse" : ""}`}>
                  {char}
                </span>
              );
            })}
            {wi < passageWords.length - 1 && (
              <span className={isCurrent && tw.length === word.length ? "is-cursor border-l-2 border-yellow-400 animate-pulse" : "text-gray-600"}>
                {" "}
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}
