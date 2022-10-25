import { createContext, useState } from "react";
import { routerPaths } from "./../router/routerPaths";
import { useNavigate } from "react-router-dom";
import {
  ADD_USER_URL,
  GET_USERS_URL,
  GET_DELETE_UPDATE_USER_BY_ID_URL,
  NOT_FOUD_USERS_DATA,
  INITIAL_CONTEX_USERS_STATE,
} from "./../common/constants";

export const UserContext = createContext({
  currentUserData: NOT_FOUD_USERS_DATA,
  getCurrentUserData: () => {},
  usersData: INITIAL_CONTEX_USERS_STATE,
  getUsersData: () => {},
  addNewUserToServer: () => {},
  isFetchError: false,
  setIsFetchError: () => {},
  changedServerDataFlag: false,
  setchangedServerDataFlag: () => {},
  deleteUserFromServer: () => {},
  updateUserDataOnServer: () => {},
  isDataSend: false,
  setIsDataSend: () => {},
});

export const UserProvider = ({ children }) => {
  const [currentUserData, setCurrentUserData] = useState(NOT_FOUD_USERS_DATA);
  const [usersData, setUsersData] = useState(INITIAL_CONTEX_USERS_STATE);
  const [isFetchError, setIsFetchError] = useState(false);
  const [changedServerDataFlag, setChangedServerDataFlag] = useState(false);
  const [isDataSend, setIsDataSend] = useState(false);
  const history = useNavigate();

  const getUsersData = async () => {
    try {
      const response = await fetch(GET_USERS_URL);
      const data = await response.json();
      setIsFetchError(false);
      setUsersData(data.users);
    } catch (error) {
      setIsFetchError(true);
      console.log(`${error} - my error`);
    }
  };

  const getCurrentUserData = async (userID) => {
    try {
      const response = await fetch(
        `${GET_DELETE_UPDATE_USER_BY_ID_URL}${userID}`
      );
      const data = await response.json();
      if (data.status) {
        setIsFetchError(false);
        setCurrentUserData(data.user);
      } else {
        setIsFetchError(true);
        setCurrentUserData(NOT_FOUD_USERS_DATA);
      }
    } catch (error) {
      setCurrentUserData(NOT_FOUD_USERS_DATA);
      setIsFetchError(true);
      console.log(`${error} - my error`);
    }
  };

  const addNewUserToServer = async (userData) => {
    try {
      await fetch(ADD_USER_URL, {
        method: "POST",
        body: userData,
      });
      setIsFetchError(false);
      setIsDataSend(true);
    } catch (error) {
      setIsFetchError(true);
      console.log(error);
      setIsDataSend(false);
    }
  };

  const deleteUserFromServer = async (userID) => {
    try {
      await fetch(
        `${GET_DELETE_UPDATE_USER_BY_ID_URL}${userID}?_method=DELETE`,
        {
          method: "POST",
        }
      );
      setIsFetchError(false);
      setChangedServerDataFlag(!changedServerDataFlag);
      history(routerPaths.HOME);
    } catch (error) {
      setIsFetchError(true);
    }
  };

  const updateUserDataOnServer = async (userID, userData) => {
    try {
      await fetch(`${GET_DELETE_UPDATE_USER_BY_ID_URL}${userID}?_method=PUT`, {
        method: "POST",
        body: userData,
      });
      setIsFetchError(false);
      setIsDataSend(true);
      setChangedServerDataFlag(!changedServerDataFlag);
    } catch (error) {
      setIsFetchError(true);
      setIsDataSend(false);
      console.log(error);
    }
  };

  const contextValues = {
    currentUserData,
    getCurrentUserData,
    usersData,
    getUsersData,
    addNewUserToServer,
    isFetchError,
    setIsFetchError,
    changedServerDataFlag,
    setChangedServerDataFlag,
    deleteUserFromServer,
    updateUserDataOnServer,
    isDataSend,
    setIsDataSend,
  };

  return (
    <UserContext.Provider value={contextValues}>
      {children}
    </UserContext.Provider>
  );
};
