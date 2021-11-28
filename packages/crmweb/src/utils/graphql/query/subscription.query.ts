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
      id
      clientid
      usuario
      clave
      telefono
      correo
      is_negocio_web
      shop_image_body
      shop_image_logo
      crm_image_user
      rubro_negocio
      titulo
      descripcion
      tags
      canonical
      fecha_suscripcion
      fecha_vencimiento
      negocio_web
      nombre
      estado
      facebook
      instagram
      is_root
      direccion_tienda
      categorias_aggregate {
        aggregate {
          count
        }
      }
      productos_aggregate {
        aggregate {
          count
        }
      }
      pedidos_aggregate {
        aggregate {
          count
          sum {
            total
          }
        }
      }
      clientes_aggregate {
        aggregate {
          count
        }
      }
    }
  }
  
  `;

