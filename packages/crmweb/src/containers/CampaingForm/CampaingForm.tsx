import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { useMutation, gql } from '@apollo/client';
import { useDrawerDispatch } from 'context/DrawerContext';
import { Scrollbars } from 'react-custom-scrollbars';
import Input from 'components/Input/Input'; 
import Button, { KIND } from 'components/Button/Button';
import DrawerBox from 'components/DrawerBox/DrawerBox';
import { Row, Col } from 'components/FlexBox/FlexBox';
import { app } from '../../../src/base';
import {
  Form,
  DrawerTitleWrapper,
  DrawerTitle,
  FieldDetails,
  ButtonGroup,
} from '../DrawerItems/DrawerItems.style';
import { FormFields, FormLabel } from 'components/FormFields/FormFields';
 
const CREATE_COUPON = gql`
  mutation MyMutation ($clientid: String!, $titulo: String!, $numero_cupon: Int!, $image: String!, $code: String!, $cupones_usados: Int!, $discount: Int!, $estado: String!) {
    insert_cupon(objects: {clientid: $clientid, code: $code,   cupones_usados: $cupones_usados, discount: $discount, estado: $estado, image: $image, numero_cupon: $numero_cupon, titulo: $titulo}) {
      returning {
        id
      }
      affected_rows
    }
  }
`;

 

type Props = any;

const AddCampaing: React.FC<Props> = (props) => {
  const dispatch = useDrawerDispatch();
  const closeDrawer = useCallback(() => dispatch({ type: 'CLOSE_DRAWER' }), [
    dispatch,
  ]);

  const [clientid] = useState(sessionStorage.getItem('clientid')); 
  const [image, setImage] = useState(''); 
  const { register, handleSubmit } = useForm(); 
  React.useEffect(() => { 
    register({ name: 'image', required: true });
  }, [register]);
  const [createCoupon] = useMutation(CREATE_COUPON);

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    if(file){
      const storageRef = app.storage().ref();
      const fileRef = storageRef.child(file.name);
      await fileRef.put(file)
      setImage(await fileRef.getDownloadURL());      
    }
   } 

   const onSubmit = (data) => {
    const cupon = {
      id: uuidv4(),
      clientid: clientid,
      titulo: data.titulo,
      code: data.code,
      estado: '',
      discount: Number(data.discount),
      numero_cupon: Number(data.numero_cupon),
      cupones_usados: Number(data.cupones_usados),
      image: image && image.length !== 0 ? image : ''
    };
    createCoupon({ 
        variables: {id: cupon.id,
          clientid: cupon.clientid,
          titulo: cupon.titulo,
          code: cupon.code,
          estado: cupon.estado,
          discount: cupon.discount,
          numero_cupon: cupon.numero_cupon,
          cupones_usados: cupon.cupones_usados,
          image: cupon.image
        } 
    });
    closeDrawer();
    console.log(cupon, 'newCoupon');
  };
 
 

  return (
    <>
      <DrawerTitleWrapper>
        <DrawerTitle>Anadir Campaña</DrawerTitle>
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
              <FieldDetails>Sube la Imagen de tu cupon aquí!</FieldDetails>
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
                      justifyContent: 'left',
                    },
                  },
                }}
              > 
              
             <input className="charge-image" type="file" onChange={onFileChange}  />
            <img style={{objectFit:'cover'}} width="100" height="100" src={image}/>
             </DrawerBox> 
            </Col>
          </Row>
          <Row>
            <Col lg={4}>
              <FieldDetails>
                Agregue la descripción de su cupón y la información necesaria desde aquí
              </FieldDetails>
            </Col>

            <Col lg={8}>
              <DrawerBox>

                <FormFields>
                  <FormLabel>Código</FormLabel>
                  <Input type="text"  inputRef={register} name="code" />
                  
                </FormFields>
                <FormFields>
                  <FormLabel>Client ID</FormLabel>
                  <Input type="text" disabled  inputRef={register} name="clientid" value={clientid}/>
                </FormFields>


                <FormFields>
                  <FormLabel>Título</FormLabel>
                  <Input type="text"
                    inputRef={register} /* ({ required: true, maxLength: 20 })} */
                    name="titulo"
                  />
                </FormFields>
                <FormFields>
                  <FormLabel>Descuento(%)</FormLabel>
                  <Input type="number" inputRef={register} name="discount" />
                </FormFields>

                <FormFields>
                  <FormLabel>Número de Cupones</FormLabel>
                  <Input type="number" inputRef={register} name="numero_cupon" />
                </FormFields>

                <FormFields>
                  <FormLabel>Cupones Usados</FormLabel>
                  <Input type="number" inputRef={register} name="cupones_usados" />
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
            Crear Campaña
          </Button>
        </ButtonGroup>
      </Form>
    </>
  );
};

export default AddCampaing;
