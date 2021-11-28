import { gql } from '@apollo/client';

// -------------------
// Ingreso de notificacion por ClientId
// 1 de Noviembre 2021
// --------------------
export const CREATE_NOTIFY = gql`
    mutation ingresarNotificacion ($title: String!,$time: String!,$message: String!, $clientid: String! ,$is_root: Boolean!) {
      insert_notifications(objects: {title: $title, time: $time, message: $message, clientid: $clientid, is_root: $is_root}) {
        affected_rows
      }
    }
`;


// -------------------
// Ingreso de notificacion Todos
// 1 de Noviembre 2021
// --------------------
export const DROP_NOTIFY_ALL = gql`
mutation EliminarTodo {
  delete_notifications(where: {id: {_gte: 0}}) {
    affected_rows
    returning {
      id
    }
  }
}
`;

// -------------------
// Ingreso de notificacion x ClientId
// 1 de Noviembre 2021
// --------------------
export const DROP_NOTIFY_CLIENTID = gql`
mutation EliminarTodoxclientid($clientid: String!) {
  delete_notifications(where: {id: {_gte: 0}, clientid: {_eq: $clientid}}) {
    affected_rows
    returning {
      id
    }
  }
}
`;


// -------------------
// Ingreso de notificacion x id
// 1 de Noviembre 2021
// --------------------
export const DROP_NOTIFY_ID = gql`
mutation EliminarUno($id: Int!) {
  delete_notifications(where: {id: {_eq: $id}}) {
    affected_rows
    returning {
      id
    }
  }
}
`;