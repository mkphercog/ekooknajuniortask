import React from "react";
import "./UsersList.scss";

export const UsersList = () => {
  //static data just for basic layout tests
  const renderUsers = [
    {
      first_name: "Maciek ",
      last_name: "Wiosna",
      postal_code: "23-323",
      street: "Mariańska",
      city: "City",
      age: 23,
      id: 28,
    },
    {
      first_name: "Ana",
      last_name: "Kowalska",
      postal_code: "11-333",
      street: "Wolna",
      city: "Wroclaw",
      age: 76,
      id: 30,
    },
    {
      first_name: "Mariusz",
      last_name: "Kowalski",
      postal_code: "32-432",
      street: "asdhas",
      city: "asdasd",
      age: 45,
      id: 31,
    },
    {
      first_name: "Mariusz",
      last_name: "Kowalski",
      postal_code: "32-432",
      street: "asdhas",
      city: "asdasd",
      age: 45,
      id: 32,
    },
  ].map((user) => (
    <li key={user.id} className="list__user">
      <p className="list__user_details">{`${user.first_name} ${user.last_name}`}</p>
      <p className="list__user_details">{user.age}</p>
      <p className="list__user_details">
        {`${user.postal_code} ${user.city} ${user.street}`}
      </p>
      <div className="list__user_details">
        <button className="list__user_btn">Aktualizuj</button>
        <button className="list__user_btn">Usuń</button>
      </div>
    </li>
  ));

  return (
    <div className="list">
      <div className="list__header">
        <p className="list__header_description">Imię i nazwisko</p>
        <p className="list__header_description">Wiek</p>
        <p className="list__header_description">Adres zamieszkania</p>
        <p className="list__header_description">Działania</p>
      </div>
      <ul className="list__users_list">{renderUsers}</ul>
    </div>
  );
};
