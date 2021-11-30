import React, { useState, useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { Scrollbars } from 'react-custom-scrollbars';
import { useDrawerDispatch, useDrawerState } from 'context/DrawerContext'; 
import Button, { KIND } from 'components/Button/Button';
import DrawerBox from 'components/DrawerBox/DrawerBox';
import { Row, Col } from 'components/FlexBox/FlexBox';
import Input from 'components/Input/Input'; 
import Select from 'components/Select/Select';
import { FormFields, FormLabel } from 'components/FormFields/FormFields';
import { UPDATE_SUBSCRIPTION, DELETE_SUBSCRIPTION } from 'utils/graphql/mutation/subscription';
import Uploader from 'components/Uploader/Uploader';
import { app } from '../../../src/base';
import Cookies  from 'universal-cookie';


import {
  Form,
  DrawerTitleWrapper,
  DrawerTitle,
  FieldDetails,
  ButtonGroup,
} from '../DrawerItems/DrawerItems.style';
import { Textarea } from 'components/Textarea/Textarea';

type Props = any;

const SiteSettingsForm: React.FC<Props> = () => {

  const cookie = new Cookies() 
  const options_offline = [
    { value: 'active', name: 'Activa' },
    { value: 'maintenance', name: 'En Mantención' },
    { value: 'turn-off', name: 'Caida' },
  ];
   

  let options = [
    {"name": "Activa","value": "Activa"},
    {"name": "Pausada","value": "Pausada"},
  ];

  let options2 = [
    {"name": "Con Acceso","value": true},
    {"name": "Sin Acceso","value": false},
  ];
  const dispatch = useDrawerDispatch();
  const data1 = cookie.get('suscriptor');
  
  const closeDrawer = useCallback(() => dispatch({ type: 'CLOSE_DRAWER' }), [
    dispatch,
  ]);

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: data1,
  });
  const [clientid] = useState(data1.clientid); 
  const [shop_image_logo,setShop_image_logo] = useState(data1.shop_image_logo); 
  const [shop_image_body,setShop_image_body] = useState(data1.shop_image_body); 
  const [estado, setEstado] = useState([{ value: data1.estado }]); 
  const [estadoOffline, setEstadoOffline] = useState([{ value: data1.status_shop }]); 
  const [authorized, setAuthorized] = useState([{ value: data1.is_negocio_web }]); 
  const [isLoading, setIsLoading] = useState(false);  
  const [isLoading2, setIsLoading2] = useState(false); 
  const [descripcion, setDescripcion] = useState(data1.descripcion);  
 
  
  React.useEffect(() => { 
    
    register({ name: 'clientid' }); 
    register({ name: 'estado' }); 
    register({ name: 'telefono' }); 
    register({ name: 'correo' }); 
    register({ name: 'titulo' });
    register({ name: 'descripcion' }); 
    register({ name: 'tags' }); 
    register({ name: 'canonical' }); 
    register({ name: 'facebook' }); 
    register({ name: 'instagram' }); 
    register({ name: 'estado' }); 
    register({ name: 'status_shop' }); 
    register({ name: 'authorized' }); 
    register({ name: 'negocio_web' }); 
    register({ name: 'is_negocio_web' }); 
  }, [register]);

  const [update_suscripcion] = useMutation(UPDATE_SUBSCRIPTION );
  const [delete_suscripcion] = useMutation(DELETE_SUBSCRIPTION );

 
  const handleMultiChange = ({ value }) => {
    if(value && value.length > 0)
    {
      setValue('estado', value[0].id);
      setEstado(value);
    }  
   
  };  



  const handleMultiChangeOffline = ({ value }) => {
    if(value && value.length > 0)
    {
      setValue('status_shop', value[0].id);
      setEstadoOffline(value);
    }  
   
  };  
  
  const onFileChange = async (files) => {
    setIsLoading(true)
    let arg = [] 
    let file = files[0];  // solo una imagen
    const storageRef = app.storage().ref();
        try {  
            const fileRef = storageRef.child(file.name);
            
            await fileRef.put(file) 
            arg.push( await fileRef.getDownloadURL()  );  
            console.log('arg:', arg)
            setShop_image_logo(arg[0])
         
        } catch(error ){
          console.log(error)
        } 
 
    setIsLoading(false) 
  };

  const onFileChange2 = async (files) => {
    setIsLoading2(true)
    let arg = [] 
    let file = files[0];  // solo una imagen
    const storageRef = app.storage().ref();
        try { 
             const fileRef = storageRef.child(file.name);
            
            await fileRef.put(file) 
            arg.push( await fileRef.getDownloadURL()  );  
            console.log('arg:', arg) 
            setShop_image_body(arg[0])
        } catch(error ){
          console.log(error)
        } 
 
    setIsLoading2(false) 
  };

  const handleMultiChange2 = ({ value }) => {
    if(value && value.length > 0)
    {
      setValue('authorized', value[0].id);
      setAuthorized(value);
    }  
   
  }; 

  const onSubmit = (data) => {
     
    if(data) {    
      const suscripcion = {
        clientid: clientid,
        nombre: data.nombre,
        authorized: authorized[0].value,
        url: data.negocio_web,
        status: estado[0].value,
        status_offline: estadoOffline[0].value,
        shop_image_logo: shop_image_logo,
        shop_image_body: shop_image_body,
        facebook: data.facebook,        
        instagram: data.instagram,
        titulo: data.titulo,
        descripcion: descripcion,
        tags: data.tags,
        canonical: data.canonical,
        telefono: data.telefono,
        correo: data.correo,
      };    
      console.log(suscripcion, 'actualizando Suscripcion');
      update_suscripcion({
        variables: {clientid: suscripcion.clientid,
                    nombre: suscripcion.nombre,
                    authorized: suscripcion.authorized,         
                    url: suscripcion.url,
                    status: suscripcion.status,
                    status_offline: suscripcion.status_offline,
                    shop_image_logo: suscripcion.shop_image_logo,
                    shop_image_body: suscripcion.shop_image_body,
                    facebook:  suscripcion.facebook,
                    instagram:  suscripcion.instagram,
                    titulo:  suscripcion.titulo,
                    descripcion:  suscripcion.descripcion,
                    tags:  suscripcion.tags,
                    canonical:  suscripcion.canonical,
                    telefono:  suscripcion.telefono,
                    correo:  suscripcion.correo
                  }
      });
    }
    closeDrawer(); 
  };

  const darBaja = () => {
   
      delete_suscripcion({
       variables:{
          clientid: clientid
        }
      }); 
    closeDrawer(); 
  };



  return (
    <>
    <br/>
    <br/>
    <br/>
      <DrawerTitleWrapper>
        <DrawerTitle>Mi Cuenta de Suscriptor</DrawerTitle>
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
              <FieldDetails>Mi Logo del Sitio aquí!</FieldDetails>
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
             
                  <div  >
                      <img   width="100" height="100" src={shop_image_logo}/> 
                  </div>
         
                  { isLoading && <div className="lds-dual-ring"></div> } 

             </DrawerBox> 
            </Col>
          </Row>


          <Row>
            <Col lg={4}>
              <FieldDetails>Imagen Body del Shop aquí!</FieldDetails>
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
               <Uploader  onChange={onFileChange2} />
             
               <div  >
                      <img   width="100" height="100" src={shop_image_body}/> 
                  </div>
         
                  { isLoading2 && <div className="lds-dual-ring"></div> } 

             </DrawerBox> 
            </Col>
          </Row>

          <Row>
            <Col lg={4}>
              <FieldDetails>
                Actualice la información necesaria aquí
              </FieldDetails>
            </Col>

            <Col lg={8}>
              <DrawerBox>

                <FormFields>
                  <FormLabel>Client ID</FormLabel>
                  <Input type="text" disabled   inputRef={register} name="clientid" />
                </FormFields>


                <FormFields>
                  <FormLabel>Nombre</FormLabel>
                  <Input type="text" disabled 
                    inputRef={register} /* ({ required: true, maxLength: 20 })} */
                    name="nombre"
                  />
                </FormFields>
                <FormFields>
                  <FormLabel>Teléfono</FormLabel>
                  <Input type="text" disabled 
                    inputRef={register} /* ({ required: true, maxLength: 20 })} */
                    name="telefono"
                  />
                </FormFields>
                <FormFields>
                  <FormLabel>Correo</FormLabel>
                  <Input type="text" disabled 
                    inputRef={register} /* ({ required: true, maxLength: 20 })} */
                    name="correo"
                  />
                </FormFields>
                <FormFields>
                  <FormLabel>Estado Cuenta</FormLabel>
                  <Select
                    options={options}
                    labelKey="name"
                    valueKey="value"
                    placeholder="seleccione"
                    value={estado}
                    disabled
                    onChange={handleMultiChange} 
                    overrides={{
                      Placeholder: {
                        style: ({ $theme }) => {
                          return {
                            ...$theme.typography.fontBold11,
                            color: $theme.colors.textNormal,
                          };
                        },
                      },
                      DropdownListItem: {
                        style: ({ $theme }) => {
                          return {
                            ...$theme.typography.fontBold11,
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
                <FormFields>
                  <FormLabel>URL Negocio</FormLabel>
                  <Input type="text" disabled
                    inputRef={register} /* ({ required: true, maxLength: 20 })} */
                    name="negocio_web"
                  />
                </FormFields>
                <FormFields>
                  <FormLabel>Estado Web Shop</FormLabel>
                  <Select
                    options={options_offline}
                    labelKey="name"
                    valueKey="value"
                    placeholder="seleccione"
                    value={estadoOffline}
                    onChange={handleMultiChangeOffline} 
                    overrides={{
                      Placeholder: {
                        style: ({ $theme }) => {
                          return {
                            ...$theme.typography.fontBold11,
                            color: $theme.colors.textNormal,
                          };
                        },
                      },
                      DropdownListItem: {
                        style: ({ $theme }) => {
                          return {
                            ...$theme.typography.fontBold11,
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

                 
                <FormFields>
                  <FormLabel>Acceso al Command Order</FormLabel>
                  <Select
                    options={options2}
                    labelKey="name"
                    valueKey="value"
                    placeholder="seleccione"
                    value={authorized}
                    onChange={handleMultiChange2} 
                    overrides={{
                      Placeholder: {
                        style: ({ $theme }) => {
                          return {
                            ...$theme.typography.fontBold11,
                            color: $theme.colors.textNormal,
                          };
                        },
                      },
                      DropdownListItem: {
                        style: ({ $theme }) => {
                          return {
                            ...$theme.typography.fontBold11,
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
              <FieldDetails>
                Actualice Redes Sociales  aquí
              </FieldDetails>
            </Col>

            <Col lg={8}>
              <DrawerBox>

                <FormFields>
                  <FormLabel>Facebook</FormLabel>
                  <Input type="text" disabled  inputRef={register} name="facebook" />
                </FormFields>

                <FormFields>
                  <FormLabel>Instagram</FormLabel>
                  <Input type="text" disabled  inputRef={register} name="instagram" />
                </FormFields> 
               
              </DrawerBox>
            </Col>
          </Row>

          <Row>
            <Col lg={4}>
              <FieldDetails>
                Ingresa los parámetros SEO de tu sitio
              </FieldDetails>
            </Col>

            <Col lg={8}>
              <DrawerBox>

                <FormFields>
                  <FormLabel>Meta Title</FormLabel>
                  <Input type="text" disabled   inputRef={register} name="titulo" />
                </FormFields>

                <FormFields>
                  <FormLabel>Meta Description</FormLabel>
                  <Textarea
                  value={ descripcion  }
                  onChange={(e) => setDescripcion(e.target.value)}
                />
                </FormFields>

                <FormFields>
                  <FormLabel>Meta Tag</FormLabel>
                  <Input type="text" disabled   inputRef={register} name="tags" />
                </FormFields>

                <FormFields>
                  <FormLabel>Meta Canonical</FormLabel>
                  <Input type="text" disabled   inputRef={register} name="canonical" />
                </FormFields>


              </DrawerBox>
            </Col>
          </Row>

      {/*     <Row>
            <Col lg={4}>
              <FieldDetails>Desea dar de Baja esta Suscripción ?</FieldDetails>
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
          </Row> */}
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
            disabled
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


export default SiteSettingsForm;
