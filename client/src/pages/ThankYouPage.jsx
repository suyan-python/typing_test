import { Link } from "react-router-dom";

export default function ThankYouPage()
{
  return (
    <div className="min-h-screen bg-[#0b0e14] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-yellow-500/10 border border-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-yellow-400 text-2xl">
          ✓
        </div>
        <h1 className="text-3xl font-bold text-white mb-3">Result submitted!</h1>
        <p className="text-gray-400 text-sm leading-relaxed mb-8">
          Your typing test result has been sent to our HR team. We will review it and get back to you shortly.
        </p>
        <Link to="/" className="border border-white/10 text-gray-300 px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:border-white/20 transition-all">
          Take another test
        </Link>
      </div>
    </div>
  );
}
