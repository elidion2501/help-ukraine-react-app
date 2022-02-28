import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AsyncSelect from "react-select";

const AddCarPage = () => {
  const location = useLocation();

  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [cityFrom, setCityFrom] = useState("");
  const [cityTo, setCityTo] = useState("");
  const [count, setCount] = useState("");
  const [type, setType] = useState("");
  const [car, setCar] = useState("");
  const [info, setInfo] = useState("");
  const [withAnimals, setAnimals] = useState(false);
  const [withStuff, setStuff] = useState(false);
  const [withPeople, setPeople] = useState(false);
  const [takeFromBorder, setTakeFromBorder] = useState(false);
  const [errors, setErrors] = useState();

  const [cityFromInput, setCityFromInput] = useState("");
  const [citiesFrom, setCitiesFrom] = useState([]);

  const [cityToInput, setCityToInput] = useState("");
  const [citiesTo, setCitiesTo] = useState([]);

  const history = useNavigate();
  useEffect(() => {
    if (location.pathname === "/cars/have/create") {
      setType(2);
    } else {
      setType(1);
    }
  }, [location]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/cities?body=" + cityFromInput, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            setErrors(data.errors);
            throw new Error(data);
          });
        }
      })
      .then((data) => {
        setCitiesFrom(data.data.data);
      })
      .catch((err) => {});
  }, [cityFromInput]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/cities?body=" + cityToInput, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            setErrors(data.errors);
            throw new Error(data);
          });
        }
      })
      .then((data) => {
        setCitiesTo(data.data.data);
      })
      .catch((err) => {});
  }, [cityToInput]);

  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };

  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };
  const phoneChangeHandler = (event) => {
    setPhone(event.target.value);
  };

  const countChangeHandler = (event) => {
    setCount(event.target.value);
  };
  const carChangeHandler = (event) => {
    setCar(event.target.value);
  };
  const stuffChangeHandler = (event) => {
    setStuff(!withStuff);
  };
  const peopleChangeHandler = (event) => {
    setPeople(!withPeople);
  };
  const animalsChangeHandler = (event) => {
    setAnimals(!withAnimals);
  };

  const takeFromBorderChangeHandler = (event) => {
    setTakeFromBorder(!takeFromBorder);
  };
  const infoChangeHandler = (event) => {
    setInfo(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();

    fetch("http://127.0.0.1:8000/api/car", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        city_from_id: cityFrom,
        city_to_id: cityTo,
        phone: phone,
        title: title,
        count: count,
        type: type,
        info: info,
        car: car,
        with_people: withPeople,
        only_stuff: withStuff,
        with_animals: withAnimals,
        take_from_borders: takeFromBorder,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            setErrors(data.errors);
            throw new Error(data.errors);
          });
        }
      })
      .then((data) => {
        history("/cars/need");
      })
      .catch((err) => {});
  };

  const changeInputSelectFrom = (value) => {
    setCityFromInput(value);
  };
  const changeSelectFrom = (value) => {
    setCityFrom(value.value);
  };

  const changeInputSelectTo = (value) => {
    setCityToInput(value);
  };
  const changeSelectTo = (value) => {
    setCityTo(value.value);
  };

  return (
    <div>
      {type === 1 && (
        <h4 className="text-center mt-5">
          Попросити про перевезення / Požiadajte o dopravu
        </h4>
      )}
      {type === 2 && (
        <h4 className="text-center mt-5">
          Запропонувати перевезення / Ponúknite dopravu
        </h4>
      )}
      <form className="mt-5" onSubmit={submitHandler}>
        <div className="mb-3 row">
          <label
            htmlFor="staticEmail"
            className={
              "col-sm-2 col-form-label " +
              (errors?.city_from_id ? "  text-danger " : "")
            }
          >
            Місто відправлення / Mesto odchodu*:
          </label>
          <div className="col-sm-10 ">
            <AsyncSelect
              options={citiesFrom}
              placeholder={"Виберіть місто відправлення"}
              inputValue={cityFromInput}
              onInputChange={changeInputSelectFrom}
              onChange={changeSelectFrom}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label
            htmlFor="staticEmail"
            className={
              "col-sm-2 col-form-label" +
              (errors?.city_to_id ? " text-danger " : "")
            }
          >
            В напрямку міста / V smere do mesta*:
          </label>
          <div className="col-sm-10">
            <AsyncSelect
              placeholder={"Виберіть місто призначення"}
              options={citiesTo}
              inputValue={cityToInput}
              onInputChange={changeInputSelectTo}
              onChange={changeSelectTo}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label
            htmlFor="staticEmail"
            className={
              "col-sm-2 col-form-label" + (errors?.title ? " text-danger " : "")
            }
          >
            Короткий заголовок / Krátky názov*:
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className={"form-control"}
              value={title}
              onChange={titleChangeHandler}
            />
          </div>
        </div>

        <div className="mb-3 row">
          <label
            htmlFor="staticEmail"
            className={
              "col-sm-2 col-form-label" + (errors?.name ? " text-danger " : "")
            }
          >
            Ім'я контактної людини / Meno kontaktnej osoby*:
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className={"form-control"}
              value={name}
              onChange={nameChangeHandler}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label
            htmlFor="staticEmail"
            className={
              "col-sm-2 col-form-label" + (errors?.phone ? " text-danger " : "")
            }
          >
            Телефон / Telefón*:
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className={"form-control"}
              value={phone}
              onChange={phoneChangeHandler}
            />
          </div>
        </div>
        {type === 2 && (
          <div className="mb-3 row">
            <label
              htmlFor="staticEmail"
              className={
                "col-sm-2 col-form-label" + (errors?.car ? " text-danger " : "")
              }
            >
              Машина / Auto:
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                value={car}
                onChange={carChangeHandler}
              />
            </div>
          </div>
        )}
        {type === 2 && (
          <div className="mb-3 row">
            <label
              htmlFor="staticEmail"
              className={
                "col-sm-2 col-form-label" +
                (errors?.count ? " text-danger " : "")
              }
            >
              Кількість місць / Počet sedadiel*:
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className={"form-control"}
                value={count}
                onChange={countChangeHandler}
              />
            </div>
          </div>
        )}

        <div className="mb-3 row">
          <label
            htmlFor="staticEmail"
            className={
              "col-sm-2 col-form-label" + (errors?.info ? " text-danger " : "")
            }
          >
            Додаткова інформація / Dodatočné informácie:
          </label>
          <div className="col-sm-10">
            <textarea
              type="text"
              className="form-control"
              value={info}
              onChange={infoChangeHandler}
            />
          </div>
        </div>
        {type === 2 && (
          <div>
            <div className="mb-3  row">
              <div className="form-check">
                <label className="form-check-label" htmlFor="flexCheckDisabled">
                  Можу забрати з любого приграничного КПП / Môžem vyzdvihnúť z
                  akéhokoľvek hraničného priechodu
                </label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={takeFromBorder}
                  id="flexCheckDisabled"
                  onChange={takeFromBorderChangeHandler}
                />
              </div>
            </div>
            <div className="mb-3  row">
              <div className="form-check">
                <label
                  className="form-check-label "
                  htmlFor="flexCheckDisabled"
                >
                  Можливість перевезення тварин / Možnosť prepravy zvierat
                </label>
                <input
                  className="form-check-input "
                  type="checkbox"
                  value={withAnimals}
                  id="flexCheckDisabled"
                  onChange={animalsChangeHandler}
                />
              </div>
            </div>
            <div className="mb-3  row">
              <div className="form-check">
                <label className="form-check-label" htmlFor="flexCheckDisabled">
                  Можливість перевезення гуманітарної допомоги / Možnosť
                  transportu humanitárnej pomoci
                </label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={withStuff}
                  id="flexCheckDisabled"
                  onChange={stuffChangeHandler}
                />
              </div>
            </div>
            <div className="mb-3  row">
              <div className="form-check">
                <label className="form-check-label" htmlFor="flexCheckDisabled">
                  Можливість перевезення людей / Možnosť prepravy osôb
                </label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={withPeople}
                  id="flexCheckDisabled"
                  onChange={peopleChangeHandler}
                />
              </div>
            </div>
          </div>
        )}

        <button type="submit" className="btn btn-primary ">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddCarPage;
