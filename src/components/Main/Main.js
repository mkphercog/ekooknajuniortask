import React from "react";
import { Route, Routes } from "react-router-dom";
import { UsersList } from "../UsersList/UsersList";
import { AddOrUpdateUser } from "../AddOrUpdateUser/AddOrUpdateUser";
import { ErrorPage } from "./../ErrorPage/ErrorPage";
import { routerPaths } from "./../../common/router";
import { DeleteUser } from "../DeleteUser/DeleteUser";
import "./Main.scss";

export const Main = () => {
  const {
    HOME,
    ADD_USER,
    UPDATE_USER_WITH_ID,
    DELETE_USER_WITH_ID,
    ERROR_PAGE,
  } = routerPaths;

  return (
    <main className="main">
      <section className="main__wrapper">
        <Routes>
          <Route path={HOME} element={<UsersList />} />
          <Route path={ADD_USER} element={<AddOrUpdateUser />} />
          <Route
            path={UPDATE_USER_WITH_ID}
            element={<AddOrUpdateUser isUpdating={true} />}
          />
          <Route path={DELETE_USER_WITH_ID} element={<DeleteUser />} />
          <Route path={ERROR_PAGE} element={<ErrorPage />} />
        </Routes>
      </section>
    </main>
  );
};
