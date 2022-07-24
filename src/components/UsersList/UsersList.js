import React from "react";
import { User } from "./../User/User";
import { SearchingToolbar } from "./SearchingToolbar/SearchingToolbar";
import "./UsersList.scss";

export const UsersList = () => (
  <div className="list">
    <SearchingToolbar />
    <div className="list__header">
      <p className="list__header-description">Imię i nazwisko</p>
      <p className="list__header-description">Wiek</p>
      <p className="list__header-description">Adres zamieszkania</p>
      <p className="list__header-description">Działania</p>
    </div>
    <ul className="list__users-list">
      <User />
    </ul>
  </div>
);
