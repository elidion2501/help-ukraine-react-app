import React from "react";
import { useLocation } from "react-router-dom";

const HomePage = () => {
  const location = useLocation();

  return (
    <div
      class={
        "text-center" +
        (location.pathname === "/home"
          ? " bg-primary text-warning "
          : "container")
      }
      style={{
        paddingTop: "35vh",
        height: "100vh",
        width: "100vw",
        marginBottom: 0,
        marginTop: 0,
        position: "absolute",
        top: "0px",
        left: "0px",
        zIndex: "-1",
      }}
    >
      <h1 className="container">
        На цій сторінці ви знайдете людей котрі допомагають з перевезенням людей
        у безпечне місце.
      </h1>
    </div>
  );
};

export default HomePage;
