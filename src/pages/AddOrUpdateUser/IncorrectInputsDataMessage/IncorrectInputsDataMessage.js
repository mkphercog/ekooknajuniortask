import React from "react";
import PropTypes from "prop-types";
import "./IncorrectInputsDataMessage.scss";

export const IncorrectInputsDataMessage = ({ isDataCorrect }) =>
  isDataCorrect ? null : (
    <>
      <h2 className="add-user__error-title">
        Proszę sprawdzić poprawność danych!
      </h2>
      <p className="add-user__error-description">
        Pola nie mogą być puste i nie mogą przekraczać{" "}
        <span className="add-user__error-description-bold">100</span> znaków.
      </p>
      <p className="add-user__error-description">
        Wiek nie może być{" "}
        <span className="add-user__error-description-bold">niższy niż 1</span>,
        został również ograniczony do{" "}
        <span className="add-user__error-description-bold">150 lat</span>.
      </p>

      <p className="add-user__error-description">
        Poprawny kod pocztowy to np.{" "}
        <span className="add-user__error-description-bold">47-400</span>, dwie
        cyfry przed myślnikiem i trzy cyfry po myślniku.
      </p>
    </>
  );

IncorrectInputsDataMessage.propTypes = {
  isDataCorrect: PropTypes.bool.isRequired,
};
