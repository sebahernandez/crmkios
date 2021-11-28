
import { gql } from '@apollo/client';


export const GET_CATEGORIAS_SEARCH = gql`
   subscription  ($clientid: String!,$searchText: String!) {
    categorias (where: {clientid: {_eq: $clientid},name: {_like: $searchText}}) {
      id
      imageURL
      clientid
      name 
      value
    }
  }  
`;


export const GET_CATEGORIAS = gql`
   subscription  ($clientid: String!) {
    categorias (where: {clientid: {_eq: $clientid}}) {
      id
      imageURL
      clientid
      name 
      value
    }
  }  
`;