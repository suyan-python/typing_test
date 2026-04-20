import { useState, useRef, useCallback } from "react";
import { buildPassage } from "../utils/sentences";

const DURATION = 60;
export const MIN_WPM = 40;

export function useTypingTest() {
  const [phase, setPhase] = useState("register"); // register | test | result
  const [passage, setPassage] = useState("");
  const [typed, setTyped] = useState("");
  const [timeLeft, setTimeLeft] = useState(DURATION);
  const [result, setResult] = useState(null);

  const timerRef = useRef(null);
  const startedRef = useRef(false);
  const typedRef = useRef("");
  const passageRef = useRef("");

  const computeResult = useCallback((currentTyped, currentPassage) => {
    clearInterval(timerRef.current);
    const passageWords = currentPassage.split(" ");
    const typedWords = currentTyped.trim().split(/\s+/).filter(Boolean);
    let correct = 0,
      errors = 0;
    typedWords.forEach((w, i) => {
      if (i < passageWords.length) {
        if (w === passageWords[i]) correct++;
        else errors++;
      }
    });
    const wpm = Math.round((correct / DURATION) * 60);
    const acc =
      typedWords.length > 0
        ? Math.round((correct / typedWords.length) * 100)
        : 0;
    const r = {
      wpm,
      accuracy: acc,
      correctWords: correct,
      errors,
      wordsTyped: typedWords.length,
      passed: wpm >= MIN_WPM,
      passageUsed: currentPassage,
    };
    setResult(r);
    setPhase("result");
  }, []);

  const beginTest = useCallback(() => {
    clearInterval(timerRef.current);
    const p = buildPassage();
    passageRef.current = p;
    typedRef.current = "";
    startedRef.current = false;
    setPassage(p);
    setTyped("");
    setTimeLeft(DURATION);
    setResult(null);
    setPhase("test");
  }, []);

  const handleTyping = useCallback(
    (value) => {
      typedRef.current = value;
      setTyped(value);

      if (!startedRef.current && value.length > 0) {
        startedRef.current = true;
        let t = DURATION;
        timerRef.current = setInterval(() => {
          t--;
          setTimeLeft(t);
          if (t <= 0) {
            clearInterval(timerRef.current);
            computeResult(typedRef.current, passageRef.current);
          }
        }, 1000);
      }
    },
    [computeResult],
  );

  const forceEnd = useCallback(() => {
    computeResult(typedRef.current, passageRef.current);
  }, [computeResult]);

  const reset = useCallback((keepUser = true) => {
    clearInterval(timerRef.current);

    const newPassage = buildPassage();

    passageRef.current = newPassage;
    typedRef.current = "";
    startedRef.current = false;

    setPassage(newPassage);
    setTyped("");
    setTimeLeft(DURATION);
    setResult(null);

    if (keepUser) {
      setPhase("test"); // stay in test screen
    } else {
      setPhase("register"); // full reset
    }
  }, []);

  return {
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
  };
}
