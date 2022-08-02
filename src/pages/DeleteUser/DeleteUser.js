import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { routerPaths } from "../../router/routerPaths";
import {
  GET_DELETE_UPDATE_USER_BY_ID_URL,
  NOT_FOUD_USERS_DATA,
} from "../../common/constants";
import { ContextStorage } from "../../storage/ContextStorage";
import { ErrorServerMessage } from "../../components/ErrorServerMessage/ErrorServerMessage";
import "./DeleteUser.scss";

export const DeleteUser = () => {
  const {
    isFetchError,
    setIsFetchError,
    changedServerDataFlag,
    setChangedServerDataFlag,
  } = useContext(ContextStorage);
  const { id: userID } = useParams();
  const history = useNavigate();
  const [currentUserData, setCurrentUserData] = useState(NOT_FOUD_USERS_DATA);
  const { first_name, last_name, postal_code, city, street } = currentUserData;

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `${GET_DELETE_UPDATE_USER_BY_ID_URL}${userID}`
        );
        const data = await response.json();
        setIsFetchError(false);
        setCurrentUserData(data.user);
      } catch (error) {
        setIsFetchError(true);
        setCurrentUserData(NOT_FOUD_USERS_DATA);
        console.log(error);
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userID]);

  const handleDeleteUser = async () => {
    //searching for good idea about deleting data, for now not working... same problem like with a PUT method
    //maybe some problem with server?
    try {
      await fetch(`${GET_DELETE_UPDATE_USER_BY_ID_URL}${userID}`, {
        method: "DELETE",
      });
      setIsFetchError(false);
      setChangedServerDataFlag(!changedServerDataFlag);
      history(routerPaths.HOME);
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
          Anuluj
        </button>
      </div>
      <ErrorServerMessage isFetchError={isFetchError} />
    </div>
  );
};
