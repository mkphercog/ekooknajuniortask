import { useEffect, useState } from "react";
import { Header } from "./components/Header/Header";
import { Main } from "./components/Main/Main";
import { ContextStorage } from "./common/ContextStorage";
import { GET_USERS_URL, NOT_FOUD_USERS_DATA } from "./common/constants";
import { Footer } from "./components/Footer/Footer";

export const App = () => {
  const [usersData, setUsersData] = useState([NOT_FOUD_USERS_DATA]);
  const [isNewUserDataSend, setIsNewUserDataSend] = useState(false);
  const [filteredUsersData, setFilteredUsersData] = useState([]);
  const [isFilteredData, setIsFilteredData] = useState(false);
  const [filteredDataValues, setFilteredDataValues] = useState({
    searchingLastName: "",
    searchingAgeFrom: "",
    searchingAgeTo: "",
  });
  const [isFetchError, setIsFetchError] = useState(false);
  const valueObject = {
    usersData,
    setUsersData,
    filteredUsersData,
    setFilteredUsersData,
    isFilteredData,
    setIsFilteredData,
    filteredDataValues,
    setFilteredDataValues,
    isFetchError,
    setIsFetchError,
    isNewUserDataSend,
    setIsNewUserDataSend,
  };

  useEffect(() => {
    (async () => {
      try {
        await fetch(GET_USERS_URL)
          .then((res) => {
            if (res.ok) {
              setIsFetchError(false);
              return res.json();
            } else {
              setIsFetchError(true);
            }
          })
          .then((data) => {
            console.log(data);
            setUsersData(data.users);
          });
      } catch (error) {
        console.log("WYSTĄPIŁ BŁĄD!");
        console.log(error);
        setIsFetchError(true);
      }
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
