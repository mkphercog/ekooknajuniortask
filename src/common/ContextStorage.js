import { createContext } from "react";

export const INITIAL_CONTEX_USERS_STATE = [
  {
    first_name: "",
    last_name: "",
    postal_code: "",
    street: "",
    city: "",
    age: 0,
    id: -1,
  },
];

export const ContextStorage = createContext({
  usersData: INITIAL_CONTEX_USERS_STATE,
  setUsersData: () => {},
  filteredUsersData: [],
  setFilteredUsersData: () => {},
  isFilteredData: false,
  setIsFilteredData: () => {},
  filteredDataValues: {
    searchingLastName: "",
    searchingAgeFrom: "",
    searchingAgeTo: "",
  },
  setFilteredDataValues: () => {},
  isFetchError: false,
  setIsFetchError: () => {},
  isNewUserDataSend: false,
  setIsNewUserDataSend: () => {},
});
