import React, { Fragment } from "react";
import { useLocation } from "react-router-dom";
import MainNavigation from "./MainNavigation";

const Layout = (props) => {
  const location = useLocation();
  return (
    <Fragment>
      <MainNavigation />
      <main className={"container"}>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
