import React, { useState, useCallback } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { Scrollbars } from 'react-custom-scrollbars';
import { useDrawerDispatch, useDrawerState } from 'context/DrawerContext'; 
import Button, { KIND } from 'components/Button/Button';
import DrawerBox from 'components/DrawerBox/DrawerBox';
import { Row, Col } from 'components/FlexBox/FlexBox';
import Input from 'components/Input/Input'; 
import { FormFields, FormLabel } from 'components/FormFields/FormFields';
import { app } from '../../base';

import {
  Form,
  DrawerTitleWrapper,
  DrawerTitle,
  FieldDetails,
  ButtonGroup,
} from '../DrawerItems/DrawerItems.style';

 

const UPDATE_CUPON = gql`
  mutation updateCupon($clientid: String!, $id: Int!, $titulo: String!, $numero_cupon: Int!, $image: String!, $code: String!, $cupones_usados: Int!, $discount: Int!, $estado: String!) {
    update_cupon(where: {clientid: {_eq: $clientid}, _and: {id: {_eq: $id}}}, _set: {code: $code, cupones_usados: $cupones_usados, discount: $discount, estado: $estado, image: $image, numero_cupon: $numero_cupon, titulo: $titulo}) {
      affected_rows
    }
  }
`;

const DELETE_CUPON = gql`
  
  mutation delete_cupon($id: Int!, $clientid: String!) {
  delete_cupon(
      where: {id: {_eq:$id}, clientid:{_eq: $clientid} } 
  ){
      affected_rows
  }
  }

`;


type Props = any;



const ModifyCoupon: React.FC<Props> = () => { 

  const dispatch = useDrawerDispatch();
  const data1 = useDrawerState('data'); // saca el prop
  
  const closeDrawer = useCallback(() => dispatch({ type: 'CLOSE_DRAWER' }), [
    dispatch,
  ]);

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: data1,
  });
  const [orderId, setOrderId] = useState([{ value: data1.id }]);
  const [clientid, setClientid] = useState([{ value: data1.clientid }]);  
  const [image, setImage] = useState(data1.image);  

  

  React.useEffect(() => { 
    register({ name: 'clientid' }); 
    register({ name: 'image', required: true });
    setImage(data1.image);
  }, [register]);

  const [update_cupon, {error}] = useMutation(UPDATE_CUPON );
  const [delete_cupon] = useMutation(DELETE_CUPON );

 

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
      id: data1.id,
      clientid: clientid[0].value,
      titulo: data.titulo,
      code: data.code,
      estado: data1.estado,
      discount: Number(data.discount),
      numero_cupon: Number(data.numero_cupon),
      cupones_usados: Number(data.cupones_usados),
      image: image && image.length !== 0 ? image : ''
    };    
    update_cupon({
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
  };

  const darBaja = () => {
   
     delete_cupon({
       variables:{id: data1.id,clientid: clientid[0].value}});
     closeDrawer(); 
  };



  return (
    <>
      <DrawerTitleWrapper>
        <DrawerTitle>Modificar Cupón</DrawerTitle>
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
             
              <FieldDetails>Sube la Imagen de tu cupón aquí!</FieldDetails>
            </Col>
            <Col lg={8}>
              <DrawerBox>
                <input className="charge-image"  type="file" onChange={onFileChange} />               
                <img width="150" height="150" src={image}/>
              </DrawerBox>
            </Col>
          </Row>

          <Row>
            <Col lg={4}>
              <FieldDetails>
                Agregue la descripción de su cupon y la información necesaria desde aquí
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
                  <Input type="text" disabled  inputRef={register} name="clientid" />
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
          <Row>
            <Col lg={4}>
              <FieldDetails>Desea dar de Baja esta Campaña ?</FieldDetails>
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

export default ModifyCoupon;
