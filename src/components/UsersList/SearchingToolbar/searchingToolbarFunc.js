export const getFilteredUsers = (
  usersData,
  searchingLastName,
  searchingAgeFrom,
  searchingAgeTo
) => {
  const filteredUsers = usersData.filter((user) => {
    if (searchingLastName && searchingAgeFrom && searchingAgeTo) {
      console.log("Szukam po wszystkim");
      return user.last_name
        .toLocaleLowerCase()
        .includes(searchingLastName.toLocaleLowerCase()) &&
        user.age >= searchingAgeFrom &&
        user.age <= searchingAgeTo
        ? user
        : null;
    } else if (searchingLastName) {
      console.log("Szukam po nazwisku");
      return user.last_name
        .toLocaleLowerCase()
        .includes(searchingLastName.toLocaleLowerCase())
        ? user
        : null;
    } else if (searchingAgeFrom && searchingAgeTo) {
      console.log("Szukam po zakresie wieku");
      return user.age >= searchingAgeFrom && user.age <= searchingAgeTo
        ? user
        : null;
    }
    return user;
  });
  return filteredUsers;
};
