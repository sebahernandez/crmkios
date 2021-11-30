import React, { useContext, useEffect, useState } from 'react';
import { styled, withStyle } from 'baseui'; 
import { Grid, Row as Rows, Col as Column } from 'components/FlexBox/FlexBox';
import { CheckMark } from 'assets/icons/CheckMark'
import {  useSubscription } from '@apollo/client';
import { Wrapper,Header, Heading } from 'components/Wrapper.style';
import SubscriptionButton from 'components/SubscriptionCard/SubscriptionButton';
import NoResult from 'components/NoResult/NoResult';
import { DASHBOARD, SUBSCRIPTIONS } from '../../settings/constants';
import Cookies  from 'universal-cookie';
import { GET_SUBSCRIPTIONS } from 'utils/graphql/query/subscription.query';

import {
  TableWrapper,
  StyledTable,
  StyledHeadCell,
  StyledBodyCell,
} from '../Customers/Customers.style';  
import { useHistory, useLocation } from 'react-router';
import { AuthContext } from 'context/auth';

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
  let location = useLocation()
  let history = useHistory();
  const [usuario, SetUsuario] = useState('matias.aravena.a@gmail.com');
	const [password, SetPassword] = useState('1234');
	let { dashboard } = (location.state as any) || { dashboard: { pathname: DASHBOARD } };
  const { data  } = useSubscription(GET_SUBSCRIPTIONS);
  const { authenticate } = useContext(AuthContext);
 

    useEffect(()=> {
      if(data)console.log('data',data) 
    },[clientid, data])
 

    const auth = () => {
	 
      authenticate({ usuario, password }, async () => { 
            
        
            history.replace(dashboard);
        
      });
       
    }
  

	const handleMoreInfo = async () => {
		 
	  
    alert('Prontamente disponible')
    // auth()
		

	}

  
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
              <StyledTable $gridTemplateColumns="minmax(150px, 50px) minmax(150px, 50px) minmax(120px, 50px) minmax(120px, 50px) minmax(150px, 50px) minmax(120px, 50px) minmax(150px, 50px) minmax(150px, 50px)  minmax(200px, 50px) minmax(220px, 50px) minmax(220px, 50px) minmax(220px, 50px) minmax(220px, 50px) minmax(220px, 50px)  minmax(220px, 50px) minmax(220px, 50px)  minmax(220px, 50px)  minmax(220px, 50px)  minmax(220px, 50px) minmax(300px, 70px) minmax(300px, 70px) minmax(300px , 50px) minmax(300px, 50px)  minmax(300px, 50px)   minmax(300px, 50px)   minmax(300px, 50px) minmax(150px, max-content)">
                <StyledHeadCell>Acción</StyledHeadCell>
                <StyledHeadCell>CRM</StyledHeadCell>
                <StyledHeadCell>Logo</StyledHeadCell>
                <StyledHeadCell>Image Body</StyledHeadCell>
                <StyledHeadCell>ClientID</StyledHeadCell>
                <StyledHeadCell>Usuario</StyledHeadCell>
                <StyledHeadCell>Suscriptor</StyledHeadCell>
                <StyledHeadCell>Teléfono</StyledHeadCell>
                <StyledHeadCell>Correo</StyledHeadCell>
                <StyledHeadCell>Password</StyledHeadCell>
                <StyledHeadCell>Fecha</StyledHeadCell>
                <StyledHeadCell>Vencimiento</StyledHeadCell>
                <StyledHeadCell>Estado Cuenta</StyledHeadCell>
                <StyledHeadCell>Estado Web Shop</StyledHeadCell>
                <StyledHeadCell>Categorías Tienda</StyledHeadCell>  
                <StyledHeadCell>Productos Tienda</StyledHeadCell>                
                <StyledHeadCell>Pedidos Tienda</StyledHeadCell>                
                <StyledHeadCell>Ventas Total Tienda</StyledHeadCell>                
                <StyledHeadCell>Clientes Tienda</StyledHeadCell>                
                <StyledHeadCell>FaceBook</StyledHeadCell>
                <StyledHeadCell>Instagram</StyledHeadCell>
                <StyledHeadCell>SEO Título</StyledHeadCell>
                <StyledHeadCell>SEO Descripción</StyledHeadCell>
                <StyledHeadCell>SEO Tags</StyledHeadCell>
                <StyledHeadCell>SEO Canonical</StyledHeadCell>
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
                             { <button onClick={handleMoreInfo} className="btn-login">Ingresar</button>  }
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
                            <StyledBodyCell>{item.usuario}</StyledBodyCell>
                            <StyledBodyCell>{item.clave}</StyledBodyCell>
                           <StyledBodyCell>{item.fecha_suscripcion}</StyledBodyCell>
                          <StyledBodyCell>{item.fecha_vencimiento}</StyledBodyCell>
                          <StyledBodyCell>{item.estado}</StyledBodyCell>
                          <StyledBodyCell>{item.status_shop}</StyledBodyCell>
                          <StyledBodyCell>{item.categorias_aggregate.aggregate.count}</StyledBodyCell>
                          <StyledBodyCell>{item.productos_aggregate.aggregate.count}</StyledBodyCell>
                          <StyledBodyCell>{item.pedidos_aggregate.aggregate.count}</StyledBodyCell>
                          <StyledBodyCell>{item.pedidos_aggregate.aggregate.sum.total}</StyledBodyCell>
                          <StyledBodyCell>{item.clientes_aggregate.aggregate.count}</StyledBodyCell>
                          <StyledBodyCell>{item.facebook}</StyledBodyCell>
                          <StyledBodyCell>{item.instagram}</StyledBodyCell>
                          <StyledBodyCell>{item.titulo}</StyledBodyCell>
                          <StyledBodyCell>{item.descripcion}</StyledBodyCell>
                          <StyledBodyCell>{item.tags}</StyledBodyCell>
                          <StyledBodyCell>{item.canonical}</StyledBodyCell>
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