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
    info_user_view(where: {is_root: {_eq: false}}, order_by: {fecha_suscripcion: desc}) {
      img_site_url
      clientid
      nombre
      fecha_suscripcion
      fecha_vencimiento
      estado
      negocio_web
      is_negocio_web
      is_root
    }
    }
  `;
  