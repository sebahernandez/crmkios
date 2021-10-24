import React from "react";
import { CardInitial, Subtitle } from "./styled"; 
import Cookies  from 'universal-cookie';
const nodemailer = require("nodemailer");

const ErrorPage = () => {

  const cookie = new Cookies() 
 

  React.useEffect(() => {
    
        main()
  }, []);


 // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    
     
  }

  
  return (
    <CardInitial>
      <img src="icons/error_ya_existe.svg" alt="Errorya existe ese Suscriptor" />
      <Subtitle>
        <p>
 
          Ups al parecer Hemos detectado que su <strong> correo electrónico: {cookie.get('pagina0') && cookie.get('pagina0').email}</strong> ya se encuentra registrado. Le recomendamos revisar su casilla para activar su cuenta.
        </p>
      </Subtitle>
    </CardInitial>
  );
};

export default ErrorPage;
