import React from "react";
import Moment from "react-moment";

const CarsItem = (props) => {
  return (
    <p className=" list-group-item list-group-item-action flex-column align-items-start">
      <p className=" mt-3 d-flex w-100 justify-content-between">
        <h4 className="mb-1">{props.car.title}</h4>
        <p>
          <Moment format="YYYY/MM/DD hh:mm:ss">{props.car.created_at}</Moment>
        </p>
      </p>
      <p className="mb-1 ">
        Від <small className="fw-bold fs-6"> {props.car?.city_from}</small>
        {props.car?.city_to && " В напрямку міста / V smere do mesta*: "}
        {props.car?.city_to && (
          <small className="fw-bold fs-6"> {props.car?.city_to}</small>
        )}
      </p>
      <p className="fw-bold">
        Телефон / Telefón*:
        <small className="fw-normal"> {props.car?.phone}</small>
      </p>
      <p className="fw-bold">
        Ім'я контактної людини / Meno kontaktnej osoby*:
        <small className="fw-normal"> {props.car?.name} </small>
      </p>
      {(props.type === 2 || props.type === 3) && (
        <p className="fw-bold">
          Машина / Auto: <small className="fw-normal">{props.car?.car}</small>
        </p>
      )}

      {(props.type === 2 || props.type === 3) && (
        <p className="fw-bold">
          Кількість місць / Počet sedadiel*:
          <small className="fw-normal"> {props.car?.count}</small>
        </p>
      )}
      {(props.type === 2 || props.type === 3) && (
        <p className="fw-bold">
          Можу забрати з любого приграничного КПП / Môžem vyzdvihnúť z
          akéhokoľvek hraničného priechodu:
          <small className="fw-normal">
            {props.car?.take_from_borders ? " Так / Ano." : " Ні / Nie."}
          </small>
        </p>
      )}

      {(props.type === 2 || props.type === 3) && (
        <p className="fw-bold">
          Можливість перевезення тварин / Možnosť prepravy zvierat:
          <small className="fw-normal">
            {props.car?.with_animals ? " Так / Ano." : " Ні / Nie."}
          </small>
        </p>
      )}

      {(props.type === 2 || props.type === 3) && (
        <p className="fw-bold">
          Можливість перевезення людей / Možnosť prepravy osôb:
          <small className="fw-normal">
            {props.car?.only_stuff ? " Так / Ano." : " Ні / Nie."}
          </small>
        </p>
      )}
      {(props.type === 2 || props.type === 3) && (
        <p className="fw-bold">
          Можливість перевезення гуманітарної допомоги / Možnosť transportu
          humanitárnej pomoci:
          <small className="fw-normal">
            {props.car?.with_people ? " Так / Ano." : " Ні / Nie."}
          </small>
        </p>
      )}

      <p className="fw-bold">
        Додаткова інформація:
        <small className="fw-normal"> {props.car?.info}</small>
      </p>
    </p>
  );
};

export default CarsItem;
