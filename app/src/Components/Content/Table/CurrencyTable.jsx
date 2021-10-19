import React from "react";
import Table from "react-bootstrap/Table";

const CurrencyTable = (props) => {
  return (
    <div>
      <Table
        bordered
        hover
        responsive
      >
        <thead>
          <tr>
            <th>
              Currency/Current <br /> Date
            </th>
            <th>Buy</th>
            <th>Sell</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((i) => {
            return (
              <tr key={props.data.indexOf(i)}>
                <td>
                  {i.ccy}/{i.base_ccy}
                </td>
                <td>{Number(i.buy).toFixed(2)}</td>
                <td>{Number(i.sale).toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default CurrencyTable;
