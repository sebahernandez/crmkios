import React from "react";
import { CardInitial, Subtitle } from "./styled";

const ConfirmationPage = () => {
  return (
    <CardInitial>
      <img src="icons/congratulations.svg" alt="congratulation" />
      <Subtitle>
        <p>
          Hemos en enviado a su <strong> correo electrónico </strong> un acceso
          para activar su cuenta.
        </p>
      </Subtitle>
    </CardInitial>
  );
};

export default ConfirmationPage;
