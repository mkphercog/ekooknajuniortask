import React, { useContext, useState } from "react";
import { NewUserDetails } from "./NewUserDetails/NewUserDetails";
import { ADD_USER_URL, ADD_USER_CLEAR_DATA } from "./../../common/constants";
import { ContextStorage } from "./../../common/ContextStorage";
import { NewUserAddress } from "./NewUserAddress/NewUserAddress";
import {
  handleClearData,
  validateData,
  createFormData,
} from "./addUserHelpers";
import "./AddUser.scss";

export const AddUser = () => {
  const { setIsNewUserDataSend, isNewUserDataSend } =
    useContext(ContextStorage);

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
  const fullPostalCode = `${firstPartPostalCode}-${secondPartPostalCode}`;

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValidateCorrect = validateData(
      firstName,
      lastName,
      age,
      firstPartPostalCode,
      secondPartPostalCode,
      city,
      street
    );

    if (isValidateCorrect) {
      setIsDataCorrect(true);
      const userData = createFormData(
        firstName,
        lastName,
        age,
        fullPostalCode,
        city,
        street
      );
      fetch(ADD_USER_URL, {
        method: "POST",
        body: userData,
      });
      setIsNewUserDataSend(!isNewUserDataSend);
      handleClearData(
        event,
        setFirstName,
        setLastName,
        setAge,
        setFirstPartPostalCode,
        setSecondPartPostalCode,
        setCity,
        setStreet
      );
      console.log("Nowy dodany!");
    } else {
      setIsDataCorrect(false);
      console.log("Sprawdź poprawność danych!");
    }
  };

  return (
    <div className="add-user">
      <h1 className="add-user__title">Dodaj użytkownika</h1>
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
        <button
          className="add-user__btn"
          onClick={(event) => handleSubmit(event)}
        >
          Dodaj
        </button>
        <button
          className="add-user__btn"
          onClick={(event) =>
            handleClearData(
              event,
              setFirstName,
              setLastName,
              setAge,
              setFirstPartPostalCode,
              setSecondPartPostalCode,
              setCity,
              setStreet
            )
          }
        >
          Wyczyść
        </button>
      </form>
      {isDataCorrect ? null : (
        <>
          <h2 className="add-user__error-title">
            Proszę sprawdzić poprawność danych!
          </h2>
          <p className="add-user__error-description">
            Pola nie mogą być puste i nie mogą przekraczać 100 znaków. Wiek
            został ograniczony do 150 lat. Poprawny kod pocztowy to np. 47-400.
          </p>
        </>
      )}
    </div>
  );
};
