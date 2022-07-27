import React, { useContext } from "react";
import { ContextStorage } from "./../../../storage/ContextStorage";
import { NOT_FOUD_USERS_DATA } from "./../../../common/constants";
import { getFilteredUsers } from "./searchingToolbarFunc";
import "./SearchingToolbar.scss";

export const SearchingToolbar = () => {
  const {
    usersData,
    setFilteredUsersData,
    setIsFilteredData,
    filteredDataValues,
    setFilteredDataValues,
  } = useContext(ContextStorage);
  const { searchingLastName, searchingAgeFrom, searchingAgeTo } =
    filteredDataValues;

  const handleSubmit = () => {
    const filteredUsers = getFilteredUsers(
      usersData,
      searchingLastName,
      searchingAgeFrom,
      searchingAgeTo
    );

    if (filteredUsers.length) {
      setIsFilteredData(true);
      setFilteredUsersData(filteredUsers);
    } else {
      setFilteredUsersData([NOT_FOUD_USERS_DATA]);
    }
  };

  const handleClearFilters = () => {
    setIsFilteredData(false);
    setFilteredDataValues({
      searchingLastName: "",
      searchingAgeFrom: "",
      searchingAgeTo: "",
    });
  };

  return (
    <div className="toolbar">
      <form action="submit" className="toolbar__form">
        <label htmlFor="toolbar__input" className="toolbar__label">
          Wyszukaj po nazwisku:
        </label>
        <input
          type="text"
          name="toolbar__input"
          className="toolbar__input"
          value={searchingLastName}
          onChange={(event) =>
            setFilteredDataValues({
              ...filteredDataValues,
              searchingLastName: event.currentTarget.value,
            })
          }
        />
        <label htmlFor="toolbar__input" className="toolbar__label">
          i/lub po zakresie wieku od:
        </label>
        <input
          type="number"
          name="toolbar__input"
          className="toolbar__input toolbar__input--smaller"
          value={searchingAgeFrom}
          onChange={(event) =>
            setFilteredDataValues({
              ...filteredDataValues,
              searchingAgeFrom: event.currentTarget.value,
            })
          }
        />
        <label htmlFor="toolbar__input" className="toolbar__label">
          do:
        </label>
        <input
          type="number"
          name="toolbar__input"
          className="toolbar__input toolbar__input--smaller"
          value={searchingAgeTo}
          onChange={(event) =>
            setFilteredDataValues({
              ...filteredDataValues,
              searchingAgeTo: event.currentTarget.value,
            })
          }
        />
        <button
          className="toolbar__btn"
          onClick={(event) => {
            event.preventDefault();
            handleSubmit();
          }}
        >
          Szukaj
        </button>
        <button
          className="toolbar__btn"
          onClick={(event) => {
            event.preventDefault();
            handleClearFilters();
          }}
        >
          Wyczyść
        </button>
      </form>
    </div>
  );
};
