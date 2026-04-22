import { useState } from "react";
import axios from "axios";
import { MIN_WPM } from "../hooks/useTypingTest";

const API = import.meta.env.VITE_API_URL;

export default function ResultCard({ result, user, onRetake })
{
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errMsg, setErrMsg] = useState("");
  const { wpm, accuracy, correctWords, errors, wordsTyped, passed, passageUsed } = result;

  const handleSubmit = async () =>
  {
    setStatus("loading");

    try
    {
      await axios.post(`${API}/api/results/submit`, {
        name: user.name,
        email: user.email,
        wpm,
        accuracy,
        correctWords,
        errors,
        wordsTyped,
        passed,
        passageUsed,
      });

      setStatus("success");
    } catch (err)
    {
      console.error(err); // 🔴 add this for debugging

      setErrMsg(
        err.response?.data?.message || "Submission failed. Please try again."
      );
      setStatus("error");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-1">Your results</h1>
        <p className="text-gray-500 text-sm">{user.name} — {user.email}</p>
      </div>

      <div className="bg-[#0e121a] border border-white/5 rounded-2xl p-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { val: wpm, label: "WPM" },
            { val: accuracy + "%", label: "Accuracy" },
            { val: correctWords, label: "Correct words" },
            { val: errors, label: "Errors" },
          ].map(({ val, label }) => (
            <div key={label} className="bg-[#12171f] rounded-xl p-4 text-center border border-white/5">
              <div className="text-2xl font-bold text-white mb-1">{val}</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest">{label}</div>
            </div>
          ))}
        </div>

        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold mb-6 ${passed ? "bg-green-500/10 text-green-400 border border-green-500/20"
          : "bg-red-500/10 text-red-400 border border-red-500/20"}`}>
          {passed ? `Passed — ${wpm} WPM (min. ${MIN_WPM})` : `Below ${MIN_WPM} WPM — consider retaking`}
        </div>

        <div className="border-t border-white/5 pt-6">
          {status === "success" ? (
            <div className="text-center py-4">
              <p className="text-green-400 font-bold text-lg mb-1">Result submitted!</p>
              <p className="text-gray-500 text-sm">The Evolve Vue HR team has been notified. We will be in touch.</p>
            </div>
          ) : (
            <>
              <p className="text-gray-300 text-sm mb-4">
                {passed ? "Great score! Submit your result to our HR team." : "You can retake for a better result, or submit your current score."}
              </p>
              {status === "error" && <p className="text-red-400 text-xs mb-3">{errMsg}</p>}
              <div className="flex flex-wrap gap-3">
                <button onClick={handleSubmit} disabled={status === "loading"}
                  className="bg-yellow-500 text-black px-8 py-3 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-yellow-400 transition-all disabled:opacity-50 shadow-lg shadow-yellow-500/20">
                  {status === "loading" ? "Submitting..." : "Submit result"}
                </button>
                <button
                  onClick={() =>
                  {
                    onRetake();
                  }}
                  className="border border-white/10 text-gray-300 px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-xs hover:border-white/20 hover:text-white transition-all"
                >
                  Retake test
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
