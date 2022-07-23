import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { routerPaths } from "./../../common/router";
import "./Header.scss";

export const Header = () => {
  const history = useNavigate();
  const { HOME, ADD_USER } = routerPaths;

  return (
    <header className="header">
      <div className="header__wrapper">
        <div className="header__logo" onClick={() => history(HOME)}></div>
        <ul className="header__list">
          <li className="header__list_item">
            <Link to={HOME} className="header__list_link">
              Lista użytkowników
            </Link>
          </li>
          <li className="header__list_item">
            <Link to={ADD_USER} className="header__list_link">
              Dodaj użytkownika
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};
