import React, { useState } from "react";
import "./ScrollUp.scss";

export const ScrollUp = () => {
  let [position, setPosition] = useState(0);

  window.addEventListener("scroll", () => {
    setPosition(document.documentElement.scrollTop);
  });

  const handleScrollUp = () => {
    const inter = setInterval(() => {
      setPosition((position -= 80));
      document.documentElement.scrollTo(0, position);
      if (position <= 0) {
        clearInterval(inter);
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
