import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import RegisterForm from "../components/RegisterForm";
import PassageDisplay from "../components/PassageDisplay";
import TimerBar from "../components/TimerBar";
import LiveStats from "../components/LiveStats";
import ResultCard from "../components/ResultCard";
import { useTypingTest } from "../hooks/useTypingTest";

export default function TypingTestPage() {
  const [user, setUser] = useState(null);
  const inputRef = useRef(null);

  const {
    phase,
    passage,
    typed,
    handleTyping,
    timeLeft,
    result,
    beginTest,
    forceEnd,
    reset,
    DURATION,
  } = useTypingTest();

  const handleStart = (userData) => {
    setUser(userData);
    beginTest();
  };

  useEffect(() => {
    if (phase === "test") {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [phase]);

  return (
    <div className="min-h-screen  flex flex-col">
      {/* MAIN */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <AnimatePresence mode="wait">
          {/* REGISTER */}
          {phase === "register" && (
            <motion.div
              key="register"
              className="w-full max-w-md"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
            >
              <RegisterForm onStart={handleStart} />

              {/* 👇 Guest Access */}
              <div className="mt-6 text-center">
                <p className="text-gray-600 text-xs mb-3 uppercase tracking-widest">
                  Or
                </p>

                <button
                  onClick={() =>
                    handleStart({
                      name: "Guest User",
                      email: "guest@evolvevue.com",
                    })
                  }
                  className="w-full border border-black/50 text-gray-700 py-3 rounded-xl 
                   text-xs font-bold uppercase tracking-widest
                   hover:border-black/20 hover:text-black transition-all"
                >
                  Continue as Guest
                </button>
              </div>
            </motion.div>
          )}

          {/* TEST */}
          {phase === "test" && (
            <motion.div
              key="test"
              className="w-full max-w-2xl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
            >
              {/* Heading */}
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Type the passage below
                </h1>

                <p className="text-gray-500 text-sm">Welcome, {user?.name}</p>
              </div>

              {/* Test Card */}
              <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-8 shadow-sm">
                {/* Timer & Live Stats */}
                <div className="flex items-start justify-between gap-5 mb-7">
                  <div className="flex-1 min-w-0">
                    <TimerBar timeLeft={timeLeft} duration={DURATION} />
                  </div>
                  {/* 
                  <div className="shrink-0">
                    <LiveStats
                      typed={typed}
                      passage={passage}
                      timeLeft={timeLeft}
                      duration={DURATION}
                    />
                  </div> */}
                </div>

                {/* Passage */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      Typing passage
                    </span>

                    <span className="text-[10px] font-medium text-gray-400">
                      Read carefully
                    </span>
                  </div>

                  <PassageDisplay passage={passage} typed={typed} />
                </div>

                {/* Typing Area */}
                <div className="mt-5">
                  <textarea
                    ref={inputRef}
                    rows={4}
                    value={typed}
                    onChange={(e) => handleTyping(e.target.value)}
                    onKeyDown={(e) => e.key === "Tab" && e.preventDefault()}
                    onPaste={(e) => e.preventDefault()}
                    placeholder="Start typing here..."
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-4
          text-gray-900 text-sm leading-relaxed outline-none
          focus:border-[#d6b25e] focus:ring-2 focus:ring-[#d6b25e]/20
          transition-all duration-200 resize-none
          placeholder:text-gray-500 tracking-wide"
                  />
                </div>

                {/* Actions */}
                <div className="mt-6 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
                  <button
                    onClick={() => reset(true)}
                    className="border border-red-200 text-red-600 px-5 py-3
          rounded-xl text-xs font-bold uppercase tracking-wider
          hover:bg-red-50 hover:border-red-300
          transition-all duration-200"
                  >
                    Restart Test
                  </button>

                  <button
                    onClick={forceEnd}
                    className="bg-[#d6b25e] text-gray-900 px-6 py-3
          rounded-xl text-xs font-bold uppercase tracking-wider
          hover:bg-[#c9a34c] hover:shadow-md
          active:scale-[0.99] transition-all duration-200"
                  >
                    Submit Early
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* RESULT */}
          {phase === "result" && (
            <motion.div
              key="result"
              className="w-full max-w-2xl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
            >
              <ResultCard
                result={result}
                user={user}
                onRetake={() => reset(true)} // 🔥 THIS IS KEY
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-4 text-center flex-shrink-0">
        <p className="text-gray-700 text-[10px] font-semibold tracking-wide">
          TypingTest — Vu Devi Services / Evolve Vue Pvt. Ltd.
        </p>
      </footer>
    </div>
  );
}
