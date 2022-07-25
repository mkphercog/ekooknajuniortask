import React from "react";
import PropTypes from "prop-types";
import "./ErrorServerMessage.scss";

export const ErrorServerMessage = ({ isFetchError }) =>
  isFetchError ? (
    <p className="error-server-message">
      Wystąpił problem z podłączeniem się do serwera.
    </p>
  ) : null;

ErrorServerMessage.propTypes = {
  isFetchError: PropTypes.bool.isRequired,
};
