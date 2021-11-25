import React, { useEffect } from 'react';
import { styled, withStyle } from 'baseui'; 
import { Grid, Row as Rows, Col as Column } from 'components/FlexBox/FlexBox';
import { CheckMark } from 'assets/icons/CheckMark'
import {  useSubscription } from '@apollo/client';
import { Wrapper,Header, Heading } from 'components/Wrapper.style';
import SubscriptionButton from 'components/SubscriptionCard/SubscriptionButton';
import NoResult from 'components/NoResult/NoResult';
import Cookies  from 'universal-cookie';
import { GET_SUBSCRIPTIONS } from 'utils/graphql/query/subscription.query';

import {
  TableWrapper,
  StyledTable,
  StyledHeadCell,
  StyledBodyCell,
} from '../Customers/Customers.style'; 

export const SubscriptionsRow = styled('div', ({ $theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  marginTop: '25px',
  backgroundColor: $theme.colors.backgroundF7,
  position: 'relative',
  zIndex: '1',

  '@media only screen and (max-width: 767px)': {
    marginLeft: '-7.5px',
    marginRight: '-7.5px',
    marginTop: '15px',
  },
}));

export const Col = withStyle(Column, () => ({
  '@media only screen and (max-width: 767px)': {
    marginBottom: '20px',

    ':last-child': {
      marginBottom: 0,
    },
  },
}));

const Row = withStyle(Rows, () => ({
  '@media only screen and (min-width: 768px) and (max-width: 991px)': {
    alignItems: 'center',
  },
}));

export const SubscriptionCardWrapper = styled('div', () => ({
  height: '100%',
}));

export const LoaderWrapper = styled('div', () => ({
  width: '100%',
  height: '100vh',
  display: 'flex',
  flexWrap: 'wrap',
}));

export const LoaderItem = styled('div', () => ({
  width: '25%',
  padding: '0 15px',
  marginBottom: '30px',
}));


const ImageWrapper = styled('div', ({ $theme }) => ({
  width: '88px',
  height: '88px',
  overflow: 'hidden',
  display: 'inline-block',
  borderTopLeftRadius: '0px',
  borderTopRightRadius: '0px',
  borderBottomRightRadius: '0px',
  borderBottomLeftRadius: '0px',
  backgroundColor: $theme.colors.backgroundF7,
}));

const Image = styled('img', () => ({
  width: '100%',
  height: 'auto',
})); 
const ImageRoot = styled('img', () => ({
  width: '80%',
  height: 'auto',
})); 
 
export default function Suscriptions() {
  const cookie = new Cookies() 
  const clientid = cookie.get('suscriptor').clientid

 
  
  // lista de Subscriptionos totales x clientid
  const { data  } = useSubscription(GET_SUBSCRIPTIONS);
 
 

    useEffect(()=> {
      if(data)console.log('data',data) 
    },[clientid, data])
 
  
  function Detail(){
  return (
    <Grid fluid={true} >
    <Row>
      <Col md={12}>
      <Header style={{ marginBottom: 15 }}>
          <Col md={12} xs={12}>
            <Heading>Listado de Suscripciones</Heading>
          </Col> 
        </Header>
        <Wrapper style={{ boxShadow: '0 0 5px rgba(0, 0 , 0, 0.05)'  }}>
            <TableWrapper>
              <StyledTable $gridTemplateColumns="minmax(150px, 50px) minmax(120px, 50px) minmax(120px, 50px) minmax(150px, 50px) minmax(120px, 50px) minmax(150px, 50px) minmax(150px, 50px) minmax(220px, 50px) minmax(220px, 50px) minmax(220px, 50px) minmax(220px, 50px) minmax(300px, 70px) minmax(300px, 70px) minmax(300px , 50px) minmax(300px, 50px) minmax(300px, 50px)   minmax(300px, 50px) minmax(150px, max-content)">
                <StyledHeadCell>Acción</StyledHeadCell>
                <StyledHeadCell>Logo</StyledHeadCell>
                <StyledHeadCell>Image Body</StyledHeadCell>
                <StyledHeadCell>ClientID</StyledHeadCell>
                <StyledHeadCell>Usuario</StyledHeadCell>
                <StyledHeadCell>Suscriptor</StyledHeadCell>
                <StyledHeadCell>Teléfono</StyledHeadCell>
                <StyledHeadCell>Correo</StyledHeadCell>
                <StyledHeadCell>Fecha</StyledHeadCell>
                <StyledHeadCell>Vencimiento</StyledHeadCell>
                <StyledHeadCell>Estado</StyledHeadCell>
                <StyledHeadCell>FaceBook</StyledHeadCell>
                <StyledHeadCell>Instagram</StyledHeadCell>
                <StyledHeadCell>Título</StyledHeadCell>
                <StyledHeadCell>Descripción</StyledHeadCell>
                <StyledHeadCell>Tags</StyledHeadCell>
                <StyledHeadCell>URL</StyledHeadCell>
                <StyledHeadCell>Autorizado</StyledHeadCell>             
                {data && data.suscripciones ? (
                  data.suscripciones.length ? (
                    data.suscripciones.map((item: any, index: number) => (
                        <React.Fragment key={index}>
                          <StyledBodyCell>
                             {  <SubscriptionButton
                                         data={item}
                            />  }
                        </StyledBodyCell>  
                           <StyledBodyCell>
                            <ImageWrapper>
                              <ImageRoot src={item.shop_image_logo !== null &&  item.shop_image_logo}   />
                            </ImageWrapper>
                          </StyledBodyCell>
                         <StyledBodyCell>
                            <ImageWrapper>
                              <ImageRoot src={item.shop_image_body !== null &&  item.shop_image_body}   />
                            </ImageWrapper>
                          </StyledBodyCell>
                            <StyledBodyCell>{item.clientid}</StyledBodyCell>
                            <StyledBodyCell>
                            <ImageWrapper>
                              <ImageRoot src={item.crm_image_user !== null &&  item.crm_image_user}   />
                            </ImageWrapper>
                          </StyledBodyCell>
                            <StyledBodyCell>{item.nombre}</StyledBodyCell>
                            <StyledBodyCell>{item.telefono}</StyledBodyCell>
                            <StyledBodyCell>{item.correo}</StyledBodyCell>
                           <StyledBodyCell>{item.fecha_suscripcion}</StyledBodyCell>
                          <StyledBodyCell>{item.fecha_vencimiento}</StyledBodyCell>
                          <StyledBodyCell>{item.estado}</StyledBodyCell>
                          <StyledBodyCell>{item.facebook}</StyledBodyCell>
                          <StyledBodyCell>{item.instagram}</StyledBodyCell>
                          <StyledBodyCell>{item.titulo}</StyledBodyCell>
                          <StyledBodyCell>{item.descripcion}</StyledBodyCell>
                          <StyledBodyCell>{item.tags}</StyledBodyCell>
                          <StyledBodyCell>{item.negocio_web}</StyledBodyCell>
                 <StyledBodyCell>{item.is_negocio_web===false?'':<CheckMark />}</StyledBodyCell>   
                    
                        </React.Fragment>
                    ))
                  ) : (
                    <NoResult
                      hideButton={false}
                      style={{
                        gridColumnStart: '1',
                        gridColumnEnd: 'one',
                      }}
                    />
                  )
                ) : null}
              </StyledTable>
            </TableWrapper>
          </Wrapper>

          </Col>
          </Row>
          </Grid>
      );
   }
 
  return (
   <>
     
     <Detail />

   </>

  );
}