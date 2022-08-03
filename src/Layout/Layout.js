import React from "react";
import { Header } from "./../components/Header/Header";
import { Main } from "./../components/Main/Main";
import { Footer } from "./../components/Footer/Footer";
import { ScrollUp } from "./../components/ScrollUp/ScrollUp";

export const Layout = ({ children }) => (
  <>
    <Header />
    <Main>{children}</Main>
    <Footer />
    <ScrollUp />
  </>
);
