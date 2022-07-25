export const GET_USERS_URL = "https://fronttest.ekookna.pl";
export const ADD_USER_URL = "https://fronttest.ekookna.pl/user";
export const GET_DELETE_UPDATE_USER_BY_ID_URL =
  "https://fronttest.ekookna.pl/user/";

export const ADD_USER_CLEAR_DATA = {
  FIRST_NAME: "",
  LAST_NAME: "",
  FIRST_PART_POSTAL_CODE: 47,
  SECOND_PART_POSTAL_CODE: 400,
  STREET: "",
  CITY: "",
  AGE: 1,
};

export const NOT_FOUD_USERS_DATA = {
  first_name: "BRAK",
  last_name: "DANYCH",
  postal_code: "**-***",
  street: "DANYCH",
  city: "BRAK",
  age: 0,
  id: -1,
};
