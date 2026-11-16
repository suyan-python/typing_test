import { useState } from "react";
import axios from "axios";
import { MIN_WPM } from "../hooks/useTypingTest";
import {
  CheckCircle2,
  XCircle,
  Gauge,
  Target,
  CheckCheck,
  AlertCircle,
  Loader2,
  RotateCcw,
  Send,
  Keyboard,
} from "lucide-react";

const API = import.meta.env.VITE_API_URL;

export default function ResultCard({ result, user, onRetake }) {
  const [status, setStatus] = useState("idle");
  const [errMsg, setErrMsg] = useState("");

  const {
    wpm,
    accuracy,
    correctWords,
    errors,
    wordsTyped,
    passed,
    passageUsed,
  } = result;

  const stats = [
    {
      label: "Typing speed",
      value: wpm,
      suffix: "WPM",
      icon: Gauge,
    },
    {
      label: "Accuracy",
      value: accuracy,
      suffix: "%",
      icon: Target,
    },
    {
      label: "Correct words",
      value: correctWords,
      suffix: "",
      icon: CheckCheck,
    },
    {
      label: "Errors",
      value: errors,
      suffix: "",
      icon: AlertCircle,
    },
  ];

  const handleSubmit = async () => {
    if (status === "loading" || status === "success") return;

    if (!API) {
      setErrMsg(
        "Submission service is currently unavailable. Please contact HR.",
      );
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrMsg("");

    try {
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
    } catch (err) {
      console.error("Result submission failed:", err);

      setErrMsg(
        err.response?.data?.message ||
          "We couldn't submit your result. Please try again.",
      );
      setStatus("error");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#d6b25e]/15 flex items-center justify-center">
          <Keyboard size={30} className="text-[#b58e37]" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
          Your results
        </h1>

        <p className="text-sm text-gray-500 mt-2">
          Assessment completed by{" "}
          <span className="font-semibold text-gray-700">{user.name}</span>
        </p>
      </div>

      {/* Results card */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-8 shadow-sm">
        {/* Pass / Fail status */}
        <div
          className={`flex items-center gap-4 p-4 sm:p-5 rounded-xl border mb-6 ${
            passed ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
          }`}
        >
          <div
            className={`w-11 h-11 shrink-0 rounded-full flex items-center justify-center ${
              passed ? "bg-green-100" : "bg-red-100"
            }`}
          >
            {passed ? (
              <CheckCircle2 className="text-green-600" size={25} />
            ) : (
              <XCircle className="text-red-600" size={25} />
            )}
          </div>

          <div className="min-w-0">
            <h2
              className={`font-bold text-lg ${
                passed ? "text-green-800" : "text-red-800"
              }`}
            >
              {passed ? "Assessment passed!" : "Minimum target not reached"}
            </h2>

            <p
              className={`text-sm mt-0.5 ${
                passed ? "text-green-700" : "text-red-700"
              }`}
            >
              {passed
                ? `You achieved ${wpm} WPM against the required ${MIN_WPM} WPM.`
                : `You achieved ${wpm} WPM. The minimum requirement is ${MIN_WPM} WPM.`}
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-7">
          {stats.map(({ label, value, suffix, icon: Icon }) => (
            <div
              key={label}
              className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center min-w-0"
            >
              <div className="flex justify-center mb-3">
                <Icon size={19} className="text-[#b58e37]" />
              </div>

              <div className="text-2xl sm:text-3xl font-bold text-gray-900 tabular-nums">
                {value}
                <span className="text-sm font-semibold text-gray-500 ml-1">
                  {suffix}
                </span>
              </div>

              <p className="text-[10px] sm:text-xs text-gray-500 font-semibold uppercase tracking-wide mt-2">
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* Submission section */}
        <div className="border-t border-gray-100 pt-6">
          {status === "success" ? (
            <div className="text-center py-5">
              <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={30} className="text-green-600" />
              </div>

              <h3 className="text-lg font-bold text-gray-900">
                Result submitted successfully
              </h3>

              <p className="text-sm text-gray-500 mt-2 max-w-sm mx-auto leading-relaxed">
                Your typing assessment has been submitted to the Evolve Vue HR
                team. We will be in touch with you regarding the next steps.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-5">
                <h3 className="text-base font-bold text-gray-900">
                  {passed ? "Well done!" : "Want to improve your score?"}
                </h3>

                <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                  {passed
                    ? "Submit your assessment result to the HR team for review."
                    : "You can submit your current result or retake the assessment to achieve a better score."}
                </p>
              </div>

              {status === "error" && (
                <div className="flex items-start gap-2 bg-red-50 border border-red-100 rounded-lg p-3 mb-4">
                  <AlertCircle
                    size={17}
                    className="text-red-500 shrink-0 mt-0.5"
                  />
                  <p className="text-sm text-red-700">{errMsg}</p>
                </div>
              )}

              <div className="flex flex-col-reverse sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={onRetake}
                  disabled={status === "loading"}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-bold hover:bg-gray-50 hover:border-gray-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <RotateCcw size={16} />
                  Retake test
                </button>

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={status === "loading"}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#d6b25e] text-gray-950 text-sm font-bold hover:bg-[#c9a34d] transition-all shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={17} className="animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Submit result
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <p className="text-center text-xs text-gray-400 mt-5">
        Vu Devi Services / Evolve Vue · Typing Assessment
      </p>
    </div>
  );
}
