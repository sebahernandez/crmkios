import { gql } from '@apollo/client';

export const GET_SUBSCRIPCION = gql`
query suscripciones ($email: String!) {
    suscripciones(where: {usuario: {_eq: $email}}) {
      clientid
      descripcion
      fecha_suscripcion
      usuario
      nombre
    }
  }
  `;
 
  // ----------------------
 //  1 de Noviembre 2021, Actualizado
 // ----------------------
 
  
  export const GET_SUBSCRIPTIONS = gql`
  subscription GETSUSCRIPTOR {
    suscripciones(where: {is_root: {_eq: false}}, order_by: {fecha_suscripcion: desc}) {
      clientid
      usuario
      clave
      telefono
      is_negocio_web
      shop_image_body
      shop_image_logo 
      rubro_negocio
      descripcion
      fecha_suscripcion
      fecha_vencimiento
      negocio_web
      nombre
      estado
      is_root
      contactos {
        celular
        correo
      }
      direccion_tienda
      id
    }
  }  
  `;

