import React, { useState, useCallback } from 'react';
import { useMutation, gql,useQuery } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { Scrollbars } from 'react-custom-scrollbars';
import { useDrawerDispatch, useDrawerState } from 'context/DrawerContext'; 
import Button, { KIND } from 'components/Button/Button';
import DrawerBox from 'components/DrawerBox/DrawerBox';
import { Row, Col } from 'components/FlexBox/FlexBox';
import Input from 'components/Input/Input'; 
import Uploader from 'components/Uploader/Uploader';
import Select from 'components/Select/Select';
import { FormFields, FormLabel } from 'components/FormFields/FormFields';
import { app } from '../../../src/base';

import {
  Form,
  DrawerTitleWrapper,
  DrawerTitle,
  FieldDetails,
  ButtonGroup,
} from '../DrawerItems/DrawerItems.style';




const GET_CATEGORIAS = gql`
   query  ($clientid: String!) {
    categorias (where: {clientid: {_eq: $clientid}}) {
      id
      clientid
      name 
      value
    }
  }  
`;


const UPDATE_PRODUCT = gql`
  
  mutation update_producto($id: Int!,$nombre: String!,$descripcion: String!, $sku: String!,$unidad: Int!, $precio: Int!, $precio_venta: Int!, $descuento: Int!,
  $categoria: Int!, $cantidad: Int!, $imageURL: String!, $gallery: String!, $clientid: String! ) {
    update_producto(where: {id: {_eq: $id}, clientid:{_eq: $clientid}  }
            _set: {
                    nombre: $nombre,
                    descripcion: $descripcion,
                    sku: $sku,
                    unidad: $unidad,
                    precio: $precio
                    precio_venta: $precio_venta,
                    descuento: $descuento,
                    categoria: $categoria,
                    cantidad: $cantidad,
                    imageURL: $imageURL,
                    gallery: $gallery
                  },
          ){
            affected_rows
          }
    }
`;

const DELETE_PRODUCT = gql`
  
  mutation delete_producto($id: Int!, $clientid: String!) {
  delete_producto(
      where: {id: {_eq:$id}, clientid:{_eq: $clientid} } 
  ){
      affected_rows
  }
  }

`;


type Props = any;



