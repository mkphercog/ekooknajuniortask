import React from "react";
import PropTypes from "prop-types";
import { handleInputValue } from "../addUserHelpers";
import "./NewUserAddress.scss";

export const NewUserAddress = ({
  firstPartPostalCode,
  secondPartPostalCode,
  city,
  street,
  setFirstPartPostalCode,
  setSecondPartPostalCode,
  setCity,
  setStreet,
}) => (
  <div className="address__wrapper">
    <label htmlFor="firstPartPostalCode" className="address__label">
      Kod pocztowy:
    </label>
    <input
      type="number"
      name="firstPartPostalCode"
      className="address__input"
      value={firstPartPostalCode}
      onChange={(event) => {
        handleInputValue(event, setFirstPartPostalCode, true);
      }}
    />
    <span>-</span>
    <input
      type="number"
      name="secondPartPostalCode"
      className="address__input"
      value={secondPartPostalCode}
      onChange={(event) => {
        handleInputValue(event, setSecondPartPostalCode, true);
      }}
      maxLength="3"
    />
    <label htmlFor="city" className="address__label">
      Miasto:
    </label>
    <input
      type="text"
      name="city"
      className="address__input"
      value={city}
      onChange={(event) => {
        handleInputValue(event, setCity);
      }}
    />
    <label htmlFor="street" className="address__label">
      Ulica:
    </label>
    <input
      type="text"
      name="street"
      className="address__input"
      value={street}
      onChange={(event) => {
        handleInputValue(event, setStreet);
      }}
    />
  </div>
);

NewUserAddress.propTypes = {
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
