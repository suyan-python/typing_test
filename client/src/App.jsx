import { Routes, Route } from "react-router-dom";
import TypingTestPage from "./pages/TypingTestPage";
import ThankYouPage from "./pages/ThankYouPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<TypingTestPage />} />
      <Route path="/thank-you" element={<ThankYouPage />} />
    </Routes>
  );
}
