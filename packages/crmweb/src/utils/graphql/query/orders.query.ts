
import { gql } from '@apollo/client';


export const GET_ORDERS = gql`
  query getOrders($clientid: String!,$searchText: String!) {
    pedido (where: {clientid: {_eq: $clientid}, delivery_address: {_like: $searchText}}, order_by: {creation_date: desc}) {
      id
      cliente
      creation_date
      delivery_address
      total
      metodo_pago
      contacto
      estado
      status
      order
    }
  }
`;
