import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import RegisterForm from "../components/RegisterForm";
import PassageDisplay from "../components/PassageDisplay";
import TimerBar from "../components/TimerBar";
import LiveStats from "../components/LiveStats";
import ResultCard from "../components/ResultCard";
import { useTypingTest } from "../hooks/useTypingTest";

export default function TypingTestPage()
{
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
    DURATION
  } = useTypingTest();

  const handleStart = (userData) =>
  {
    setUser(userData);
    beginTest();
  };

  useEffect(() =>
  {
    if (phase === "test")
    {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [phase]);


  return (
    <div className="min-h-screen bg-[#0b0e14] flex flex-col">

      {/* HEADER */}
      <header className="border-b border-white/5 px-6 md:px-12 h-16 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-yellow-500 rounded-full" />
          <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">
            Evolve Vue
          </span>
        </div>
        <span className="text-[10px] text-gray-700 uppercase tracking-widest hidden md:block">
          Typing Assessment Portal
        </span>
      </header>

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
                      email: "guest@evolvevue.com"
                    })
                  }
                  className="w-full border border-white/10 text-gray-300 py-3 rounded-xl 
                   text-xs font-bold uppercase tracking-widest
                   hover:border-white/20 hover:text-white transition-all"
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
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-white mb-1">
                  Type the passage below
                </h1>
                <p className="text-gray-500 text-sm">
                  {user?.name}
                </p>
              </div>

              <div className="bg-[#0e121a] border border-white/5 rounded-2xl p-8">

                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <TimerBar timeLeft={timeLeft} duration={DURATION} />
                  </div>
                  <LiveStats
                    typed={typed}
                    passage={passage}
                    timeLeft={timeLeft}
                    duration={DURATION}
                  />
                </div>

                <PassageDisplay passage={passage} typed={typed} />

                <textarea
                  ref={inputRef}
                  rows={3}
                  value={typed}
                  onChange={(e) => handleTyping(e.target.value)}
                  onKeyDown={(e) => e.key === "Tab" && e.preventDefault()}
                  onPaste={(e) => e.preventDefault()}
                  placeholder="Start typing here..."
                  className="w-full mt-4 bg-white border border-white/10 rounded-xl px-4 py-3 text-gray-900 font-mono text-sm outline-none focus:border-yellow-500/30 transition-all resize-none placeholder:text-gray-700"
                />

                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => reset(true)}
                    className="border border-red-500/20 text-red-400 px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-red-500/10 transition-all"
                  >
                    Restart Test
                  </button>

                  <button
                    onClick={forceEnd}
                    className="border border-white/10 text-gray-400 px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-widest hover:border-white/20 transition-all"
                  >
                    Submit early
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
                onRetake={() => reset(true)}   // 🔥 THIS IS KEY
              />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-4 text-center flex-shrink-0">
        <p className="text-gray-700 text-[10px] uppercase tracking-widest">
          typingtest.evolvevue.com.np — Evolve Vue Pvt. Ltd.
        </p>
      </footer>
    </div>
  );
}