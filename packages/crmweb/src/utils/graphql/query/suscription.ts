import { gql } from '@apollo/client';

export const GET_SUSCRIPCION = gql`
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
  