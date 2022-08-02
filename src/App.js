import { useEffect, useState } from "react";
import { ContextStorage } from "./storage/ContextStorage";
import { GET_USERS_URL, NOT_FOUD_USERS_DATA } from "./common/constants";
import { Layout } from "./components/Layout/Layout";
import { Router } from "./router/Router";

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
  const contextValues = {
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
        const response = await fetch(GET_USERS_URL);
        const data = await response.json();
        setIsFetchError(false);
        setUsersData(data.users);
      } catch (error) {
        setIsFetchError(true);
        console.log(error);
      }
    })();
  }, [changedServerDataFlag]);

  return (
    <ContextStorage.Provider value={contextValues}>
      <Layout>
        <Router />
      </Layout>
    </ContextStorage.Provider>
  );
};
