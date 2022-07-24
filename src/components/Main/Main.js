import React from "react";
import { Route, Routes } from "react-router-dom";
import { UsersList } from "../UsersList/UsersList";
import { AddUser } from "../AddUser/AddUser";
import { ErrorPage } from "./../ErrorPage/ErrorPage";
import { routerPaths } from "./../../common/router";
import "./Main.scss";

export const Main = () => {
  const { HOME, ADD_USER, ERROR_PAGE } = routerPaths;

  return (
    <main className="main">
      <section className="main__wrapper">
        <Routes>
          <Route path={HOME} element={<UsersList />} />
          <Route path={ADD_USER} element={<AddUser />} />
          <Route path={ERROR_PAGE} element={<ErrorPage />} />
        </Routes>
      </section>
    </main>
  );
};
