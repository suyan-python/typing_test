import { useEffect, useRef, useMemo } from "react";

export default function PassageDisplay({ passage, typed }) {
  const containerRef = useRef(null);
  const cursorRef = useRef(null);

  const passageWords = useMemo(() => passage.split(" "), [passage]);

  const typedWords = useMemo(() => typed.split(" "), [typed]);

  const currentWordIndex = typedWords.length - 1;
  const currentWord = typedWords[currentWordIndex] ?? "";

  const isCompleted = typed.length >= passage.length;

  // Keep cursor visible inside the passage container
  useEffect(() => {
    const container = containerRef.current;
    const cursor = cursorRef.current;

    if (!container || !cursor) return;

    const containerRect = container.getBoundingClientRect();
    const cursorRect = cursor.getBoundingClientRect();

    if (cursorRect.bottom > containerRect.bottom) {
      container.scrollTo({
        top:
          container.scrollTop + cursorRect.bottom - containerRect.bottom + 30,
        behavior: "smooth",
      });
    } else if (cursorRect.top < containerRect.top) {
      container.scrollTo({
        top: container.scrollTop - (containerRect.top - cursorRect.top) - 30,
        behavior: "smooth",
      });
    }
  }, [typed]);

  useEffect(() => {
    const container = containerRef.current;
    const cursor = cursorRef.current;

    if (!container || !cursor) return;

    const containerRect = container.getBoundingClientRect();
    const cursorRect = cursor.getBoundingClientRect();

    const topBoundary = containerRect.top + 45;
    const bottomBoundary = containerRect.bottom - 65;

    // Only scroll when the cursor approaches the visible boundaries
    if (cursorRect.bottom > bottomBoundary) {
      container.scrollTo({
        top: container.scrollTop + (cursorRect.bottom - bottomBoundary) + 12,
        behavior: "smooth",
      });
    } else if (cursorRect.top < topBoundary) {
      container.scrollTo({
        top: container.scrollTop - (topBoundary - cursorRect.top) - 12,
        behavior: "smooth",
      });
    }
  }, [typed]);

  return (
    <div className="relative">
      {/* Passage Container */}
      <div
        ref={containerRef}
        className="relative bg-white border border-gray-200 rounded-xl
  p-5 sm:p-6 max-h-64 overflow-y-auto
  select-none"
      >
        <p className="text-[15px] sm:text-base leading-[2.2rem] tracking-wide font-medium break-words">
          {passageWords.map((word, wi) => {
            const tw = typedWords[wi] ?? "";

            const isDone = wi < currentWordIndex;
            const isCurrent = wi === currentWordIndex;

            return (
              <span key={wi}>
                {Array.from(word).map((char, ci) => {
                  const hasBeenTyped = isDone || (isCurrent && ci < tw.length);

                  const isCorrect = hasBeenTyped && tw[ci] === char;
                  const isIncorrect = hasBeenTyped && tw[ci] !== char;

                  let className = "text-gray-400";

                  if (isCorrect) {
                    className = "text-emerald-600";
                  } else if (isIncorrect) {
                    className = "text-red-500 bg-red-50 rounded-sm";
                  }

                  const isCursor =
                    !isCompleted && isCurrent && ci === tw.length;

                  return (
                    <span
                      key={ci}
                      ref={isCursor ? cursorRef : null}
                      className={`${className} ${
                        isCursor
                          ? "border-l-2 border-[#d6b25e] animate-pulse"
                          : ""
                      }`}
                    >
                      {char}
                    </span>
                  );
                })}

                {/* Extra typed characters */}
                {isCurrent &&
                  tw.length > word.length &&
                  Array.from(tw.slice(word.length)).map((char, i) => (
                    <span
                      key={`extra-${i}`}
                      className="text-red-500 bg-red-50 rounded-sm"
                    >
                      {char}
                    </span>
                  ))}

                {/* Word spacing */}
                {wi < passageWords.length - 1 && (
                  <>
                    {isCurrent && tw.length === word.length && !isCompleted ? (
                      <span
                        ref={cursorRef}
                        className="border-l-2 border-[#d6b25e] animate-pulse"
                      >
                        {" "}
                      </span>
                    ) : (
                      " "
                    )}
                  </>
                )}
              </span>
            );
          })}

          {isCompleted && (
            <span className="ml-2 text-emerald-600 font-semibold">✓</span>
          )}
        </p>
      </div>
    </div>
  );
}
