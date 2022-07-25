import React, { useContext } from "react";
import { ContextStorage } from "../../common/ContextStorage";
import { User } from "./User/User";
import { SearchingToolbar } from "./SearchingToolbar/SearchingToolbar";
import "./UsersList.scss";

export const UsersList = () => {
  const { usersData, filteredUsersData, isFilteredData } =
    useContext(ContextStorage);
  const isFilteredUsersData = isFilteredData ? filteredUsersData : usersData;

  const renderUsers = isFilteredUsersData
    .map((user) => <User key={user.id} user={user} />)
    .reverse();

  return (
    <div className="list">
      <SearchingToolbar />
      <div className="list__header">
        <p className="list__header-description">Imię i nazwisko</p>
        <p className="list__header-description">Wiek</p>
        <p className="list__header-description">Adres zamieszkania</p>
        <p className="list__header-description">Działania</p>
      </div>
      <ul className="list__users-list">{renderUsers}</ul>
    </div>
  );
};
