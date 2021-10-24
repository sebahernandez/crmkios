import React from "react";
import { CardInitial, Subtitle } from "./styled"; 
import Cookies  from 'universal-cookie';
const nodemailer = require("nodemailer");

const ConfirmationPage = () => {

  const cookie = new Cookies() 
 

  React.useEffect(() => {
    
        main()
  }, []);


 // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    //let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "mail.tu-ecommerce.cl",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "no-reply@tu-ecommerce.cl", // generated ethereal user
        pass: "^j};X3%#5%ZE", // generated ethereal password
      },
    });

    // verify connection configuration
    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log("Server is ready to take our messages");
      }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: "no-reply@tu-ecommerce.cl", 
      to: "asandovalster@gmail.com",  
      subject: "Hello ✔",  
      text: "Hello world?",  
      html: "<b>Hello world?</b>",  
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
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
