import React from "react";
import { Header } from "../Header/Header";
import { Main } from "./../Main/Main";
import { Footer } from "../Footer/Footer";
import { ScrollUp } from "../ScrollUp/ScrollUp";

export const Layout = ({ children }) => (
  <>
    <Header />
    <Main>{children}</Main>
    <Footer />
    <ScrollUp />
  </>
);
