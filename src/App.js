import { useEffect, useState } from "react";
import { Header } from "./components/Header/Header";
import { Main } from "./components/Main/Main";
import { ContextStorage } from "./ContextStorage";
import { GET_USERS_URL, INITIAL_CONTEX_USERS_STATE } from "./constants";
import "./App.scss";

export const App = () => {
  const [usersData, setUsersData] = useState(INITIAL_CONTEX_USERS_STATE);
  const valueObject = {
    usersData,
    setUsersData,
  };

  useEffect(() => {
    (async () => {
      await fetch(GET_USERS_URL)
        .then((response) => response.json())
        .then((data) => {
          setUsersData(data.users);
        })
        .catch((error) => {
          setUsersData(INITIAL_CONTEX_USERS_STATE);
          console.log(error);
        });
    })();
  }, []);

  return (
    <ContextStorage.Provider value={valueObject}>
      <Header />
      <Main />
    </ContextStorage.Provider>
  );
};
