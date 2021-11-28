import { gql } from '@apollo/client';

// -------------------
// Ingreso de notificacion por ClientId
// 28 de Noviembre 2021
// --------------------
export const UPDATE_CATEGORY = gql`
  
    mutation update_categorias($id: Int!,$name: String!, $value: String!, 
    $imageURL: String!,$clientid: String!) {
      update_categorias(where: {id: {_eq: $id}, clientid:{_eq: $clientid}  }
              _set: {
                      value: $value,
                      name: $name,
                      imageURL: $imageURL 
                    },
            ){
              affected_rows
            }
      }
`;

export const DELETE_CATEGORY = gql`
  
  mutation delete_categorias($id: Int!, $clientid: String!) {
  delete_categorias(
      where: {id: {_eq:$id}, clientid:{_eq: $clientid} } 
  ){
      affected_rows
  }
  }

`;