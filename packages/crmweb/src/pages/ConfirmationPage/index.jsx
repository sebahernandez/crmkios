import React from "react";
import { CardInitial, Subtitle } from "./styled";
import  emailjs from 'emailjs-com';  
import Cookies  from 'universal-cookie';
 
const ConfirmationPage = () => {

  const cookie = new Cookies() 
  const setup = {
    service_id: 'service_ruymjpw',
    template_id: 'template_92r9a8l',
    user_id: 'user_HPuNwFjInjszGeOKrVj3w'
  } 

  React.useEffect(() => {
    
      sendEmail()
  }, []);


  function sendEmail() {
 
    console.log('!!!! pagina0', cookie.get('pagina0'))
    console.log('!!!! pagina1', cookie.get('pagina1'))
    console.log('!!!! pagina2', cookie.get('pagina2'))
    console.log('!!!! pagina3', cookie.get('pagina3'))
 
   let toSend = {
      from_name: 'marketing@eserp.cl',
      to_name: cookie.get('pagina0').name,
      message: 'Su clave de acceso es provisoria y su usuario es su correo, contraseña ' +  cookie.get('pagina0').password + '. Puede acceder al siguiente enlace http://crm.tu-ecommerce.cl',
      reply_to: cookie.get('pagina0').email,
    };

    
    emailjs.send(setup.service_id, setup.template_id,  toSend, setup.user_id  )
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });  
  }

  
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
