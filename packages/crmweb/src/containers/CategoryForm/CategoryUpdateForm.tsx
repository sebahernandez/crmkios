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
import { UPDATE_CATEGORY } from 'utils/graphql/mutation/category';
import { DELETE_CATEGORY } from 'utils/graphql/mutation/category';
import { app } from '../../base';

import {
  Form,
  DrawerTitleWrapper,
  DrawerTitle,
  FieldDetails,
  ButtonGroup,
} from '../DrawerItems/DrawerItems.style';

 


type Props = any;



const ModifyCategory: React.FC<Props> = () => {

  const dispatch = useDrawerDispatch();
  const data1 = useDrawerState('data'); // saca el prop
  
  const closeDrawer = useCallback(() => dispatch({ type: 'CLOSE_DRAWER' }), [
    dispatch,
  ]);

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: data1,
  });
  const [clientid, setClientid] = useState([{ value: data1.clientid }]);  
  const [imageURL, setImageURL] = useState(data1.imageURL);      
  const [update_category, {error}] = useMutation(UPDATE_CATEGORY );
  const [delete_category] = useMutation(DELETE_CATEGORY );


  React.useEffect(() => { 
    register({ name: 'clientid' }); 
    register({ name: 'image', required: true });
    
  }, [register]);


  const onFileChange = async (e) => {
    const file = e.target.files[0];
    if(file){
      const storageRef = app.storage().ref();
      const fileRef = storageRef.child(file.name);
      await fileRef.put(file)
      setImageURL(await fileRef.getDownloadURL());            
    }
   } 


  const onSubmit = (data) => {
     
    const category = {
      id: data1.id,
      clientid: clientid[0].value,
      value: data.value,
      name: data.name,
      image: imageURL  
    };    
    console.log(category, 'actualizando Category');

    update_category({
      variables: {id: category.id,
                  clientid: category.clientid,
                  value: category.value,
                  name: category.name,                   
                  imageURL: category.image
                }
    }); 
    closeDrawer(); 
  };

  const darBaja = () => {
   
     delete_category({
       variables:{id: data1.id,clientid: clientid[0].value}});
     closeDrawer(); 
  };



  return (
    <>
      <DrawerTitleWrapper>
        <DrawerTitle>Modificar Categor??a</DrawerTitle>
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
              <FieldDetails>Sube la Imagen de tu producto aqu??!</FieldDetails>
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
              
             <input className="charge-image" type="file" onChange={onFileChange} />
             <img width="100" height="100" src={imageURL}/>
             </DrawerBox> 
            </Col>
          </Row>
          <Row>
            <Col lg={4}>
              <FieldDetails>
                Agregue la descripci??n de su category y la informaci??n necesaria desde aqu??
              </FieldDetails>
            </Col>

            <Col lg={8}>
              <DrawerBox>

                <FormFields>
                  <FormLabel>C??digo</FormLabel>
                  <Input type="text"  inputRef={register} name="value" />
                  
                </FormFields>
                <FormFields>
                  <FormLabel>Client ID</FormLabel>
                  <Input type="text" disabled  inputRef={register} name="clientid" value={clientid[0].value}/>
                </FormFields>


                <FormFields>
                  <FormLabel>Descripci??n</FormLabel>
                  <Input type="text"
                    inputRef={register} /* ({ required: true, maxLength: 20 })} */
                    name="name"
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

export default ModifyCategory;