const ModifyProduct: React.FC<Props> = () => {

  let options = [];

  const dispatch = useDrawerDispatch();
  const data1 = useDrawerState('data');
  
  const closeDrawer = useCallback(() => dispatch({ type: 'CLOSE_DRAWER' }), [
    dispatch,
  ]);

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: data1,
  });
  const [orderId] = useState([{ value: data1.id }]);
  const [clientid] = useState([{ value: data1.clientid }]); 
  const [tag, setTag] = useState([{ value: data1.categorias[0].value }]);
  const [imageURL, setImageURL] = useState(data1.imageURL);  
  const [gallery, setGallery] = useState(data1.gallery.split(","));  
  const [isLoading, setIsLoading] = useState(false);  

  React.useEffect(() => {
    register({ name: 'orderId' });
    register({ name: 'clientid' });
    register({ name: 'categorias' });
    register({ name: 'categoria' });
    register({ name: 'imageURL', required: true }); 
  }, [register]);

  const [update_producto, {error}] = useMutation(UPDATE_PRODUCT );
  const [delete_producto] = useMutation(DELETE_PRODUCT );



  let LoadCategory = ( param ) => {
 
    const { loading, error, data } =  useQuery(GET_CATEGORIAS, {
      variables: {clientid: param},
    });
 
    if (loading) return null;
    if (error) return `Error! ${error}`;
  
    return data
    
  }
  options = LoadCategory(data1.clientid)
 
 
  const handleMultiChange = ({ value }) => {
    if(value && value.length > 0)
    {
      setValue('categoria', value[0].id);
    }  
    setTag(value);
  };
  

  const onFileChange = async (files) => {
    setIsLoading(true)
    let arg = [] 
    let file = files[0];  // solo una imagen
    const storageRef = app.storage().ref();
        try { 
          for (let i = 0; i < files.length; i++) {
            
            file = files[i] 
            
            const fileRef = storageRef.child(file.name);
            
            await fileRef.put(file) 
            arg.push( await fileRef.getDownloadURL()  );   
          }
        } catch(error ){
          console.log(error)
        } 

    setGallery(arg)
    setIsLoading(false)

    console.log('gallery>' + gallery)
  };


  const onSubmit = (data) => {
     
    const product = {
      id: orderId,
      clientid: clientid,
      nombre: data.nombre,
      descripcion: data.descripcion,
      categoria: Number(data.categoria),
      sku: data.sku,
      cantidad: Number(data.cantidad),
      imageURL: imageURL && imageURL.length !== 0 ? imageURL : '',
      gallery: gallery.toString(),
      precio: Number(data.precio),
      precio_venta: Number(data.precio_venta),
      descuento: Number(data.descuento)     
    };    
    console.log(product, 'actualizando Producto');

    update_producto({
      variables: {id: orderId[0].value,
                  clientid: clientid[0].value,
                  nombre: product.nombre, 
                  descripcion: product.descripcion,
                  unidad: 1,
                  sku: product.sku,
                  precio: product.precio,
                  precio_venta: product.precio_venta,
                  cantidad: product.cantidad,
                  descuento: product.descuento,
                  categoria: product.categoria,
                  imageURL: product.imageURL ,
                  gallery: product.gallery
                }
    });
    closeDrawer(); 
  };

  const darBaja = () => {
   
     delete_producto({
       variables:{id: orderId[0].value,clientid: clientid[0].value}});
    closeDrawer(); 
  };



  return (
    <>
      <DrawerTitleWrapper>
        <DrawerTitle>Modificar Producto</DrawerTitle>
      </DrawerTitleWrapper>

      <Form onSubmit={handleSubmit(onSubmit)} style={{ height: '100%' }}>
        <Scrollbars
          autoHide
          renderView={(props) => (
            <div {...props} style={{ ...props.style, overflowX: 'hidden' }} />
          )}
          renderTrackHorizontal={(props) => (
            <div
              {...props}
              style={{ display: 'none' }}
              className="track-horizontal"
            />
          )}
        >
          <Row>
            <Col lg={4}>
              <FieldDetails>Sube la Imagen de tu producto aquí!</FieldDetails>
            </Col>
            <Col lg={8}>
              <DrawerBox>
              <Uploader  onChange={onFileChange} /> 
             
                {gallery.map((url, i) => (
                  <div key={i}>
                      <img id={'name'+i} width="100" height="100" src={url}/> 
                  </div>
                ))} 
                  { isLoading && <div className="lds-dual-ring"></div> } 
              </DrawerBox>
            </Col>
          </Row>

          <Row>
            <Col lg={4}>
              <FieldDetails>
                Agregue la descripción de su producto y la información necesaria desde aquí
              </FieldDetails>
            </Col>

            <Col lg={8}>
              <DrawerBox>

                <FormFields>
                  <FormLabel>Código</FormLabel>
                  <Input type="text" disabled  inputRef={register} name="id" />
                </FormFields>
                <FormFields>
                  <FormLabel>Client ID</FormLabel>
                  <Input type="text" disabled  inputRef={register} name="clientid" />
                </FormFields>


                <FormFields>
                  <FormLabel>Nombre</FormLabel>
                  <Input type="text"
                    inputRef={register} /* ({ required: true, maxLength: 20 })} */
                    name="nombre"
                  />
                </FormFields>
                <FormFields>
                  <FormLabel>Descripción</FormLabel>
                  <Input type="text"
                    inputRef={register} /* ({ required: true, maxLength: 20 })} */
                    name="descripcion"
                  />
                </FormFields>
                <FormFields>
                  <FormLabel>SKU</FormLabel>
                  <Input type="text" inputRef={register} name="sku" />
                </FormFields>

                <FormFields>
                  <FormLabel>Precio Referencia</FormLabel>
                  <Input
                    type="number"
                    inputRef={register} /*({ required: true })}*/
                    name="precio"
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Precio Venta</FormLabel>
                  <Input type="number" inputRef={register} name="precio_venta" />
                </FormFields>

                <FormFields>
                  <FormLabel>% Descuento</FormLabel>
                  <Input
                    type="number"
                    inputRef={register}
                    name="descuento"
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Cantidad</FormLabel>
                  <Input type="number" inputRef={register} name="cantidad" />
                </FormFields>

                <FormFields>
                  <FormLabel>Categorias</FormLabel>
                  <Select
                    options={options}
                    labelKey="name"
                    valueKey="value"
                    placeholder="seleccione"
                    value={tag}
                    onChange={handleMultiChange}
                    overrides={{
                      Placeholder: {
                        style: ({ $theme }) => {
                          return {
                            ...$theme.typography.fontBold14,
                            color: $theme.colors.textNormal,
                          };
                        },
                      },
                      DropdownListItem: {
                        style: ({ $theme }) => {
                          return {
                            ...$theme.typography.fontBold14,
                            color: $theme.colors.textNormal,
                          };
                        },
                      },
                      Popover: {
                        props: {
                          overrides: {
                            Body: {
                              style: { zIndex: 5 },
                            },
                          },
                        },
                      },
                    }}
                    // multi
                  />
                </FormFields>
              </DrawerBox>
            </Col>
          </Row>
          <Row>
            <Col lg={4}>
              <FieldDetails>Desea dar de Baja este Producto ?</FieldDetails>
            </Col>
            <Col lg={8}>
            <DrawerBox>
            <Button 
             kind={KIND.minimal}
             onClick={darBaja}
            overrides={{
              BaseButton: {
                style: ({ $theme }) => ({
                  width: '50%',
                  borderTopLeftRadius: '3px',
                  borderTopRightRadius: '3px',
                  borderBottomRightRadius: '3px',
                  borderBottomLeftRadius: '3px',
                  marginRight: '15px',
                  color: $theme.colors.red400,
                }),
              },
            }}
          >
            Dar de Baja
          </Button>
          </DrawerBox>
            </Col>
          </Row>
        </Scrollbars>

        <ButtonGroup>
          <Button
            kind={KIND.minimal}
            onClick={closeDrawer}
            overrides={{
              BaseButton: {
                style: ({ $theme }) => ({
                  width: '50%',
                  borderTopLeftRadius: '3px',
                  borderTopRightRadius: '3px',
                  borderBottomRightRadius: '3px',
                  borderBottomLeftRadius: '3px',
                  marginRight: '15px',
                  color: $theme.colors.red400,
                }),
              },
            }}
          >
            Cancelar
          </Button>

          <Button
            type="submit"
            overrides={{
              BaseButton: {
                style: ({ $theme }) => ({
                  width: '50%',
                  borderTopLeftRadius: '3px',
                  borderTopRightRadius: '3px',
                  borderBottomRightRadius: '3px',
                  borderBottomLeftRadius: '3px',
                }),
              },
            }}
          >
            Guardar
          </Button>
        </ButtonGroup>
      </Form>
    </>
  );
};

export default ModifyProduct;
