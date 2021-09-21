import React, { useState } from "react";
import { Card, CardName } from "./styled";
import InitialPage from "../InitialPage";
import NameShop from "../NameShop";
import RelatedWeb from "../RelatedWeb";
import ShopLocation from "../ShopLocation";
import ConfirmationPage from "../ConfirmationPage";

export const BasicForm = () => {
  const [page, setPage] = useState(0);
  const [data, setData] = useState({
    name: "",
    password: "",
    nameshop: "",
    url: "",
    locationshop: "",
  });
  const [data2, setData2] = useState({
    name: "",
    password: "",
    nameshop: "",
    url: "",
    locationshop: "",
  });
  const printData = () => {
    console.log(data);
  };

  const saveData = (json) => {
    /* { ...obj, name: { first: 'blah', last: 'ha'} } */
    console.log({ ...data, ...json });
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  const pageBefore = () => {
    setPage(page - 1);
  };

  return (
    <div>
      {page === 0 && (
        <Card>
          <InitialPage
            saveData={saveData}
            nextPage={nextPage}
            printData={printData}
          ></InitialPage>
        </Card>
      )}

      {page === 1 && (
        <CardName>
          <NameShop
            saveData={saveData}
            printData={printData}
            nextPage={nextPage}
            pageBefore={pageBefore}
          ></NameShop>
        </CardName>
      )}
      {page === 2 && (
        <CardName>
          <ShopLocation
            saveData={saveData}
            nextPage={nextPage}
            printData={printData}
            pageBefore={pageBefore}
          ></ShopLocation>
        </CardName>
      )}
      {page === 3 && (
        <CardName>
          {" "}
          <RelatedWeb
            saveData={saveData}
            nextPage={nextPage}
            printData={printData}
            pageBefore={pageBefore}
          ></RelatedWeb>
        </CardName>
      )}

      {page === 4 && (
        <CardName>
          {" "}
          <ConfirmationPage></ConfirmationPage>
        </CardName>
      )}
    </div>
  );
};

export default BasicForm;
