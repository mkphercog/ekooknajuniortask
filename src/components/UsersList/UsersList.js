import React from "react";
import { User } from "./../User/User";
import "./UsersList.scss";

export const UsersList = () => (
  <div className="list">
    <div className="list__header">
      <p className="list__header_description">Imię i nazwisko</p>
      <p className="list__header_description">Wiek</p>
      <p className="list__header_description">Adres zamieszkania</p>
      <p className="list__header_description">Działania</p>
    </div>
    <ul className="list__users_list">
      <User />
    </ul>
  </div>
);
