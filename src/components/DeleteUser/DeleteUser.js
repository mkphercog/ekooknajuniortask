import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { routerPaths } from "./../../common/router";
import {
  DELETE_UPDATE_USER_URL,
  INITIAL_CONTEX_USERS_STATE,
} from "./../../common/constants";
import "./DeleteUser.scss";

export const DeleteUser = () => {
  const { id: userID } = useParams();
  const history = useNavigate();
  const [userData, setUserData] = useState(INITIAL_CONTEX_USERS_STATE[0]);
  const { first_name, last_name, postal_code, city, street } = userData;

  useEffect(() => {
    if (userID) {
      //searching for good idea about deleting data, for now not working... same problem like with a PUT method
      fetch(`${DELETE_UPDATE_USER_URL}${userID}`)
        .then((response) => response.json())
        .then((data) => {
          setUserData(data.user);
        });
    }
  }, [userID]);

  const handleDeleteUser = () => {
    console.log(`Usuwam użytkownika , id: ${userID}`);
    history(routerPaths.HOME);
    fetch(`${DELETE_UPDATE_USER_URL}${userID}`, {
      method: "DELETE",
    })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  return (
    <div className="delete-user">
      <h1 className="delete-user__title">Uwaga usuwasz użytkownika</h1>
      <p className="delete-user__question">
        Czy na pewno chcesz usunąć użytkownika
        <span className="delete-user__span">
          {`${first_name} ${last_name}`}?
        </span>
        {`(id ${userID})`}
      </p>
      <p className="delete-user__question">
        Adres zamieszkania: {`${postal_code} ${city}, ul. ${street}`}
      </p>
      <div className="delete-user__btn-wrapper">
        <button className="delete-user__btn" onClick={() => handleDeleteUser()}>
          Usuń
        </button>
        <button
          className="delete-user__btn"
          onClick={() => history(routerPaths.HOME)}
        >
          Nie usuwaj
        </button>
      </div>
    </div>
  );
};
