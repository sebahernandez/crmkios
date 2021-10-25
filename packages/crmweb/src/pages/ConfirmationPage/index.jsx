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
      subject: "Asunto3",
      bodyText: "Sorprendete texto3",
      bodyHtml: name + "<br><p>Hemos enviado a su correo electrónico <strong> " + mail + " </strong> un acceso para activar su cuenta.</p > "
    };

    console.log('peticion:', peticion)

    const config = {
      url: 'https://mailer-gamma.vercel.app/sendmail',
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
 
    /*    axios.post('http://localhost:8081/sendmail', peticion)
         .then(response => {
           console.log(response)
         }); */

  }, []);


  return (
    <CardInitial>
      <img src="icons/congratulations.svg" alt="congratulation" />
      <Subtitle>
        <p>

          Hemos enviado a su <strong> correo electrónico </strong> un acceso
          para activar su cuenta.
        </p>
      </Subtitle>
    </CardInitial>
  );
};

export default ConfirmationPage;
