import { createContext, useState } from "react";

export const FilteredUsersContext = createContext({
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
});

export const FilteredUsersProvider = ({ children }) => {
  const [filteredUsersData, setFilteredUsersData] = useState([]);
  const [isFilteredData, setIsFilteredData] = useState(false);
  const [filteredDataValues, setFilteredDataValues] = useState({
    searchingLastName: "",
    searchingAgeFrom: "",
    searchingAgeTo: "",
  });
  const contextValues = {
    filteredUsersData,
    setFilteredUsersData,
    isFilteredData,
    setIsFilteredData,
    filteredDataValues,
    setFilteredDataValues,
  };

  return (
    <FilteredUsersContext.Provider value={contextValues}>
      {children}
    </FilteredUsersContext.Provider>
  );
};
