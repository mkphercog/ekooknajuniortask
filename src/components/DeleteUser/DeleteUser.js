import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { routerPaths } from "./../../common/router";
import {
  GET_DELETE_UPDATE_USER_BY_ID_URL,
  NOT_FOUD_USERS_DATA,
} from "./../../common/constants";
import "./DeleteUser.scss";
import { ContextStorage } from "../../common/ContextStorage";
import { ErrorServerMessage } from "./../ErrorServerMessage/ErrorServerMessage";

export const DeleteUser = () => {
  const {
    isFetchError,
    setIsFetchError,
    setIsNewUserDataSend,
    isNewUserDataSend,
  } = useContext(ContextStorage);
  const { id: userID } = useParams();
  const history = useNavigate();
  const [currentUserData, setCurrentUserData] = useState(NOT_FOUD_USERS_DATA);
  const { first_name, last_name, postal_code, city, street } = currentUserData;

  useEffect(() => {
    (async () => {
      try {
        await fetch(`${GET_DELETE_UPDATE_USER_BY_ID_URL}${userID}`)
          .then((res) => {
            if (res.ok) {
              setIsFetchError(false);
              return res.json();
            } else {
              setIsFetchError(true);
            }
          })
          .then((data) => {
            setCurrentUserData(data.user);
          });
      } catch (error) {
        setIsFetchError(true);
        setCurrentUserData(NOT_FOUD_USERS_DATA);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userID]);

  const handleDeleteUser = async () => {
    //searching for good idea about deleting data, for now not working... same problem like with a PUT method
    try {
      await fetch(`${GET_DELETE_UPDATE_USER_BY_ID_URL}${userID}`, {
        method: "DELETE",
      }).then((res) => {
        if (res.ok) {
          history(routerPaths.HOME);
          setIsFetchError(false);
          setIsNewUserDataSend(!isNewUserDataSend);
        } else {
          setIsFetchError(true);
        }
      });
    } catch (error) {
      setIsFetchError(true);
    }
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
      <ErrorServerMessage isFetchError={isFetchError} />
    </div>
  );
};
