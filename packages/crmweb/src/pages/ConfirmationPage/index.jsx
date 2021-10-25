import React from "react";
import axios from "axios";
import { CardInitial, Subtitle } from "./styled";
import Cookies from 'universal-cookie';

const ConfirmationPage = () => {

  const cookie = new Cookies()

  const mail = cookie.get('pagina0').email;
  const name = cookie.get('pagina0').name;


  React.useEffect(() => {

    const peticion = {
      userTo: cookie.get('pagina0').email,
      subject: "Felicidades estás a un paso de activar tu cuenta",
      bodyText: "Sorprendete texto3",
      bodyHtml: "Felicidades " + name + ", <br><p>Estás a un paso de activar tu cuenta ingresando al siguiente enlace <p>https://crm.tu-ecommerce.cl</p> ingresando su usuario y contraseña."
    };

    console.log('peticion:', peticion)

    const config = {
      url: 'https://mailer-gamma.vercel.app/sendmail',
      //url: 'http://localhost:4000/sendmail',
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'origin': 'x-requested-with',
        'Access-Control-Allow-Headers': 'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(peticion),
    };
    axios(config).then(response => {
        console.log(response)
    }).catch((err) => {
      console.log(err)}); 
  }, []);


  return (
    <CardInitial>
      <img src="icons/congratulations.svg" alt="congratulation" />
      <Subtitle>
        <p>

          Hemos enviado a su correo <strong> {mail} </strong> un acceso
          para activar su cuenta.
        </p>
      </Subtitle>
    </CardInitial>
  );
};

export default ConfirmationPage;
