import React from "react";
import { LayoutContainer } from "./styled";

const Layout = (props) => {
  return <LayoutContainer>{props.children}</LayoutContainer>;
};

export default Layout;
