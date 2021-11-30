
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


export const GET_PRODUCTS_X_CATEGORIA = gql`
subscription s1($clientid: String!, $idcategoria: Int!) {
  producto(where: {clientid: {_eq: $clientid}, _and: {categorias: {id: {_eq: $idcategoria}}}}) {
    id
    clientid
    nombre
    descripcion
    sku
    precio
    cantidad
    unidad 
    gallery
    categoria
    categorias {
      id
      name
      value
    }
    descuento
    precio_venta
    fecha_creacion
  }
}
`;