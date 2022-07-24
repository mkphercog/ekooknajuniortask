import { createContext } from "react";
import { INITIAL_CONTEX_USERS_STATE } from "./constants";

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
