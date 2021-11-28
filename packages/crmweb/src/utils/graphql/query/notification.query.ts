import { gql } from '@apollo/client';

// ----------------------
// Obtiene todas las notificaciones
// 1 de Noviembre 2021
// ----------------------
export const GET_ALL_NOTIFY = gql`
    subscription todasNotificaciones ($is_root: Boolean!) {
      notifications(where: {is_root: {_eq: $is_root}}) {
        id
        title
        time
        clientid
        fecha
        suscriptor
        cliente
        is_root
      }
    }
  `;


// ----------------------
// Obtiene todas las notificaciones x clientid
// 1 de Noviembre 2021
// ----------------------
export const GET_ALL_NOTIFY_CLIENTID = gql`
    subscription todasNotificacionesxClientid( $clientid: String!)  {
      notifications(order_by: {fecha: desc}, where: {clientid: {_eq: $clientid}}) {
        id
        title
        time
        message
        clientid
        fecha
      }
    }
  `;



// ----------------------
// Obtiene todas las notificaciones x id
// 1 de Noviembre 2021
// ----------------------
export const GET_ALL_NOTIFY_ID = gql`
subscription todasNotificacionesxClientid( $id: String!)  {
  notifications(order_by: {fecha: desc}, where: {id: {_eq: $id}}) {
    id
    title
    time
    message
    clientid
    fecha
  }
}
`;


 