import { useEffect, useState } from "react";
import { Header } from "./components/Header/Header";
import { Main } from "./components/Main/Main";
import { ContextStorage } from "./common/ContextStorage";
import { GET_USERS_URL, INITIAL_CONTEX_USERS_STATE } from "./common/constants";
import { Footer } from "./components/Footer/Footer";

export const App = () => {
  const [usersData, setUsersData] = useState(INITIAL_CONTEX_USERS_STATE);
  const [isNewUserDataSend, setIsNewUserDataSend] = useState(false);
  const [filteredUsersData, setFilteredUsersData] = useState([]);
  const [isFilteredData, setIsFilteredData] = useState(false);
  const [filteredDataValues, setFilteredDataValues] = useState({
    searchingLastName: "",
    searchingAgeFrom: "",
    searchingAgeTo: "",
  });
  const valueObject = {
    usersData,
    setUsersData,
    filteredUsersData,
    setFilteredUsersData,
    isFilteredData,
    setIsFilteredData,
    filteredDataValues,
    setFilteredDataValues,
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
      <Footer />
    </ContextStorage.Provider>
  );
};
