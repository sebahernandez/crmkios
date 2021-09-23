import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form'; 
import { useMutation, gql, useQuery } from '@apollo/client';
import { Scrollbars } from 'react-custom-scrollbars';
import { useDrawerDispatch } from 'context/DrawerContext';
import Button, { KIND } from 'components/Button/Button';
import DrawerBox from 'components/DrawerBox/DrawerBox';
import { Grid, Row, Col } from 'components/FlexBox/FlexBox';
import Uploader from 'components/Uploader/Uploader';
import Input from 'components/Input/Input'; 
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
 
let options = [];

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

 
const CREATE_PRODUCT = gql`
  
  mutation insert_producto($nombre: String!, $descripcion: String!,$sku: String!,
    $unidad: Int!, $precio: Int!, $precio_venta: Int!, $descuento: Int!,
  $categoria: Int!, $cantidad: Int!, $clientid: String!, $gallery: String! ) {
    insert_producto(
            objects: [
                {
                  nombre: $nombre,
                  descripcion: $descripcion,
                  sku: $sku,
                  unidad: $unidad,
                  precio: $precio
                  precio_venta: $precio_venta
                  descuento: $descuento
                  categoria: $categoria
                  cantidad: $cantidad 
                  clientid: $clientid
                  gallery: $gallery
                }
              ]
          ){
            affected_rows
          }
    }
`;
type Props = any;

const AddProduct: React.FC<Props> = (props) => {
  const dispatch = useDrawerDispatch();
  const closeDrawer = useCallback(() => dispatch({ type: 'CLOSE_DRAWER' }), [
    dispatch,
  ]);
  const { register, handleSubmit } = useForm();
  const [tag, setTag] = useState([]);
  const [gallery, setGallery] = useState([])
  const [clientid] = useState(sessionStorage.getItem('clientid')); 
  const [categoria, setCategoria] = useState(null);  
  const [isLoading, setIsLoading] = useState(false);  
  
  
  React.useEffect(() => {
    register({ name: 'clientid' });
    register({ name: 'categorias' });    
  }, [register]);

  const [insert_producto, {error}] = useMutation(CREATE_PRODUCT );
 
  let LoadCategory = ( param ) => {
 
    const { loading, error, data } =  useQuery(GET_CATEGORIAS, {
      variables: {clientid: param},
    });
 
    if (loading) return null;
    if (error) return `Error! ${error}`;
  
    return data
    
  }
  options = LoadCategory(clientid)
 

 

  const handleMultiChange = ({ value }) => {
    if(value && value.length > 0)
    {
      setCategoria(value[0].id);
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
 
  const onSubmit = (e) => {
 
    const newProduct = {
      nombre: e.nombre,
      categoria: Number(categoria),
      descripcion: e.descripcion,
      sku: e.sku,
      unidad: 1,
      cantidad: Number(e.cantidad),
      precio: Number(e.precio),
      precio_venta: Number(e.precio_venta),
      descuento: Number(e.descuento),
      clientid: sessionStorage.getItem('clientid'),
      gallery: gallery.toString()
    };    
    console.log(newProduct, 'Ingresando Producto Nuevo');
    insert_producto({
      variables: {nombre: newProduct.nombre, 
                  unidad: newProduct.unidad,
                  precio: newProduct.precio,
                  descripcion: newProduct.descripcion,
                  sku: newProduct.sku,
                  precio_venta: newProduct.precio_venta,
                  cantidad: newProduct.cantidad,
                  descuento: newProduct.descuento,
                  categoria: newProduct.categoria,
                  clientid: newProduct.clientid,
                  gallery: newProduct.gallery

                }
    });
    closeDrawer();
  };

  return (
    <>
      <DrawerTitleWrapper>
        <DrawerTitle>Agregar Producto</DrawerTitle>
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
           <DrawerBox
                overrides={{
                  Block: {
                    style: {
                      width: '100%',
                      height: 'auto',
                      padding: '30px',
                      borderRadius: '3px',
                      backgroundColor: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                  },
                }}
              > 
               <Uploader  onChange={onFileChange} />
             
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
                  <FormLabel>Client ID</FormLabel>
                  <Input type="text" disabled  inputRef={register} name="clientid" value={clientid}/>
                </FormFields>
                <FormFields>
                  <FormLabel>Nombre</FormLabel>
                  <Input
                    inputRef={register}
                    name="nombre"
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Descripción</FormLabel>
                  <Input
                    inputRef={register}
                    name="descripcion"
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>SKU</FormLabel>
                  <Input type="text"
                  inputRef={register} 
                  name="sku" />
                </FormFields>

                <FormFields>
                  <FormLabel>Precio Referencia</FormLabel>
                  <Input
                    type="text"
                    inputRef={register({ required: true })}
                    name="precio"
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Precio Venta</FormLabel>
                  <Input  type="number"
                  inputRef={register} 
                  name="precio_venta" />
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
                  <Input
                    type="number"
                    inputRef={register({ required: true })}
                    name="cantidad"
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Categorías</FormLabel>
                  <Select
                    options={options}
                    labelKey="name"
                    valueKey="value"
                    placeholder="Seleccione"
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

export default AddProduct;