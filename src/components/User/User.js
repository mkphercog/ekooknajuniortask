import React, { useContext } from "react";
import { ContextStorage } from "../../common/ContextStorage";
import { useNavigate } from "react-router-dom";
import { routerPaths } from "./../../common/router";
import "./User.scss";

export const User = () => {
  const { usersData, filteredUsersData, isFilteredData } =
    useContext(ContextStorage);
  const history = useNavigate();
  const isFilteredUsersData = isFilteredData ? filteredUsersData : usersData;

  const renderUsers = isFilteredUsersData
    .map((user) => (
      <li key={user.id} className="user">
        <p className="user__details">{`${user.first_name} ${user.last_name}`}</p>
        <p className="user__details">{user.age}</p>
        <p className="user__details">
          {`${user.postal_code} ${user.city}, ul. ${user.street}`}
        </p>
        <div className="user__details">
          {user.id < 0 ? null : (
            <>
              <button
                className="user__btn"
                onClick={() => {
                  history(`${routerPaths.UPDATE_USER}${user.id}`);
                }}
              >
                Aktualizuj
              </button>
              <button
                className="user__btn user__btn--red"
                onClick={() => {
                  history(`${routerPaths.DELETE_USER}${user.id}`);
                }}
              >
                Usuń
              </button>
            </>
          )}
        </div>
      </li>
    ))
    .reverse();

  return renderUsers;
};
