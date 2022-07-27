import React, { useState } from "react";
import "./ScrollUp.scss";

export const ScrollUp = () => {
  const [position, setPosition] = useState(0);

  window.addEventListener("scroll", () => {
    setPosition(document.documentElement.scrollTop);
  });

  const handleScrollUp = () => {
    let newPosition = position;
    const scrollInterval = setInterval(() => {
      document.documentElement.scrollTo(0, (newPosition -= 80));

      if (newPosition <= 0) {
        clearInterval(scrollInterval);
        setPosition(0);
      }
    }, 10);
  };

  return (
    <button
      className={`scroll-up ${
        position > 500 ? "scroll-up__show" : "scroll-up__hide"
      }`}
      onClick={() => handleScrollUp()}
    >
      <span className="scroll-up__arrow">&#9650;</span>
    </button>
  );
};
