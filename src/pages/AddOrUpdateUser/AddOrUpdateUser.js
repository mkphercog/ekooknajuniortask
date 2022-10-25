import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { NewUserDetails } from "./NewUserDetails/NewUserDetails";
import { NewUserAddress } from "./NewUserAddress/NewUserAddress";
import { ErrorServerMessage } from "./../../components/ErrorServerMessage/ErrorServerMessage";
import { IncorrectInputsDataMessage } from "./IncorrectInputsDataMessage/IncorrectInputsDataMessage";
import { CorrectSendInfo } from "./CorrectSendInfo/CorrectSendInfo";
import {
  ADD_USER_CLEAR_DATA,
  GET_DELETE_UPDATE_USER_BY_ID_URL,
} from "../../common/constants";
import {
  handleClearData,
  validateData,
  createFormData,
} from "./addOrUpdateUserHelpers";
import { UserContext } from "../../storage/UserStorage";
import "./AddOrUpdateUser.scss";

const {
  FIRST_NAME,
  LAST_NAME,
  FIRST_PART_POSTAL_CODE,
  SECOND_PART_POSTAL_CODE,
  CITY,
  STREET,
  AGE,
} = ADD_USER_CLEAR_DATA;

export const AddOrUpdateUser = ({ isUpdating = false }) => {
  const { id: userIdFromParams } = useParams();

  const {
    currentUserData,
    addNewUserToServer,
    isFetchError,
    setIsFetchError,
    changedServerDataFlag,
    setChangedServerDataFlag,
    updateUserDataOnServer,
    isDataSend,
    setIsDataSend,
  } = useContext(UserContext);
  const { id: currentUserId } = currentUserData;

  const [firstName, setFirstName] = useState(FIRST_NAME);
  const [lastName, setLastName] = useState(LAST_NAME);
  const [age, setAge] = useState(AGE);
  const [firstPartPostalCode, setFirstPartPostalCode] = useState(
    FIRST_PART_POSTAL_CODE
  );
  const [secondPartPostalCode, setSecondPartPostalCode] = useState(
    SECOND_PART_POSTAL_CODE
  );
  const [city, setCity] = useState(CITY);
  const [street, setStreet] = useState(STREET);
  const [isDataCorrect, setIsDataCorrect] = useState(true);
  const fullPostalCode = `${firstPartPostalCode}-${secondPartPostalCode}`;
  const arrayOfAllSettersForUserData = [
    setFirstName,
    setLastName,
    setAge,
    setFirstPartPostalCode,
    setSecondPartPostalCode,
    setCity,
    setStreet,
  ];
  const arrayOfAllUserDataFromUseState = [
    firstName,
    lastName,
    age,
    firstPartPostalCode,
    secondPartPostalCode,
    city,
    street,
  ];
  const arrayOfAllUserDataFromUseStateWithFullPostalCode = [
    firstName,
    lastName,
    age,
    fullPostalCode,
    city,
    street,
  ];

  const getCurrentUserDataFromServerToRender = async () => {
    try {
      const response = await fetch(
        `${GET_DELETE_UPDATE_USER_BY_ID_URL}${userIdFromParams}`
      );
      const data = await response.json();
      if (data.status) {
        setIsFetchError(false);
        const { postal_code, first_name, last_name, age, city, street } =
          data.user;
        const firstPartPostalCode = postal_code.slice(0, 2);
        const secondPartPostalCode = postal_code.slice(3, 6);
        setFirstName(first_name);
        setLastName(last_name);
        setAge(age);
        setFirstPartPostalCode(Number(firstPartPostalCode) || 0);
        setSecondPartPostalCode(Number(secondPartPostalCode) || 0);
        setCity(city);
        setStreet(street);
      } else {
        setIsFetchError(true);
      }
    } catch (error) {
      setIsFetchError(true);
      console.log(`${error} - my error`);
    }
  };

  useEffect(() => {
    if (isUpdating) {
      getCurrentUserDataFromServerToRender();
      setIsDataSend(false);
    } else {
      handleClearData(null, ...arrayOfAllSettersForUserData);
      setIsDataCorrect(true);
      setIsDataSend(false);
      setIsFetchError(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userIdFromParams, currentUserId]);

  const handleAddNewUser = (event) => {
    event.preventDefault();
    const isValidateCorrect = validateData(...arrayOfAllUserDataFromUseState);

    if (isValidateCorrect) {
      setIsDataCorrect(true);
      const userData = createFormData(
        ...arrayOfAllUserDataFromUseStateWithFullPostalCode
      );
      addNewUserToServer(userData);
      setChangedServerDataFlag(!changedServerDataFlag);
      if (isDataSend) handleClearData(event, ...arrayOfAllSettersForUserData);
    } else {
      setIsDataCorrect(false);
    }
  };

  const handleUpdateUserData = (event) => {
    event.preventDefault();
    const isValidateCorrect = validateData(...arrayOfAllUserDataFromUseState);

    if (isValidateCorrect) {
      setIsDataCorrect(true);
      const userData = createFormData(
        ...arrayOfAllUserDataFromUseStateWithFullPostalCode
      );
      updateUserDataOnServer(userIdFromParams, userData);
    } else {
      setIsDataCorrect(false);
    }
  };

  return (
    <div className="add-user">
      <h1 className="add-user__title">
        {isUpdating
          ? `Aktualizujesz dane użytkownika (id: ${userIdFromParams})`
          : "Dodaj użytkownika"}
      </h1>
      <form action="submit" className="add-user__form">
        <NewUserDetails
          firstName={firstName}
          lastName={lastName}
          age={age}
          setFirstName={setFirstName}
          setLastName={setLastName}
          setAge={setAge}
        />
        <NewUserAddress
          firstPartPostalCode={firstPartPostalCode}
          secondPartPostalCode={secondPartPostalCode}
          city={city}
          street={street}
          setFirstPartPostalCode={setFirstPartPostalCode}
          setSecondPartPostalCode={setSecondPartPostalCode}
          setCity={setCity}
          setStreet={setStreet}
        />
        <div className="add-user__btn-wrapper">
          <button
            className="add-user__btn"
            onClick={(event) => {
              isUpdating
                ? handleUpdateUserData(event)
                : handleAddNewUser(event);
            }}
          >
            {isUpdating ? "Aktualizuj" : "Dodaj"}
          </button>
          <button
            className="add-user__btn"
            onClick={(event) => {
              event.preventDefault();
              handleClearData(event, ...arrayOfAllSettersForUserData);
              setIsDataCorrect(true);
              setIsDataSend(false);
              setIsFetchError(false);
            }}
          >
            Wyczyść
          </button>
        </div>
      </form>
      <IncorrectInputsDataMessage isDataCorrect={isDataCorrect} />
      <CorrectSendInfo isDataSend={isDataSend} />
      <ErrorServerMessage isFetchError={isFetchError} />
    </div>
  );
};

AddOrUpdateUser.propTypes = {
  isUpdating: PropTypes.bool,
};
