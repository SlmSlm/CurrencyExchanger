import React from "react";
import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import swapCurrencyIcon from "../../../Images/swapCurrencyIcon.svg";

const CurrencyExchanger = (props) => {
  return (
    <div>
      <Form>
        <Row>
          <Form.Group as={Col}>
            <Form.Label>Change</Form.Label> <br />
            <Row>
              <Col>
                <Form.Control
                  id="changeInput"
                  type="number"
                  onChange={props.calculate}
                  style={{ width: "140px" }}
                />
              </Col>
              <Col>
                <Form.Select
                  id="changeOption"
                  onChange={props.calculate}
                  defaultValue={"USD"}
                  style={{ width: "auto" }}
                >
                  {props.availableCurrency.map((i, index) => {
                    return (
                      <option value={i} key={index}>
                        {i}
                      </option>
                    );
                  })}
                </Form.Select>
              </Col>
            </Row>
          </Form.Group>
          <Col style={{ alignSelf: "center" }}>
            <img
              src={swapCurrencyIcon}
              alt="swap currency"
              style={{
                width: "50px",
                cursor: "pointer",
              }}
              onClick={() => props.swapCurrency(props.changeCur.value, props.getCur.value)}
            />
          </Col>
          <Form.Group as={Col}>
            <Form.Label>Get</Form.Label> <br />
            <Row>
              <Col>
                <Form.Control
                  id="getInput"
                  type="number"
                  readOnly
                  style={{ width: "140px" }}
                />
              </Col>
              <Col>
                <Form.Select
                  id="getOption"
                  onChange={props.calculate}
                  style={{ width: "auto", marginRight: 0 }}
                >
                  {props.availableCurrency.map((i, index) => {
                    return (
                      <option value={i} key={index}>
                        {i}
                      </option>
                    );
                  })}
                </Form.Select>
              </Col>
            </Row>
          </Form.Group>
        </Row>
      </Form>
    </div>
  );
};

export default CurrencyExchanger;
