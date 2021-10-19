import React, { useState, useEffect } from "react";
import CurrencyTable from "./Table/CurrencyTable";
import Exchanger from "./CurrencyExchanger/CurrencyExchangerContainer";
import * as axios from "axios";
import ErrorDisplay from "./ErrorDisplay";

const availableCurrency = ["UAH", "EUR", "USD", "BTC"];

const Content = () => {
  const [currencyData, setCurrencyData] = useState([]);
  let n = localStorage.getItem("loadCounter");

  if (n === null) n = 0;

  const updateCurrencyData = async () => {
    n++;
    localStorage.setItem("loadCounter", n);
    await axios
      .get(`https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5`)
      .then((resp) =>
        setCurrencyData(
          resp.data.filter((x) => availableCurrency.includes(x.ccy))
        )
      );
    return n;
  };

  useEffect(() => {
    updateCurrencyData();
  }, []);

  return (
    <div
      style={{
        width: "100%",
        padding: "50px",
        borderTop: "2px solid black",
        borderBottom: "2px solid black",
      }}
    >
      {n < 5 ? <CurrencyTable data={currencyData} /> : <ErrorDisplay />}
      <Exchanger data={currencyData} availableCurrency={availableCurrency} />
    </div>
  );
};

export default Content;
