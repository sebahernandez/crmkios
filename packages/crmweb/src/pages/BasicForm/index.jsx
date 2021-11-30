import React, { useState } from "react";
import { Card, CardName } from "./styled";
import InitialPage from "../InitialPage";
import NameShop from "../NameShop";
import RelatedWeb from "../RelatedWeb";
import ShopLocation from "../ShopLocation";
import SectorShop from "../SectorShop";
import ConfirmationPage from "../ConfirmationPage";
import ErrorPage from "../ErrorPage";
import Cookies  from 'universal-cookie';
import { useQuery } from '@apollo/client';
import { CREATE_SUBSCRIPCION } from 'utils/graphql/mutation/subscription';
import { CREATE_NOTIFY } from 'utils/graphql/mutation/notification';
import { GET_SUBSCRIPCION_MAIL } from 'utils/graphql/query/subscription.query';
import { useMutation } from '@apollo/client';

export const BasicForm = () => {
  const cookie = new Cookies()  
  const [errores, setErrores] = useState(false);
  const [page, setPage] = useState(0);
  const [data, setData] = useState({
    name: "",
    password: "",
    email: "",
    nameshop: "",
    locationshop: "",
    rubro_negocio: "",
    url: "",    
  });



  const { data:data1 } = useQuery(GET_SUBSCRIPCION_MAIL,{
    variables: { 
        email:  (cookie.get('pagina0') && cookie.get('pagina0').email)?cookie.get('pagina0').email:''
        }
  }); 
  

  const printData = () => {
    console.log('printData:', data);
   
  };

  const saveData = (json) => { 
    cookie.set('pagina'+page,json)   
    if(page === 4) {
          console.log('data1 0101 ', data1)
          
          if(data1 &&  data1.suscripciones.length === 0) {

          const newRegistro = {
            nombre: cookie.get('pagina0').name,
            clave: cookie.get('pagina0').password,
            usuario: cookie.get('pagina0').email,
            descripcion: cookie.get('pagina1').nameshop,
            direccion_tienda: cookie.get('pagina2').locationshop,
            negocio_web: cookie.get('pagina3').url,        
            rubro_negocio: cookie.get('pagina4').rubro_negocio,        
            clientid:  makeid()
          };    
          console.log(newRegistro, 'Registro');
    
          try {

              
                insert_suscripciones({
                  variables: {
                              nombre: newRegistro.nombre, 
                              clave: newRegistro.clave,
                              usuario: newRegistro.usuario, 
                              descripcion: newRegistro.descripcion,              
                              direccion_tienda: newRegistro.direccion_tienda,              
                              negocio_web: newRegistro.negocio_web,
                              estado: 'registro',
                              rubro_negocio: newRegistro.rubro_negocio,              
                              clientid: newRegistro.clientid               
                            }
                }); 
                // Ingresamos una Alerta Web Push
                insert_notificacion({
                  variables: {
                              title: "Nueva Suscripción - " + newRegistro.nombre, 
                              time: "Recien", 
                              message: newRegistro.descripcion + " - " + newRegistro.rubro_negocio,
                              clientid: newRegistro.clientid  ,
                              is_root: true            
                            }
                }); 

              } catch(error){
                console.log(error)
              }
                
        } else {
          setErrores(true)
        }
    }
    
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  const pageBefore = () => {
    setPage(page - 1);
  };
  const [insert_notificacion ] = useMutation(CREATE_NOTIFY); 

  const [insert_suscripciones ] = useMutation(CREATE_SUBSCRIPCION ); 


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
          <SectorShop
            saveData={saveData}
            nextPage={nextPage}
            printData={printData}
            pageBefore={pageBefore}
          ></SectorShop>
        </CardName>
      )} 

      {page === 5 && errores===false && (
        <CardName>
          {" "}
          <ConfirmationPage ></ConfirmationPage>
        </CardName>
      )}

      {page === 5 && errores===true && (
        <CardName>
          {" "}
          <ErrorPage></ErrorPage>
        </CardName>
      )}
    </div>
  );
};

export default BasicForm;
