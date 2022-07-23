import React, { useContext } from "react";
import { ContextStorage } from "../../ContextStorage";
import "./UsersList.scss";

export const UsersList = () => {
  const { usersData } = useContext(ContextStorage);
  const renderUsers = usersData.map((user) => (
    <li key={user.id} className="list__user">
      <p className="list__user_details">{`${user.first_name} ${user.last_name}`}</p>
      <p className="list__user_details">{user.age}</p>
      <p className="list__user_details">
        {`${user.postal_code} ${user.city}, ul. ${user.street}`}
      </p>
      <div className="list__user_details">
        <button className="list__user_btn">Aktualizuj</button>
        <button className="list__user_btn">Usuń</button>
      </div>
    </li>
  ));

  return (
    <div className="list">
      <div className="list__header">
        <p className="list__header_description">Imię i nazwisko</p>
        <p className="list__header_description">Wiek</p>
        <p className="list__header_description">Adres zamieszkania</p>
        <p className="list__header_description">Działania</p>
      </div>
      <ul className="list__users_list">{renderUsers}</ul>
    </div>
  );
};
