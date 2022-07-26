export const getFilteredUsers = (
  usersData,
  searchingLastName,
  searchingAgeFrom,
  searchingAgeTo
) => {
  const filteredUsers = usersData.filter((user) => {
    if (searchingLastName && searchingAgeFrom && searchingAgeTo) {
      return user.last_name
        .toLocaleLowerCase()
        .includes(searchingLastName.toLocaleLowerCase()) &&
        user.age >= searchingAgeFrom &&
        user.age <= searchingAgeTo
        ? user
        : null;
    } else if (searchingLastName) {
      return user.last_name
        .toLocaleLowerCase()
        .includes(searchingLastName.toLocaleLowerCase())
        ? user
        : null;
    } else if (searchingAgeFrom && searchingAgeTo) {
      return user.age >= searchingAgeFrom && user.age <= searchingAgeTo
        ? user
        : null;
    }
    return user;
  });

  return filteredUsers;
};
