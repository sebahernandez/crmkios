import React, { useState } from "react";
import { Card, CardName } from "./styled";
import InitialPage from "../InitialPage";
import NameShop from "../NameShop";
import RelatedWeb from "../RelatedWeb";
import ShopLocation from "../ShopLocation";
import ConfirmationPage from "../ConfirmationPage";
import Cookies  from 'universal-cookie';
import { useMutation, gql } from '@apollo/client';

const CREATE_REGISTRO = gql`
    mutation insert_suscripciones(
      $nombre: String!, 
      $clave: String!,
      $usuario: String!,
      $estado: String!,
      $telefono: String!,
      $clientid: String! ){
        insert_suscripciones (
            objects: [
                {
                  nombre: $nombre,
                  usuario: $usuario,
                  estado: $estado,
                  telefono: $telefono,
                  clientid: $clientid,
                  contactos: {
                    data: {
                          celular: $telefono, 
                          correo: $usuario, 
                          clientid: $clientid
                          }
                    }, 
                  clave: $clave               
                }
              ]
          )
    {
      affected_rows
    }
  }
`;


export const BasicForm = () => {
  const cookie = new Cookies() 
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
    console.log('printData:', data);
   
  };

  const saveData = (json) => {
    /* { ...obj, name: { first: 'blah', last: 'ha'} } */
    console.log(':::::',{ ...data, ...json });
    cookie.set('pagina'+page,json)  
    
    if(page === 3) {


      const newRegistro = {
        clave: cookie.get('pagina0').password,
        nombre: cookie.get('pagina0').name,
        telefono: cookie.get('pagina3').url,
        usuario: cookie.get('pagina1').nameshop,
        estado: cookie.get('pagina2').locationshop,
        clientid:  makeid()
      };    
      console.log(newRegistro, 'Ingresanda Suscripcion Nueva');

      /* INSERTAR SUSCRIPTOR */
      insert_suscripciones({
        variables: {
                    clave: newRegistro.clave,
                    nombre: newRegistro.nombre, 
                    usuario: newRegistro.usuario, 
                    estado: newRegistro.estado,              
                    telefono: newRegistro.telefono,
                    clientid: newRegistro.clientid               
                  }
      });  
    }
    
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  const pageBefore = () => {
    setPage(page - 1);
  };

  const [insert_suscripciones ] = useMutation(CREATE_REGISTRO ); 


  function makeid() {
    var text1 = "",text2 = "",text3 = "",text4 = "",text5 = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 5; i++)
      text1 += possible.charAt(Math.floor(Math.random() * possible.length));

    for ( i = 0; i < 5; i++)
      text2 += possible.charAt(Math.floor(Math.random() * possible.length));
      
    for ( i = 0; i < 5; i++)
      text3 += possible.charAt(Math.floor(Math.random() * possible.length));
 
    for ( i = 0; i < 5; i++)
      text4 += possible.charAt(Math.floor(Math.random() * possible.length));
 
    text5=text1+'-'+text2+'-'+text3+'-'+text4;

    return text5.toUpperCase();
  }
  

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
          <ConfirmationPage info={data}></ConfirmationPage>
        </CardName>
      )}
    </div>
  );
};

export default BasicForm;
