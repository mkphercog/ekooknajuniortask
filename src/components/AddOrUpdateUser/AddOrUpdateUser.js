import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { NewUserDetails } from "./NewUserDetails/NewUserDetails";
import { useParams } from "react-router-dom";
import {
  ADD_USER_URL,
  DELETE_UPDATE_USER_URL,
  ADD_USER_CLEAR_DATA,
} from "../../common/constants";
import { ContextStorage } from "../../common/ContextStorage";
import { NewUserAddress } from "./NewUserAddress/NewUserAddress";
import {
  handleClearData,
  validateData,
  createFormData,
} from "./addOrUpdateUserHelpers";
import "./AddOrUpdateUser.scss";

export const AddOrUpdateUser = ({ isUpdating = false }) => {
  const { setIsNewUserDataSend, isNewUserDataSend } =
    useContext(ContextStorage);
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
  const arrayOfAllSettersFromUseState = [
    setFirstName,
    setLastName,
    setAge,
    setFirstPartPostalCode,
    setSecondPartPostalCode,
    setCity,
    setStreet,
  ];
  const arrayOfAllDataFromUseState = [
    firstName,
    lastName,
    age,
    firstPartPostalCode,
    secondPartPostalCode,
    city,
    street,
  ];
  const arrayOfAllDataFromUseStateWithFullPostalCode = [
    firstName,
    lastName,
    age,
    fullPostalCode,
    city,
    street,
  ];

  useEffect(() => {
    if (userID && isUpdating) {
      console.log("Pobieram dane");
      fetch(`${DELETE_UPDATE_USER_URL}${userID}`)
        .then((response) => response.json())
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
        })
        .catch((error) => console.log(error));
    } else if (!isUpdating) {
      console.log("czyszczę dane");
      setFirstName(FIRST_NAME);
      setLastName(LAST_NAME);
      setAge(AGE);
      setFirstPartPostalCode(FIRST_PART_POSTAL_CODE);
      setSecondPartPostalCode(SECOND_PART_POSTAL_CODE);
      setCity(CITY);
      setStreet(STREET);
      setIsDataCorrect(true);
      setIsDataSend(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdating]);

  const handleUpdate = (event) => {
    event.preventDefault();
    console.log(firstName);
    const isValidateCorrect = validateData(...arrayOfAllDataFromUseState);

    if (isValidateCorrect) {
      setIsDataCorrect(true);
      const userData = createFormData(
        ...arrayOfAllDataFromUseStateWithFullPostalCode
      );
      //searching for good idea about updating data for now not working... although adding new user with method POST it works :/
      // fetch(`${DELETE_UPDATE_USER_URL}${userID}`, {
      //   method: "PUT",
      //   body: userData,
      // });
      // -----------------------------------------------
      setIsNewUserDataSend(!isNewUserDataSend);
      handleClearData(event, ...arrayOfAllSettersFromUseState);
      setIsDataSend(true);
      console.log("Akutalizacja danych poprawna!");
    } else {
      setIsDataCorrect(false);
      setIsDataSend(false);
      console.log("Sprawdź poprawność danych!");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValidateCorrect = validateData(...arrayOfAllDataFromUseState);

    if (isValidateCorrect) {
      setIsDataCorrect(true);
      const userData = createFormData(
        ...arrayOfAllDataFromUseStateWithFullPostalCode
      );
      // fetch(ADD_USER_URL, {
      //   method: "POST",
      //   body: userData,
      // });
      setIsNewUserDataSend(!isNewUserDataSend);
      handleClearData(event, ...arrayOfAllSettersFromUseState);
      setIsDataSend(true);
      console.log("Nowy dodany!");
    } else {
      setIsDataCorrect(false);
      setIsDataSend(false);
      console.log("Sprawdź poprawność danych!");
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
              isUpdating ? handleUpdate(event) : handleSubmit(event);
            }}
          >
            {isUpdating ? "Aktualizuj" : "Dodaj"}
          </button>
          <button
            className="add-user__btn"
            onClick={(event) => {
              handleClearData(event, ...arrayOfAllSettersFromUseState);
              setIsDataCorrect(true);
              setIsDataSend(false);
            }}
          >
            Wyczyść
          </button>
        </div>
      </form>
      {isDataCorrect ? null : (
        <>
          <h2 className="add-user__error-title">
            Proszę sprawdzić poprawność danych!
          </h2>
          <p className="add-user__error-description">
            Pola nie mogą być puste i nie mogą przekraczać{" "}
            <span className="add-user__error-description-bold">100</span>{" "}
            znaków.
          </p>
          <p className="add-user__error-description">
            Wiek nie może być{" "}
            <span className="add-user__error-description-bold">
              niższy niż 1
            </span>
            , został również ograniczony do{" "}
            <span className="add-user__error-description-bold">150 lat</span>.
          </p>

          <p className="add-user__error-description">
            Poprawny kod pocztowy to np.{" "}
            <span className="add-user__error-description-bold">47-400</span>,
            dwie cyfry przed myślnikiem i trzy cyfry po myślniku.
          </p>
        </>
      )}
      {isDataSend ? (
        <p className="add-user__correct-sending-info">{`Poprawnie wysłano dane! :)`}</p>
      ) : null}
    </div>
  );
};

AddOrUpdateUser.propTypes = {
  isUpdating: PropTypes.bool,
};
