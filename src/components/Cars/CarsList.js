import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import CarsItem from "./CarsItem";
import AsyncSelect from "react-select";

const CarsList = (props) => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState(
    "http://127.0.0.1:8000/api/car?type=" +
      props.type +
      "&take_from_borders=" +
      props?.border
  );

  const fetchData = () => {
    fetch(nextPage, {
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
            let errorMessage = "Authentication failed!";
            // if (data && data.error && data.error.message) {
            //   errorMessage = data.error.message;
            // }

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        data.data.data.map((car) => setCars((state) => [...state, car]));
        if (data.data.next_page_url != null) {
          setLoading(true);

          setNextPage(
            data.data.next_page_url +
              "&type=" +
              props.type +
              (cityFrom && "&city_from_id=" + cityFrom) +
              "&take_from_borders=" +
              props?.border
          );
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        // alert(err.message);
      });
  };

  const [cityFromInput, setCityFromInput] = useState("");
  const [citiesFrom, setCitiesFrom] = useState([]);

  const [cityToInput, setCityToInput] = useState("");
  const [citiesTo, setCitiesTo] = useState([]);

  const [cityFrom, setCityFrom] = useState();
  const [cityTo, setCityTo] = useState();

  const changeInputSelectFrom = (value) => {
    setCityFromInput(value);
  };
  const changeSelectFrom = (value) => {
    setCityFrom(value?.value);
  };

  const changeInputSelectTo = (value) => {
    setCityToInput(value);
  };
  const changeSelectTo = (value) => {
    setCityTo(value?.value);
  };

  useEffect(() => {
    if (cityFrom || cityTo) {
      fetch(
        nextPage +
          "&city_from_id=" +
          (cityFrom ? cityFrom : "") +
          "&city_to_id=" +
          (cityTo ? cityTo : "") +
          "&take_from_borders=" +
          props?.border,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              let errorMessage = "Authentication failed!";
              // if (data && data.error && data.error.message) {
              //   errorMessage = data.error.message;
              // }

              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          setCars(data.data.data);
          if (data.data.next_page_url != null) {
            setLoading(true);

            setNextPage(
              data.data.next_page_url +
                "&type=" +
                props.type +
                (cityFrom && "&city_from_id=" + cityFrom)
            );
          } else {
            setLoading(false);
          }
        })
        .catch((err) => {
          // alert(err.message);
        });
    } else {
      if (nextPage != null) {
        fetch(
          "http://127.0.0.1:8000/api/car?type=" +
            props.type +
            "&take_from_borders=" +
            props?.border,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((res) => {
            if (res.ok) {
              return res.json();
            } else {
              return res.json().then((data) => {
                let errorMessage = "Authentication failed!";
                // if (data && data.error && data.error.message) {
                //   errorMessage = data.error.message;
                // }

                throw new Error(errorMessage);
              });
            }
          })
          .then((data) => {
            setCars(data.data.data);
            if (data.data.next_page_url != null) {
              setLoading(true);
              setNextPage(
                data.data.next_page_url +
                  "&type=" +
                  props.type +
                  (cityFrom && "&city_from_id=" + cityFrom)
              );
            } else {
              setLoading(false);
            }
          })
          .catch((err) => {
            // alert(err.message);
          });
      }
    }
  }, [cityFrom, cityTo]);

  useEffect(() => {
    fetch(
      "http://127.0.0.1:8000/api/cities?body=" +
        cityFromInput +
        "&take_from_borders=" +
        props?.border,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed!";
            // if (data && data.error && data.error.message) {
            //   errorMessage = data.error.message;
            // }

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        setCitiesFrom(data.data.data);
      })
      .catch((err) => {
      });
  }, [cityFromInput]);

  useEffect(() => {
    fetch(
      "http://127.0.0.1:8000/api/cities?body=" +
        cityToInput +
        "&take_from_borders=" +
        props?.border,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed!";
            // if (data && data.error && data.error.message) {
            //   errorMessage = data.error.message;
            // }

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        setCitiesTo(data.data.data);
      })
      .catch((err) => {
      });
  }, [cityToInput]);
  return (
    <div>
      <div className="mb-3 row justify-content-center">
        <div className="col-md-5 col-sm-5   mb-3">
          <AsyncSelect
            placeholder={"Виберіть місто відправлення / Vyberte mesto odchodu"}
            options={citiesFrom}
            inputValue={cityFromInput}
            onInputChange={changeInputSelectFrom}
            onChange={changeSelectFrom}
            isClearable={true}
          />
        </div>
        <div className="col-md-5 col-sm-5 ">
          <AsyncSelect
            placeholder={"Виберіть місто призначення / Vyberte cieľové mesto"}
            options={citiesTo}
            inputValue={cityToInput}
            onInputChange={changeInputSelectTo}
            onChange={changeSelectTo}
            isClearable={true}
          />
        </div>
      </div>
      <InfiniteScroll
        dataLength={cars.length}
        next={fetchData}
        hasMore={loading}
        loader={
          <p style={{ textAlign: "center" }}>
            <b>Завантаження... / Načítava sa...</b>
          </p>
        }
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Ви переглянули усі дописи. / Prezreli ste si všetky záznamy.</b>
          </p>
        }
      >
        {cars.length > 0 &&
          cars.map((car) => (
            <div key={car.id}>
              <CarsItem car={car} type={props.type} />
            </div>
          ))}
      </InfiniteScroll>
    </div>
  );
};

export default CarsList;
