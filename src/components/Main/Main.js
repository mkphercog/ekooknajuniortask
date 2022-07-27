import React from "react";
import "./Main.scss";

export const Main = ({ children }) => {
  return (
    <main className="main">
      <section className="main__wrapper">{children}</section>
    </main>
  );
};
