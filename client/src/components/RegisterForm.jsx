import { useState } from "react";
import { motion } from "framer-motion";

export default function RegisterForm({ onStart }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!name.trim()) return setError("Please enter your full name.");
    if (!email.trim() || !email.includes("@"))
      return setError("Please enter a valid email address.");
    setError("");
    onStart({ name: name.trim(), email: email.trim() });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-700 mb-2 ">
          Typing Speed Test
        </h1>
        <p className="text-gray-500 text-sm ">Vu Devi Services / Evolve Vue</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-2">
            Full name
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Rina Sharma"
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5
      text-gray-900 text-sm outline-none
      focus:bg-white focus:border-[#d6b25e]
      focus:ring-2 focus:ring-[#d6b25e]/20
      transition-all duration-200 placeholder:text-gray-400"
          />
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-2">
            Email address
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. rina@example.com"
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5
      text-gray-900 text-sm outline-none
      focus:bg-white focus:border-[#d6b25e]
      focus:ring-2 focus:ring-[#d6b25e]/20
      transition-all duration-200 placeholder:text-gray-400"
          />

          <p className="text-gray-500 text-xs mt-2">
            Included in your submitted result.
          </p>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-600 text-xs font-medium">{error}</p>}

        {/* Test Instructions */}
        <div className="bg-[#faf8f2] rounded-xl p-4 border border-[#eee5d0]">
          <p className="text-gray-600 text-xs leading-relaxed">
            You have <span className="text-gray-900 font-bold">1 minute</span>{" "}
            to type the passage as accurately and quickly as possible. Timer
            starts on your first keystroke. Paste is disabled.
          </p>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-[#d6b25e] text-[#171717] py-3.5 rounded-xl
    font-bold uppercase tracking-widest text-xs
    hover:bg-[#c9a34c] hover:shadow-md
    active:scale-[0.99]
    transition-all duration-200"
        >
          Begin test
        </button>
      </div>
    </motion.div>
  );
}
