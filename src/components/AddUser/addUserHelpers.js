import { ADD_USER_CLEAR_DATA } from "./../../common/constants";

export const handleInputValue = (
  event,
  setterInputValueFunction,
  isNumber = false
) => {
  const inputValue = event.currentTarget.value;
  if (isNumber) {
    if (!inputValue) {
      setterInputValueFunction("");
    } else {
      setterInputValueFunction(parseInt(inputValue));
    }
  } else {
    setterInputValueFunction(inputValue);
  }
};

const {
  FIRST_NAME,
  LAST_NAME,
  FIRST_PART_POSTAL_CODE,
  SECOND_PART_POSTAL_CODE,
  CITY,
  STREET,
  AGE,
} = ADD_USER_CLEAR_DATA;

export const handleClearData = (
  event,
  setFirstName,
  setLastName,
  setAge,
  setFirstPartPostalCode,
  setSecondPartPostalCode,
  setCity,
  setStreet
) => {
  event.preventDefault();
  setFirstName(FIRST_NAME);
  setLastName(LAST_NAME);
  setAge(AGE);
  setFirstPartPostalCode(FIRST_PART_POSTAL_CODE);
  setSecondPartPostalCode(SECOND_PART_POSTAL_CODE);
  setCity(CITY);
  setStreet(STREET);
};

export const validateData = (
  firstName,
  lastName,
  age,
  firstPartPostalCode,
  secondPartPostalCode,
  city,
  street
) => {
  const arrayOfStrings = [firstName, lastName, city, street];
  let isCorrect = true;
  arrayOfStrings.forEach((item) => {
    if (item.length === 0 || item.length > 100) {
      isCorrect = false;
    }
  });
  if (
    firstPartPostalCode < 0 ||
    firstPartPostalCode >= 100 ||
    secondPartPostalCode < 100 ||
    secondPartPostalCode >= 1000
  ) {
    isCorrect = false;
  } else if (age < 1 || age > 150) {
    isCorrect = false;
  }
  return isCorrect;
};

export const createFormData = (
  firstName,
  lastName,
  age,
  fullPostalCode,
  city,
  street
) => {
  const formUserData = new FormData();
  formUserData.append("first_name", firstName);
  formUserData.append("last_name", lastName);
  formUserData.append("postal_code", fullPostalCode);
  formUserData.append("street", street);
  formUserData.append("city", city);
  formUserData.append("age", age);

  return formUserData;
};
