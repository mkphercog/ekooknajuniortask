import React from "react";
import "./Header.scss";

export const Header = () => (
  <header className="header">
    <div className="header__wrapper">
      <div className="header__logo"></div>
      <ul className="header__list">
        <li className="header__list_item">Lista użytkowników</li>
        <li className="header__list_item">Dodaj użytkownika</li>
      </ul>
    </div>
  </header>
);
