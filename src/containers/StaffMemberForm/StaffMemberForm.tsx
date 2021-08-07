import React, { useState, useCallback } from 'react';

import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { useMutation, gql } from '@apollo/client';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useDrawerDispatch } from 'context/DrawerContext';
import Input from 'components/Input/Input';
import Checkbox from 'components/CheckBox/CheckBox';
import PhoneInput from 'components/PhoneInput/PhoneInput';
import Button, { KIND } from 'components/Button/Button';
import Select from 'components/Select/Select';
import DrawerBox from 'components/DrawerBox/DrawerBox';
import { Row, Col } from 'components/FlexBox/FlexBox';
import {
  Form,
  DrawerTitleWrapper,
  DrawerTitle,
  FieldDetails,
  ButtonGroup,
} from '../DrawerItems/DrawerItems.style';
import { FormFields, FormLabel } from 'components/FormFields/FormFields';
import { app } from '../../../src/base';


//($role: String, $searchBy: String)
const GET_STAFFS = gql`
  query getStaffs {
    staffs {
      id
      name
      email
      contact_number
      creation_date
      role
    }
  }
`;

const CREATE_STAFF = gql`
  
  mutation insert_empleado($nombre: String!, $paterno: String!, $materno: String!, $rol: String!, $telefono: String!,
  $email: String!, $estado: String!, $imageURL: String!, $clientid: String! ) {
    insert_empleado(
            objects: [
                {
                  nombre: $nombre,
                  paterno: $paterno,
                  materno: $materno
                  rol: $rol
                  telefono: $telefono
                  email: $email
                  estado: $estado
                  image_url: $imageURL
                  clientid: $clientid
                }
              ]
          ){
            affected_rows
          }
    }
`;

const roleSelectOptions = [
  { value: 'owner', name: 'Owner' },
  { value: 'admin', name: 'Administrador' },
  { value: 'manager', name: 'Jefe' },
  { value: 'member', name: 'Empleado' },
  { value: 'delivery boy', name: 'Delivery' },
];

const estados = [
  { value: 'Activo', name: 'Activo' },
  { value: 'InActivo', name: 'InActivo' }, 
];


type Props = any;

const StaffMemberForm: React.FC<Props> = (props) => {
  const dispatch = useDrawerDispatch();
  const closeDrawer = useCallback(() => dispatch({ type: 'CLOSE_DRAWER' }), [
    dispatch,
  ]);
  const [clientid, setClientid] = useState(sessionStorage.getItem('clientid')); 
  const { register, handleSubmit, setValue } = useForm( );
  const [rol, setRol] = React.useState(undefined);
  const [estado, setEstado] = React.useState(undefined);
  const [telefoono, setTelefono] = React.useState(undefined);
  const [country, setCountry] = React.useState(undefined);
  const [imageURL, setImageURL] = useState(null); 
  const [checked, setChecked] = React.useState(true);
  const [text, setText] = React.useState('');

 

  const [insert_empleado, {error}] = useMutation(CREATE_STAFF );


  React.useEffect(() => {
    /* register({ name: 'clientid' });
    register({ name: 'rol' });
    register({ name: 'telefono' });
    register({ name: 'imageURL', required: true }); */
  }, [register]);

 
  const handleMultiChange = ({ value }) => {
    setRol(value);
  };

  const handleMultiChangeStatus = ({ value }) => {
    setEstado(value);
  };
 


  const onSubmit = (e) => {
     
    const newEmployee = {
      nombre: e.nombre,
      paterno: e.paterno,
      materno: e.materno,
      rol: rol[0].value,
      telefono: e.telefono,
      email: e.email,
      estado: estado[0].value,
      imageURL: imageURL && imageURL.length !== 0 ? imageURL : '',
      clientid: sessionStorage.getItem('clientid')
    };    
    console.log(newEmployee, 'Ingresando Empleado Nuevo');
    insert_empleado({
      variables: {nombre: newEmployee.nombre, 
                  paterno: newEmployee.paterno,
                  materno: newEmployee.materno,
                  rol: newEmployee.rol,
                  telefono: newEmployee.telefono,
                  email: newEmployee.email,
                  estado: newEmployee.estado,
                  imageURL: newEmployee.imageURL,
                  clientid: newEmployee.clientid
                }
    });
    closeDrawer();
  };


  
  const onFileChange = async (e) => {
    const file = e.target.files[0];
    if(file){
      const storageRef = app.storage().ref();
      const fileRef = storageRef.child(file.name);
      await fileRef.put(file)
      console.log("Uploaded file " , file.name);
      console.log(JSON.stringify(await fileRef.getDownloadURL()));
      setImageURL(await fileRef.getDownloadURL());      
    }
   } 


  return (
    <>
      <DrawerTitleWrapper>
        <DrawerTitle>Agregar Empleado</DrawerTitle>
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
              <FieldDetails>Sube la Imagen aquí!</FieldDetails>
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
              
             <input  type="file" onChange={onFileChange} />
             <img width="100" height="100" src={imageURL}/>
             </DrawerBox> 
            </Col>
          </Row>

          <Row>
            <Col lg={4}>
              <FieldDetails>
              Agregue el nombre del personal, la descripción y la información necesaria desde aquí
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
                  <FormLabel>Apellido Paterno</FormLabel>
                  <Input
                    inputRef={register}
                    name="paterno"
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Apellido Materno</FormLabel>
                  <Input
                    inputRef={register}
                    name="materno"
                  />
                </FormFields>


                <FormFields>
                  <FormLabel>Rol</FormLabel>
                  <Select
                    options={roleSelectOptions}
                    labelKey="name"
                    valueKey="value"
                    placeholder="Seleccione"
                    value={rol}
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
                <FormFields>
                  <FormLabel>Estado</FormLabel>
                  <Select
                    options={estados}
                    labelKey="name"
                    valueKey="value"
                    placeholder="Seleccione"
                    value={estado}
                    onChange={handleMultiChangeStatus}
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

                <FormFields>
                  <FormLabel>Telefono</FormLabel>
                  <PhoneInput
                    country={country}
                    onCountryChange={({ option }) => setCountry(option)}
                    text={text}
                    onTextChange={(e) => setText(e.currentTarget.value)}
                    inputRef={register}
                    name="telefono"
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    inputRef={register}
                    name="email"
                  />
                </FormFields>
              </DrawerBox>
            </Col>
          </Row>

          <Row>
            <Col lg={4}>
              <FieldDetails>
                Ampliar o restringir los permisos del usuario para acceder a determinada parte del
                sistema.
              </FieldDetails>
            </Col>

            <Col lg={8}>
              <DrawerBox>
                <FormFields>
                  <Checkbox
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                    inputRef={register}
                    name="agreement_check"
                    overrides={{
                      Label: {
                        style: ({ $theme }) => ({
                          color: $theme.colors.textNormal,
                        }),
                      },
                    }}
                  >
                    Acceso para cuenta creada
                  </Checkbox>
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
            Cancel
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
           Agregar Personal
          </Button>
        </ButtonGroup>
      </Form>
    </>
  );
};

export default StaffMemberForm;
