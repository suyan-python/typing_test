import { useEffect, useRef, useMemo } from "react";

export default function PassageDisplay({ passage, typed })
{
  const ref = useRef(null);

  // ✅ Memoize splits (big performance gain)
  const passageWords = useMemo(() => passage.split(" "), [passage]);
  const typedWords = useMemo(() => typed.split(" "), [typed]);

  useEffect(() =>
  {
    const cursor = ref.current?.querySelector(".is-cursor");
    if (cursor)
    {
      cursor.scrollIntoView({
        block: "nearest",
        inline: "nearest",
        behavior: "smooth", // 🔥 smoother feel
      });
    }
  }, [typed]);

  return (
    <div
      ref={ref}
      className="font-mono text-sm leading-8 p-5 bg-white rounded-xl border border-white/5 select-none max-h-44 overflow-hidden"
    >
      {passageWords.map((word, wi) =>
      {
        const tw = typedWords[wi] ?? "";

        const isDone = wi < typedWords.length - 1;
        const isCurrent = wi === typedWords.length - 1;

        return (
          <span key={wi}>
            {/* ✅ Characters */}
            {Array.from(word).map((char, ci) =>
            {
              let cls = "text-gray-900";

              if (isDone || (isCurrent && ci < tw.length))
              {
                cls =
                  tw[ci] === char
                    ? "text-green-600"
                    : "text-red-500 underline underline-offset-2";
              }

              const isCursorHere = isCurrent && ci === tw.length;

              return (
                <span
                  key={ci}
                  className={`${cls} ${isCursorHere
                      ? "is-cursor border-l-2 border-yellow-400 animate-pulse"
                      : ""
                    }`}
                >
                  {char}
                </span>
              );
            })}

            {/* ❗ Extra characters (overflow) */}
            {tw.length > word.length &&
              Array.from(tw.slice(word.length)).map((char, i) => (
                <span
                  key={`extra-${i}`}
                  className="text-red-500 underline underline-offset-2"
                >
                  {char}
                </span>
              ))}

            {/* Space */}
            {wi < passageWords.length - 1 && (
              <span
                className={
                  isCurrent && tw.length === word.length
                    ? "is-cursor border-l-2 border-yellow-400 animate-pulse"
                    : "text-gray-600"
                }
              >
                {" "}
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}