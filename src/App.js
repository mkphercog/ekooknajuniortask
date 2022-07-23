import { useEffect, useState } from "react";
import { Header } from "./components/Header/Header";
import { Main } from "./components/Main/Main";
import { ContextStorage } from "./common/ContextStorage";
import { GET_USERS_URL, INITIAL_CONTEX_USERS_STATE } from "./common/constants";

export const App = () => {
  const [usersData, setUsersData] = useState(INITIAL_CONTEX_USERS_STATE);
  const [isNewUserDataSend, setIsNewUserDataSend] = useState(false);
  const valueObject = {
    usersData,
    setUsersData,
    isNewUserDataSend,
    setIsNewUserDataSend,
  };

  useEffect(() => {
    (async () => {
      await fetch(GET_USERS_URL)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setUsersData(data.users);
        })
        .catch((error) => {
          setUsersData(INITIAL_CONTEX_USERS_STATE);
          console.log(error);
        });
    })();
  }, [isNewUserDataSend]);

  return (
    <ContextStorage.Provider value={valueObject}>
      <Header />
      <Main />
    </ContextStorage.Provider>
  );
};
