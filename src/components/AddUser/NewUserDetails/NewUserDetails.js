import React from "react";
import PropTypes from "prop-types";
import { handleInputValue } from "./../addUserHelpers";

export const NewUserDetails = ({
  firstName,
  lastName,
  age,
  setFirstName,
  setLastName,
  setAge,
}) => (
  <div className="add_user__wrapper">
    <label htmlFor="firstName" className="add_user__label">
      Imię:
    </label>
    <input
      type="text"
      name="firstName"
      className="add_user__input"
      value={firstName}
      onChange={(event) => {
        handleInputValue(event, setFirstName);
      }}
    />

    <label htmlFor="lastName" className="add_user__label">
      Nazwisko:
    </label>
    <input
      type="text"
      name="lastName"
      className="add_user__input"
      value={lastName}
      onChange={(event) => {
        handleInputValue(event, setLastName);
      }}
    />

    <label htmlFor="age" className="add_user__label">
      Wiek:
    </label>
    <input
      type="number"
      name="age"
      className="add_user__input"
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
