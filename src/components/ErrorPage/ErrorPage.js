import React from "react";
import { Link } from "react-router-dom";
import { routerPaths } from "./../../common/router";
import "./ErrorPage.scss";

export const ErrorPage = () => (
  <div className="error">
    <h1 className="error__title">Nic tu nie ma ╰(⇀‸↼)╯</h1>
    <Link to={routerPaths.HOME} className="error__back-link">
      Wróć na stronę główną
    </Link>
  </div>
);
