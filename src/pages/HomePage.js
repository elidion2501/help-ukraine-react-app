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
        у безпечне місце. <br /> <br />
        <a className="btn  btn-warning" href="https://pomocpreukrajinu.sk/">
          <h2>Знайти або запропонувати житло в словатчинні.</h2>
        </a>
        <br />
        <br />
        <div className="" >
          <img
            // style={{ maxWidth: "600px", maxHeight: "250px" }}
            className="img-fluid"
            style={{maxHeight:'250px'}}
            src="https://slovakstudy.com/wp-content/uploads/kartinka-3.jpg.webp"
            alt=""
          />
        </div>
      </h1>
    </div>
  );
};

export default HomePage;
