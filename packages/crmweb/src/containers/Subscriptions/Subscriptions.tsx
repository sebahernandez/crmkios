import React, { useEffect, useState } from 'react';
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

const selectorView = [
  { value: true, label: 'Vista Imagen' },
  { value: false, label: 'Vista Detalle' },
];

export default function Suscriptions() {
  const cookie = new Cookies() 
  const clientid = cookie.get('suscriptor').clientid

  // tipo de Subscriptiono / categoria
  const [type, setType] = useState([]); 
  const [isView, setIsView] = useState(true);
  const [textoView, setTextoView] = useState('Vista Imagen');

  // seach text
  const [search, setSearch] = useState(''); 

  
  // lista de Subscriptionos totales x clientid
  const { data  } = useSubscription(GET_SUBSCRIPTIONS);
 
 

    useEffect(()=> {
      if(data)console.log('data',data) 
    },[clientid, data, type])
  // lista de Subscriptionos x categoria x clientid + ordenados asc desc price  
  
/*  
  if (error1){
    return <div>Error! {error1.message} </div>;
  }
  if (error2) {
    return <div>,Error! {error2.message} </div>;
  } */
/*   if (error3) {
    return <div>,Error! {error3.message} </div>;
  } */
  /* function loadMore() {
    toggleLoading(true);
    fetchMore({
      variables: {
        offset: data.Subscriptiono.length,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        toggleLoading(false);
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          Subscriptiono: {
            // _typename: prev.Subscriptiono._typename,
            // items: [...prev.Subscriptiono.items, ...fetchMoreResult.Subscriptiono.items],
            // hasMore: fetchMoreResult.Subscriptiono.hasMore,
          },
        });
      },
    });
  } */
  /* function handlePriceSort({ value }) {
    setPriceOrder(value);
    if (value.length) {
      refetch3({
        sortByPrice: value[0].value,
      });
    } else {
      refetch3({
        sortByPrice: null,
      });
    }
  }
  */
  function handleCategoryType({ value }) { 
    setType(value);
  }
  
  function handleSearch(event) {
    const value = event.currentTarget.value;  
    setSearch(value); 
  }

  function handleSelector() {
   
    setIsView(!isView); 

    if(!isView){
      setTextoView('Vista Imagen')
    }else{
      setTextoView('Vista Detalle')
    }
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

         {/*  <Col md={10} xs={12}>
            <Row>
              <Col md={6} xs={12}>
              <Select
                  options={data2 && data2.categorias}
                  labelKey="name"
                  valueKey="value"
                  placeholder="Tipo Categoría"
                  value={type}
                  searchable={false}
                  onChange={handleCategoryType} 
                />
              </Col>

              <Col md={6} xs={12}>
                <Select
                  options={selectorView}
                  labelKey="label"
                  valueKey="value"
                  placeholder={textoView}
                  searchable={false}
                  onChange={handleSelector}
                />
              </Col> 

           
            </Row>
          </Col> */}
        </Header>
        <Wrapper style={{ boxShadow: '0 0 5px rgba(0, 0 , 0, 0.05)'  }}>
            <TableWrapper>
              <StyledTable $gridTemplateColumns="minmax(120px, 50px) minmax(140px, 70px) minmax(140px, 70px) minmax(200px, auto) minmax(150px, auto) minmax(150px, max-content) minmax(150px, auto) minmax(150px, auto) minmax(150px, auto)">
                <StyledHeadCell>Logo</StyledHeadCell>
                <StyledHeadCell>ClientID</StyledHeadCell>
                <StyledHeadCell>Suscriptor</StyledHeadCell>
                <StyledHeadCell>Fecha</StyledHeadCell>
                <StyledHeadCell>Vencimiento</StyledHeadCell>
                <StyledHeadCell>Estado</StyledHeadCell>
                <StyledHeadCell>URL</StyledHeadCell>
                <StyledHeadCell>Autorizado</StyledHeadCell>
                <StyledHeadCell>Acción</StyledHeadCell>
                {data && data.info_user_view ? (
                  data.info_user_view.length ? (
                    data.info_user_view.map((item: any, index: number) => (
                        <React.Fragment key={index}>
                        
                          <StyledBodyCell>
                            <ImageWrapper>
                              <ImageRoot src={item.img_site_url !== null &&  item.img_site_url}   />
                            </ImageWrapper>
                          </StyledBodyCell>
                           <StyledBodyCell>{item.clientid}</StyledBodyCell>
                           <StyledBodyCell>{item.nombre}</StyledBodyCell>
                          <StyledBodyCell>{item.fecha_suscripcion}</StyledBodyCell>
                          <StyledBodyCell>{item.fecha_vencimiento}</StyledBodyCell>
                          <StyledBodyCell>{item.estado}</StyledBodyCell>
                          <StyledBodyCell>{item.negocio_web}</StyledBodyCell>
                          <StyledBodyCell>{item.is_negocio_web===false?'':<CheckMark />}</StyledBodyCell>
                          <StyledBodyCell>
                             {  <SubscriptionButton
                                         data={item}
                            />  }
                          </StyledBodyCell>  
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

  function Full(){
    return (<Grid fluid={true}></Grid>);
     /* return ( 
    <Grid fluid={true}>
    <Row>
      <Col md={12}>
        <Header style={{ marginBottom: 15 }}>
          <Col md={2} xs={12}>
            <Heading>Suscripciones</Heading>
          </Col>

          <Col md={10} xs={12}>
            <Row>
              <Col md={6} xs={12}>
                <Select
                  options={data2 && data2.categorias}
                  labelKey="name"
                  valueKey="value"
                  placeholder="Tipo Categoría"
                  value={type}
                  searchable={false}
                  onChange={handleCategoryType} 
                />
              </Col>

              <Col md={6} xs={12}>
                <Select
                  options={selectorView}
                  labelKey="label"
                  valueKey="value"
                  placeholder={textoView}
                  searchable={false}
                  onChange={handleSelector}
                />
              </Col> 
            </Row>
          </Col>
        </Header>

     <Row>
          {data? (
            data.Subscriptiono.length !== 0 ? (
              data.Subscriptiono.map((item: any, index: number) => (
               
                <Col
                  md={4}
                  lg={3}
                  sm={6}
                  xs={12}
                  key={index}
                  style={{ margin: '15px 0' }}
                >
                   
                  <Fade bottom duration={800} delay={index * 10}>
                    <SubscriptionCard
                      orderId={item.id}
                      sku={item.sku}
                      clientid={item.clientid}
                      category={item.categorias[0].value}
                      title={item.nombre}
                      descripcion={item.descripcion}
                      weight={item.unidad}
                      image={item.gallery !== null &&  item.gallery.length > 0 ? item.gallery.split(",")[0] : item.imageURL}
                      currency={CURRENCY}
                      price={item.precio}
                      salePrice={item.precio_venta}
                      discountInPercent={item.descuento} 
                      data={item}
                    />
                  </Fade>
                </Col>
              ))
            ) : (
              <NoResult />
            )
          ) : (
            <LoaderWrapper>
              <LoaderItem>
                <Placeholder />
              </LoaderItem>
              <LoaderItem>
                <Placeholder />
              </LoaderItem>
              <LoaderItem>
                <Placeholder />
              </LoaderItem>
              <LoaderItem>
                <Placeholder />
              </LoaderItem>
            </LoaderWrapper>
          )}
        </Row>  
      </Col>
    </Row>
  </Grid>
  
    ); */
  } 

  function DisplaySubscription(){

   if(!isView){
      return <Full />
   } else
    {
     return  <Detail />
    }
  }
  return (
   <>
     
        <DisplaySubscription/>

   </>

  );
}