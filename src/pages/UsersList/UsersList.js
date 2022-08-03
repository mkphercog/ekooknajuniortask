import React, { useContext, useEffect } from "react";
import { User } from "./User/User";
import { FilteredUsersContext } from "../../storage/FilteredUsersStorage";
import { UserContext } from "../../storage/UserStorage";
import { SearchingToolbar } from "./SearchingToolbar/SearchingToolbar";
import "./UsersList.scss";

export const UsersList = () => {
  const { usersData, getUsersData, changedServerDataFlag } =
    useContext(UserContext);
  const { filteredUsersData, isFilteredData } =
    useContext(FilteredUsersContext);
  const users = isFilteredData ? filteredUsersData : usersData;
  const renderUsers = users
    .map((user) => <User key={user.id} user={user} />)
    .reverse();

  useEffect(() => {
    getUsersData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changedServerDataFlag]);

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
