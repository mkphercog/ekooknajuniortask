export const GET_USERS_URL = "http://fronttest.ekookna.pl";
export const ADD_USER_URL = "http://fronttest.ekookna.pl/user";
export const DELETE_UPDATE_USER_URL = "http://fronttest.ekookna.pl/user/";

export const INITIAL_CONTEX_USERS_STATE = [
  {
    first_name: "",
    last_name: "",
    postal_code: "",
    street: "",
    city: "",
    age: 0,
    id: -1,
  },
];

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
