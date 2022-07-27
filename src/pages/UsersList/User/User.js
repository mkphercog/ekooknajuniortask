import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { routerPaths } from "../../../router/routerPaths";
import "./User.scss";

export const User = ({ user }) => {
  const history = useNavigate();
  const { first_name, last_name, age, postal_code, city, street, id } = user;

  return (
    <li className="user">
      <p className="user__details">{`${first_name} ${last_name}`}</p>
      <p className="user__details">{age}</p>
      <p className="user__details">{`${postal_code} ${city}, ul. ${street}`}</p>
      <div className="user__details">
        {id < 0 ? null : (
          <>
            <button
              className="user__btn"
              onClick={() => {
                history(`${routerPaths.UPDATE_USER}${id}`);
              }}
            >
              Aktualizuj
            </button>
            <button
              className="user__btn user__btn--red"
              onClick={() => {
                history(`${routerPaths.DELETE_USER}${id}`);
              }}
            >
              Usuń
            </button>
          </>
        )}
      </div>
    </li>
  );
};

User.propTypes = {
  user: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    postal_code: PropTypes.string,
    street: PropTypes.string,
    city: PropTypes.string,
    age: PropTypes.number,
    id: PropTypes.number,
  }).isRequired,
};
