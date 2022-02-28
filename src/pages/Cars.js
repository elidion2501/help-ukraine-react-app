import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import AddCar from "../components/Cars/AddCar";
import CarsList from "../components/Cars/CarsList";

const Cars = () => {
  const location = useLocation();

  return (
    <div className="mt-5 container">
      <div className="row text-center justify-content-center">
        <div
          className={
            "col-sm-12 col-md-3 pt-2 pb-2 border border-dark" +
            (location.pathname === "/cars/need"
              ? "alert alert-warning"
              : "border border-dark")
          }
        >
          <NavLink className="nav-link" to="/cars/need">
            Потрібна машина
          </NavLink>
        </div>
        <div
          className={
            "col-sm-12 col-md-3 pt-2 pb-2 border border-dark" +
            (location.pathname === "/cars/have"
              ? "alert alert-info"
              : "border border-dark")
          }
        >
          <NavLink className="nav-link" to="/cars/have">
            Пропонують машину
          </NavLink>
        </div>

        <div
          className={
            "col-sm-12 col-md-3 pt-2 pb-2 border border-dark" +
            (location.pathname === "/cars/border"
              ? "alert alert-success"
              : "border border-dark")
          }
        >
          <NavLink className="nav-link" to="/cars/border">
            Заберуть з кордонів
          </NavLink>
        </div>

        <div className={"col-5 pt-2  mt-2 pb-2 border border-dark"}>
          <NavLink className="nav-link" to="/cars/need/create">
            Попросити про перевезення / Požiadajte o dopravu
          </NavLink>
        </div>

        <div className={"col-5 pt-2   mt-2 pb-2 border border-dark"}>
          <NavLink className="nav-link" to="/cars/have/create">
            Запропонувати перевезення / Ponúknite dopravu
          </NavLink>
        </div>
      </div>

      <div className="mt-3"></div>
      {location.pathname === "/cars/need" && <CarsList type={1} border={""} />}
      {location.pathname === "/cars/have" && <CarsList type={2} border={""} />}
      {location.pathname === "/cars/border" && (
        <CarsList type={3} border={true} />
      )}
    </div>
  );
};

export default Cars;
