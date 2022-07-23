import { createContext } from "react";
import { INITIAL_CONTEX_USERS_STATE } from "./constants";

export const ContextStorage = createContext({
  usersData: INITIAL_CONTEX_USERS_STATE,
  setUsersData: () => {},
  isNewUserDataSend: false,
  setIsNewUserDataSend: () => {},
});
