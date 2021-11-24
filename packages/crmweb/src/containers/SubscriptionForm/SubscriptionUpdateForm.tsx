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

import {
  Form,
  DrawerTitleWrapper,
  DrawerTitle,
  FieldDetails,
  ButtonGroup,
} from '../DrawerItems/DrawerItems.style';

type Props = any;

const ModifySubscription: React.FC<Props> = () => {

  let options = [
    {"name": "Activa","value": "Activa"},
    {"name": "Pausada","value": "Pausada"},
  ];

  let options2 = [
    {"name": "Con Acceso","value": true},
    {"name": "Sin Acceso","value": false},
  ];
  const dispatch = useDrawerDispatch();
  const data1 = useDrawerState('data');
  
  const closeDrawer = useCallback(() => dispatch({ type: 'CLOSE_DRAWER' }), [
    dispatch,
  ]);

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: data1,
  });
  const [clientid] = useState(data1.clientid); 
  const [estado, setEstado] = useState([{ value: data1.estado }]); 
  const [authorized, setAuthorized] = useState([{ value: data1.is_negocio_web }]); 
  const [isLoading, setIsLoading] = useState(false);  
 
  
  React.useEffect(() => { 
    
    register({ name: 'clientid' }); 
    register({ name: 'estado' }); 
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
 
    setIsLoading(false) 
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
        authorized: authorized[0].value,
        url: data.negocio_web,
        status: estado[0].value,
      };    
      console.log(suscripcion, 'actualizando Suscripcion');
      // $clientid: String!, $authorized: Boolean!, $url: String!, $status: String!
      update_suscripcion({
        variables: {clientid: suscripcion.clientid,
                    authorized: suscripcion.authorized,         
                    url: suscripcion.url,
                    status: suscripcion.status
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
      <DrawerTitleWrapper>
        <DrawerTitle>Modificar Suscripción</DrawerTitle>
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
              <FieldDetails>Sube Logo del Sitio aquí!</FieldDetails>
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
              <FieldDetails>Sube Imagen Body del Shop aquí!</FieldDetails>
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
                Actualice la información necesaria aquí
              </FieldDetails>
            </Col>

            <Col lg={8}>
              <DrawerBox>

                <FormFields>
                  <FormLabel>Client ID</FormLabel>
                  <Input type="text" disabled  inputRef={register} name="clientid" />
                </FormFields>


                <FormFields>
                  <FormLabel>Nombre</FormLabel>
                  <Input type="text" disabled
                    inputRef={register} /* ({ required: true, maxLength: 20 })} */
                    name="nombre"
                  />
                </FormFields>
                <FormFields>
                  <FormLabel>Estado</FormLabel>
                  <Select
                    options={options}
                    labelKey="name"
                    valueKey="value"
                    placeholder="seleccione"
                    value={estado}
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
                  <Input type="text"
                    inputRef={register} /* ({ required: true, maxLength: 20 })} */
                    name="negocio_web"
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

export default ModifySubscription;
