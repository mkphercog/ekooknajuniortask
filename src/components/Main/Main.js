import React from "react";
import { UsersList } from "../UsersList/UsersList";
import "./Main.scss";

export const Main = () => (
  <main className="main">
    <section className="main__wrapper">
      <UsersList />
    </section>
  </main>
);
