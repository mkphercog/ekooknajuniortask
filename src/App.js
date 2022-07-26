import { useEffect, useState } from "react";
import { Header } from "./components/Header/Header";
import { Main } from "./components/Main/Main";
import { ContextStorage } from "./common/ContextStorage";
import { GET_USERS_URL, NOT_FOUD_USERS_DATA } from "./common/constants";
import { Footer } from "./components/Footer/Footer";
import { ScrollUp } from "./components/ScrollUp/ScrollUp";

export const App = () => {
  const [usersData, setUsersData] = useState([NOT_FOUD_USERS_DATA]);
  const [changedServerDataFlag, setChangedServerDataFlag] = useState(false);
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
    changedServerDataFlag,
    setChangedServerDataFlag,
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
            setUsersData(data.users);
          });
      } catch (error) {
        setIsFetchError(true);
      }
    })();
  }, [changedServerDataFlag]);

  return (
    <ContextStorage.Provider value={valueObject}>
      <Header />
      <Main />
      <Footer />
      <ScrollUp />
    </ContextStorage.Provider>
  );
};
