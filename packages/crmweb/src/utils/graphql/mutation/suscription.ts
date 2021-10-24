import { gql } from '@apollo/client';

export const CREATE_SUSCRIPCION = gql`
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
