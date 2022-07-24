import React from "react";
import PropTypes from "prop-types";
import { handleInputValue } from "./../addUserHelpers";
import "./NewUserDetails.scss";

export const NewUserDetails = ({
  firstName,
  lastName,
  age,
  setFirstName,
  setLastName,
  setAge,
}) => (
  <div className="details__wrapper">
    <label htmlFor="firstName" className="details__label">
      Imię:
    </label>
    <input
      type="text"
      name="firstName"
      className="details__input"
      value={firstName}
      onChange={(event) => {
        handleInputValue(event, setFirstName);
      }}
    />

    <label htmlFor="lastName" className="details__label">
      Nazwisko:
    </label>
    <input
      type="text"
      name="lastName"
      className="details__input"
      value={lastName}
      onChange={(event) => {
        handleInputValue(event, setLastName);
      }}
    />

    <label htmlFor="age" className="details__label">
      Wiek:
    </label>
    <input
      type="number"
      name="age"
      className="details__input details__input--smaller"
      value={age}
      onChange={(event) => {
        handleInputValue(event, setAge, true);
      }}
    />
  </div>
);

NewUserDetails.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  age: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  setFirstName: PropTypes.func.isRequired,
  setLastName: PropTypes.func.isRequired,
  setAge: PropTypes.func.isRequired,
};
