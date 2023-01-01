import React from "react";
import Contact from "./Contact";
import HeaderBottom from "./HeaderBottom";
import HeaderTop from "./HeaderTop";

type Props = {};

const Header = (props: Props) => {
  return (
    <header>
      <Contact />
      <HeaderTop />
      <HeaderBottom />
    </header>
  );
};

export default Header;
