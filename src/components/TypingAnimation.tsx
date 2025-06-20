import { useEffect, useState } from "react";

const TypingAnimation = () => {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "." : prev + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return <span className="typing-dot">{dots}</span>;
};

export default TypingAnimation;
