import React from "react";
import PropTypes from "prop-types";
import { handleInputValue } from "./../addUserHelpers";

export const NewUserAdress = ({
  firstPartPostalCode,
  secondPartPostalCode,
  city,
  street,
  setFirstPartPostalCode,
  setSecondPartPostalCode,
  setCity,
  setStreet,
}) => (
  <div className="add_user__wrapper">
    <label htmlFor="firstPartPostalCode" className="add_user__label">
      Kod pocztowy:
    </label>
    <input
      type="number"
      name="firstPartPostalCode"
      className="add_user__input"
      value={firstPartPostalCode}
      onChange={(event) => {
        handleInputValue(event, setFirstPartPostalCode, true);
      }}
    />
    <span>-</span>
    <input
      type="number"
      name="secondPartPostalCode"
      className="add_user__input"
      value={secondPartPostalCode}
      onChange={(event) => {
        handleInputValue(event, setSecondPartPostalCode, true);
      }}
      maxLength="3"
    />
    <label htmlFor="city" className="add_user__label">
      Miasto:
    </label>
    <input
      type="text"
      name="city"
      className="add_user__input"
      value={city}
      onChange={(event) => {
        handleInputValue(event, setCity);
      }}
    />
    <label htmlFor="street" className="add_user__label">
      Ulica:
    </label>
    <input
      type="text"
      name="street"
      className="add_user__input"
      value={street}
      onChange={(event) => {
        handleInputValue(event, setStreet);
      }}
    />
  </div>
);

NewUserAdress.propTypes = {
  firstPartPostalCode: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  secondPartPostalCode: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  city: PropTypes.string.isRequired,
  street: PropTypes.string.isRequired,
  setFirstPartPostalCode: PropTypes.func.isRequired,
  setSecondPartPostalCode: PropTypes.func.isRequired,
  setCity: PropTypes.func.isRequired,
  setStreet: PropTypes.func.isRequired,
};
