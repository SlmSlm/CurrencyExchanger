import React from "react";
// import { Col, Row } from "react-bootstrap";
// import Form from "react-bootstrap/Form";
// import swapCurrencyIcon from "../../../Images/swapCurrencyIcon.svg";
import CurrencyExchanger from "./CurrencyExchanger";

const Exchanger = (props) => {
  const inputEl = document.getElementById("changeInput");
  const resultEl = document.getElementById("getInput");
  const changeCur = document.getElementById("changeOption");
  const getCur = document.getElementById("getOption");

  const swapCurrency = (a, b) => {
    inputEl.value = resultEl.value;
    changeCur.value = b;
    getCur.value = a;
    calculate();
  };

  const getExchangeData = (data) => {
    const result = {};

    const addToResult = (key, value, invert = true) => {
      if (!result[key]) {
        result[key] = [];
      }

      if (!result[key].includes(value)) result[key].push(value);

      if (invert) {
        addToResult(value, key, false);
      }
    };

    data.forEach((value) => {
      addToResult(value.ccy, value.base_ccy);
    });

    return result;
  };

  const getDeals = (exchangeData, sellCurrency, buyCurrency, deals = []) => {
    const direct = exchangeData[sellCurrency].includes(buyCurrency);
    if (direct) {
      deals.push(sellCurrency, buyCurrency);
      return true;
    }

    if (sellCurrency === buyCurrency) return true;
    if (deals.includes(sellCurrency)) return false;

    deals.push(sellCurrency);
    for (let neighbor of exchangeData[sellCurrency]) {
      if (!deals.includes(neighbor)) {
        if (neighbor === buyCurrency) {
          deals.push(neighbor);
        }

        if (getDeals(exchangeData, neighbor, buyCurrency, deals)) {
          return true;
        }
      }
    }

    alert("exchange is impossible");
    return false; //exchange is impossible.
  };

  const calculate = () => {
    const exchangeData = getExchangeData(props.data);
    const deals = [];
    const dealIsValid = getDeals(
      exchangeData,
      changeCur.value,
      getCur.value,
      deals
    );

    let sum = inputEl.value || 0;

    if (dealIsValid) {
      for (let i = 0; i < deals.length - 1; i++) {
        const c1 = deals[i];
        const c2 = deals[i + 1];

        props.data.forEach((x) => {
          if (x.ccy === c1 && x.base_ccy === c2) {
            sum *= x.buy;
            return;
          }

          if (x.ccy === c2 && x.base_ccy === c1) {
            sum *= 1 / x.sale;
            return;
          }
        });
      }
    }

    resultEl.value = Number.parseFloat(sum).toFixed(2);
  };

  return (
    <CurrencyExchanger
      calculate={calculate}
      availableCurrency={props.availableCurrency}
      swapCurrency={swapCurrency}
      changeCur={changeCur}
      getCur={getCur}
    />
  );
};

export default Exchanger;
