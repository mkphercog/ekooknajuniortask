import { Route, Routes } from "react-router-dom";
import { routerPaths } from "./routerPaths";
import { UsersList } from "./../pages/UsersList/UsersList";
import { AddOrUpdateUser } from "./../pages/AddOrUpdateUser/AddOrUpdateUser";
import { ErrorPage } from "./../pages/ErrorPage/ErrorPage";
import { DeleteUser } from "./../pages/DeleteUser/DeleteUser";

export const Router = () => {
  const {
    HOME,
    ADD_USER,
    UPDATE_USER_WITH_ID,
    DELETE_USER_WITH_ID,
    ERROR_PAGE,
  } = routerPaths;

  return (
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
  );
};
