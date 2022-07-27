import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { NewUserDetails } from "./NewUserDetails/NewUserDetails";
import { NewUserAddress } from "./NewUserAddress/NewUserAddress";
import { ErrorServerMessage } from "./../../components/ErrorServerMessage/ErrorServerMessage";
import { IncorrectInputsDataMessage } from "./IncorrectInputsDataMessage/IncorrectInputsDataMessage";
import { CorrectSendInfo } from "./CorrectSendInfo/CorrectSendInfo";
import {
  ADD_USER_URL,
  GET_DELETE_UPDATE_USER_BY_ID_URL,
  ADD_USER_CLEAR_DATA,
} from "../../common/constants";
import {
  handleClearData,
  validateData,
  createFormData,
} from "./addOrUpdateUserHelpers";
import { ContextStorage } from "../../storage/ContextStorage";
import "./AddOrUpdateUser.scss";

export const AddOrUpdateUser = ({ isUpdating = false }) => {
  const {
    changedServerDataFlag,
    setChangedServerDataFlag,
    isFetchError,
    setIsFetchError,
  } = useContext(ContextStorage);
  const { id: userID } = useParams();
  const {
    FIRST_NAME,
    LAST_NAME,
    FIRST_PART_POSTAL_CODE,
    SECOND_PART_POSTAL_CODE,
    CITY,
    STREET,
    AGE,
  } = ADD_USER_CLEAR_DATA;
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
  const [isDataSend, setIsDataSend] = useState(false);
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

  useEffect(() => {
    if (userID && isUpdating) {
      (async () => {
        try {
          await fetch(`${GET_DELETE_UPDATE_USER_BY_ID_URL}${userID}`)
            .then((res) => {
              if (res.ok) {
                setIsFetchError(false);
                return res.json();
              } else {
                setIsFetchError(true);
              }
            })
            .then(({ user }) => {
              const firstPartPostalCode = user.postal_code.slice(0, 2);
              const secondPartPostalCode = user.postal_code.slice(3, 6);
              setFirstName(user.first_name);
              setLastName(user.last_name);
              setAge(user.age);
              setFirstPartPostalCode(Number(firstPartPostalCode) || 0);
              setSecondPartPostalCode(Number(secondPartPostalCode) || 0);
              setCity(user.city);
              setStreet(user.street);
              setIsFetchError(false);
            });
        } catch (error) {
          setIsFetchError(true);
        }
      })();
    } else if (!isUpdating) {
      setFirstName(FIRST_NAME);
      setLastName(LAST_NAME);
      setAge(AGE);
      setFirstPartPostalCode(FIRST_PART_POSTAL_CODE);
      setSecondPartPostalCode(SECOND_PART_POSTAL_CODE);
      setCity(CITY);
      setStreet(STREET);
      setIsDataCorrect(true);
      setIsDataSend(false);
      setIsFetchError(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdating]);

  const handleAddNewUser = (event) => {
    event.preventDefault();
    const isValidateCorrect = validateData(...arrayOfAllUserDataFromUseState);

    if (isValidateCorrect) {
      setIsDataCorrect(true);
      const userData = createFormData(
        ...arrayOfAllUserDataFromUseStateWithFullPostalCode
      );
      (async () => {
        try {
          await fetch(ADD_USER_URL, {
            method: "POST",
            body: userData,
          }).then((res) => {
            if (res.ok) {
              setIsDataSend(true);
              setIsFetchError(false);
              setChangedServerDataFlag(!changedServerDataFlag);
              handleClearData(event, ...arrayOfAllSettersForUserData);
            } else {
              setIsFetchError(true);
            }
          });
        } catch (error) {
          setIsFetchError(true);
        }
      })();
    } else {
      setIsDataCorrect(false);
      setIsDataSend(false);
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
      //searching for good idea about updating data, for now not working... although adding new user with method POST works :/
      //maybe some problem with server?
      (async () => {
        try {
          await fetch(`${GET_DELETE_UPDATE_USER_BY_ID_URL}${userID}`, {
            method: "PUT",
            body: userData,
          }).then((res) => {
            if (res.ok) {
              setIsFetchError(false);
              setIsDataSend(true);
              setChangedServerDataFlag(!changedServerDataFlag);
              handleClearData(event, ...arrayOfAllSettersForUserData);
            } else {
              setIsFetchError(true);
            }
          });
        } catch (error) {
          setIsFetchError(true);
        }
      })();
    } else {
      setIsDataCorrect(false);
      setIsDataSend(false);
    }
  };

  return (
    <div className="add-user">
      <h1 className="add-user__title">
        {isUpdating ? "Aktualizujesz dane użytkownika" : "Dodaj użytkownika"}
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
