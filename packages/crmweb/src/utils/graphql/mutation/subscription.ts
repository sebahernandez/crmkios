import { gql } from '@apollo/client';

// Necesarios para la subscripcion
export const CREATE_SUBSCRIPCION = gql`
    mutation insert_suscripciones(
      $nombre: String!, 
      $clave: String!,
      $usuario: String!,
      $descripcion: String!,
      $direccion_tienda: String!,
      $negocio_web: String!,
      $rubro_negocio: String!,
      $estado: String!,
      $clientid: String! ){
        insert_suscripciones (
            objects: [
                {
                  nombre: $nombre,
                  clave: $clave,
                  usuario: $usuario,
                  descripcion: $descripcion,
                  direccion_tienda: $direccion_tienda,
                  negocio_web: $negocio_web,
                  rubro_negocio: $rubro_negocio,
                  estado: $estado,
                  clientid: $clientid                               
                }
              ]
          )
    {
      affected_rows
    }
  }
`;

// Para actualizar datos importantes de 
// los suscriptores, como url shop, autorizaciones
// y muchas cosas mas..
export const UPDATE_SUBSCRIPTION = gql`
mutation update_suscripciones($clientid: String!,$nombre: String!, $authorized: Boolean!, $url: String!, $status: String!, $status_offline: String! 
  $shop_image_logo:String!, $shop_image_body:String!,$facebook: String!, $instagram: String!, $titulo: String!,$descripcion: String!, $tags: String!,$canonical: String!,$telefono: String!, $correo: String!) {
  update_suscripciones(where: {clientid: {_eq: $clientid}}, _set: { telefono: $telefono, correo: $correo, facebook: $facebook, instagram: $instagram, 
    titulo: $titulo,descripcion: $descripcion, tags: $tags,canonical: $canonical,nombre: $nombre, shop_image_logo: $shop_image_logo, shop_image_body: $shop_image_body,is_negocio_web: $authorized, negocio_web: $url, estado: $status, status_shop: $status_offline}) {
    affected_rows
  }
}
`;

// para suscriptores inactivos por mucho tiempo 
export const DELETE_SUBSCRIPTION = gql`
  mutation delete_suscripciones($clientid: String!) {
    delete_suscripciones(where: {clientid: {_eq: $clientid}, is_negocio_web: {_eq: false}, estado: {_neq: "Activa"}}) {
    affected_rows
  }
}
`;