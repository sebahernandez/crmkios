import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form'; 
import { useMutation, gql } from '@apollo/client';
import { useDrawerDispatch } from 'context/DrawerContext';
import { Scrollbars } from 'react-custom-scrollbars'; 
import Input from 'components/Input/Input';
import Button, { KIND } from 'components/Button/Button';
import DrawerBox from 'components/DrawerBox/DrawerBox';
import { Row, Col } from 'components/FlexBox/FlexBox';
import {
  Form,
  DrawerTitleWrapper,
  DrawerTitle,
  FieldDetails,
  ButtonGroup,
} from '../DrawerItems/DrawerItems.style';
import { app } from '../../base';
import { FormFields, FormLabel } from 'components/FormFields/FormFields';
import config from 'settings/config';


 
const CREATE_CATEGORY = gql`
   mutation insert_categorias($name: String!, $value: String!,$clientid: String!,$imageURL: String!) {
    insert_categorias(
            objects: [
                {
                  name: $name,
                  value: $value,
                  clientid: $clientid,
                  imageURL: $imageURL                  
                }
              ]
          ){
            affected_rows
          }
    }

`;

type Props = any;
const cid =  config().SUBSCRIPTION_ID;
const AddCategory: React.FC<Props> = (props) => {
  const dispatch = useDrawerDispatch();
  const closeDrawer = useCallback(() => dispatch({ type: 'CLOSE_DRAWER' }), [
    dispatch,
  ]);
  const { register, handleSubmit } = useForm(); 
  const [imageURL, setImageURL] = useState(null);    

  React.useEffect(() => {
    register({ name: 'clientid' });
    register({ name: 'parent' });
    register({ name: 'image' });
  }, [register]);

  const [insert_categorias, {error}] = useMutation(CREATE_CATEGORY );


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
      clientid: cid,
      value: data.value,
      name: data.name,
      image: imageURL  
    };    
    console.log(category, 'actualizando Category');

    insert_categorias({
      variables: { 
                  clientid: category.clientid,
                  value: category.value,
                  name: category.name,                   
                  imageURL: category.image
                }
    }); 
    closeDrawer(); 
  };
 
  return (
    <>
      <DrawerTitleWrapper>
        <DrawerTitle>Agregar Categor??a</DrawerTitle>
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
                  <Input type="text" disabled  inputRef={register} name="clientid" value={cid}/>
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

export default AddCategory;
