import React from "react";
import PropTypes from "prop-types";
import "./CorrectSendInfo.scss";

export const CorrectSendInfo = ({ isDataSend }) =>
  isDataSend ? (
    <p className="add-user__correct-sending-info">{`Poprawnie wysłano dane! :)`}</p>
  ) : null;

CorrectSendInfo.propTypes = {
  isDataSend: PropTypes.bool.isRequired,
};
