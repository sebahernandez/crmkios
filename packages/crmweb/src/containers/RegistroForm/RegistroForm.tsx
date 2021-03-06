import React, { useState } from 'react';
import { styled, withStyle } from 'baseui';
import { useForm } from 'react-hook-form'; 
import { Row as Rows, Col as Column } from 'components/FlexBox/FlexBox';
import { useMutation, gql } from '@apollo/client';
import Header from "./Header";
import Footer from "./Footer"; 
import { FormFields, FormLabel } from 'components/FormFields/FormFields'; 
import "./Registro.css";
import {  FormWrapper } from './Registro.style';  
import '../../settings/constants'; 
import { Modal } from 'react-bootstrap';
import {
  Form
} from '../DrawerItems/DrawerItems.style';
import Input from 'components/Input/Input';
import Button from 'components/Button/Button';

export const ProductsRow = styled('div', ({ $theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  marginTop: '25px',
  backgroundColor: $theme.colors.backgroundF7,
  position: 'relative',
  zIndex: '1',

  '@media only screen and (max-width: 767px)': {
    marginLeft: '-7.5px',
    marginRight: '-7.5px',
    marginTop: '15px',
  },
}));

export const Col = withStyle(Column, () => ({
  '@media only screen and (max-width: 767px)': {
    marginBottom: '20px',

    ':last-child': {
      marginBottom: 0,
    },
  },
}));

 

export const ProductCardWrapper = styled('div', () => ({
  height: '100%',
}));

export const LoaderWrapper = styled('div', () => ({
  width: '100%',
  height: '100vh',
  display: 'flex',
  flexWrap: 'wrap',
}));

export const LoaderItem = styled('div', () => ({
  width: '25%',
  padding: '0 15px',
  marginBottom: '30px',
}));

 
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
                  correo: $usuario,
                  clientid: $clientid,                  
                  clave: $clave               
                }
              ]
          )
    {
      affected_rows
    }
  }
`;


export default function RegistroForm() {
  
   
  const [insert_suscripciones ] = useMutation(CREATE_REGISTRO ); 
	const [usuario, SetUsuario] = useState('');
	const [clave] = useState('1234');
  const [estado] = useState('registro');
  const [nombre, SetNombre] = useState('');
  const [apellido, SetApellido] = useState('');
  const [telefono, SetTelefono] = useState('');
  const { register, handleSubmit  } = useForm();

  const [show, setShow] = useState(false);
  const handleClose = () =>{ 
    setShow(false); 
     window.location.href = '/login';
  } 

  const setup = {
    service_id: 'service_ruymjpw',
    template_id: 'template_92r9a8l',
    user_id: 'user_HPuNwFjInjszGeOKrVj3w'
} 

  React.useEffect(() => {
    register({ name: 'clave' });
    register({ name: 'npmbre' });
    register({ name: 'apellido' });
    register({ name: 'usuario' });
  }, [register]);


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
 
  const onSubmit = (e) => {
    if( usuario !== '' && usuario !== undefined)
    {
    const newRegistro = {
      clave: clave,
      nombre: nombre + ' ' + apellido,
      telefono: telefono,
      usuario: usuario,
      estado: estado,
      clientid:  makeid()
    };    
    console.log(newRegistro, 'Ingresanda Suscripcion Nueva');
    
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

    setShow(true); 
  }
  };


  return (
    <div className="formulario">
    <Header />

    <Form onSubmit={handleSubmit(onSubmit)} style={{ height: '100%' }}>
        <input type="hidden" name="contact_number" />
				<FormWrapper className="form">
		
	 				 	 
						  <FormFields>
              <FormLabel>Nombre</FormLabel>
              <Input   onChange={event => SetNombre(event.target.value)}
                    inputRef={register({ required: true, maxLength: 50 })}
                    name="user_name"
                  />
               </FormFields>	 
              <FormFields>
              <FormLabel>Apellido</FormLabel>
              <Input   onChange={event => SetApellido(event.target.value)} 
                    inputRef={register({ required: true, maxLength: 50 })}
                    name="apellido"
                  />
               </FormFields>					 
            <FormFields>
              <FormLabel>Telefono</FormLabel>
              <Input   onChange={event => SetTelefono(event.target.value)} 
                    inputRef={register({ required: true, maxLength: 50 })}
                    name="telefono"
                  />
               </FormFields>
          				 
            <FormFields>
              <FormLabel>Correo</FormLabel>
              <Input  onChange={event => SetUsuario(event.target.value)} 
                    inputRef={register({ required: true, maxLength: 50 })}
                    name="user_email"
                  />
               </FormFields>

          <Button
          className="button"
            type="submit"
            overrides={{
              BaseButton: {
                style: ({ $theme }) => ({
                  width: '50%',
                  borderTopLeftRadius: '3px',
                  borderTopRightRadius: '3px',
                  borderBottomRightRadius: '3px',
                  borderBottomLeftRadius: '3px',
                }),
              },
            }}
          >
           Guardar
          </Button>
					 
					</FormWrapper>
			 </Form>

       <Modal className="my-modal"  show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Felicidades!!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Su cuenta ya ha sido gestionada, revise su casilla de correo <strong>{usuario}</strong> donde le enviamos informaci??n para ingresar a su Sistema CRM !
        <hr/>Procure leer cuidadosamente el correo, dado que le otorgamos una contrase??a provisoria, la cual tendr?? que activar</Modal.Body>
        <Modal.Footer>
          <Button className="button"  variant="secondary" onClick={handleClose}>
            Cerrar
          </Button> 
        </Modal.Footer>
      </Modal>

    <Footer />
  </div>
  );
}
