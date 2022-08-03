import React, { useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { routerPaths } from "../../router/routerPaths";
import { UserContext } from "../../storage/UserStorage";
import { ErrorServerMessage } from "../../components/ErrorServerMessage/ErrorServerMessage";
import "./DeleteUser.scss";

export const DeleteUser = () => {
  const { id: userID } = useParams();
  const history = useNavigate();
  const {
    currentUserData,
    getCurrentUserData,
    isFetchError,
    deleteUserFromServer,
  } = useContext(UserContext);
  const { first_name, last_name, postal_code, city, street } = currentUserData;

  useEffect(() => {
    getCurrentUserData(userID);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userID]);

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
        <button
          className="delete-user__btn"
          onClick={() => deleteUserFromServer(userID)}
        >
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
