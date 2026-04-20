import { useState } from "react";
import { motion } from "framer-motion";

export default function RegisterForm({ onStart }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!name.trim()) return setError("Please enter your full name.");
    if (!email.trim() || !email.includes("@")) return setError("Please enter a valid email address.");
    setError("");
    onStart({ name: name.trim(), email: email.trim() });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">Typing speed test</h1>
        <p className="text-gray-400 text-sm">Evolve Vue Pvt. Ltd. — Application assessment</p>
      </div>

      <div className="bg-[#0e121a] border border-white/5 rounded-2xl p-8 space-y-5">
        <div>
          <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">Full name</label>
          <input
            type="text" value={name} onChange={e => setName(e.target.value)}
            placeholder="e.g. Rina Sharma" onKeyDown={e => e.key === "Enter" && handleSubmit()}
            className="w-full bg-[#12171f] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-yellow-500/50 transition-colors placeholder:text-gray-600"
          />
        </div>
        <div>
          <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">Email address</label>
          <input
            type="email" value={email} onChange={e => setEmail(e.target.value)}
            placeholder="e.g. rina@example.com" onKeyDown={e => e.key === "Enter" && handleSubmit()}
            className="w-full bg-[#12171f] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-yellow-500/50 transition-colors placeholder:text-gray-600"
          />
          <p className="text-gray-600 text-xs mt-2">Included in your submitted result.</p>
        </div>

        {error && <p className="text-red-400 text-xs font-medium">{error}</p>}

        <div className="bg-[#12171f] rounded-xl p-4 border border-white/5">
          <p className="text-gray-400 text-xs leading-relaxed">
            You have <span className="text-white font-semibold">1 minute</span> to type the passage as accurately and quickly as possible.
            Timer starts on your first keystroke. Paste is disabled.
          </p>
        </div>

        <button onClick={handleSubmit}
          className="w-full bg-yellow-500 text-black py-3 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-yellow-400 transition-all shadow-lg shadow-yellow-500/20">
          Begin test
        </button>
      </div>
    </motion.div>
  );
}
