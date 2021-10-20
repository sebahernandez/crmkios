import React from "react";
import { CardInitial, Subtitle } from "./styled";
import  emailjs from 'emailjs-com';  

const ConfirmationPage = ({info}) => {


  const setup = {
    service_id: 'service_ruymjpw',
    template_id: 'template_92r9a8l',
    user_id: 'user_HPuNwFjInjszGeOKrVj3w'
  } 

  React.useEffect(() => {
    
    if(info){
      sendEmail()
    }

  }, []);


  function sendEmail() {
 
    alert('!!!! sendMail')
    /* let toSend = {
      from_name: '',
      to_name: nombre,
      message: 'Su clave de acceso es provisoria y su usuario es su correo, contraseña 1234. Puede acceder al siguiente enlace http://crm.tu-ecommerce.cl',
      reply_to: usuario,
    };

    
    emailjs.send(setup.service_id, setup.template_id,  toSend, setup.user_id  )
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      }); */
  }

  
  return (
    <CardInitial>
      <img src="icons/congratulations.svg" alt="congratulation" />
      <Subtitle>
        <p>
          {{info}}
          Hemos en enviado a su <strong> correo electrónico </strong> un acceso
          para activar su cuenta.
        </p>
      </Subtitle>
    </CardInitial>
  );
};

export default ConfirmationPage;
