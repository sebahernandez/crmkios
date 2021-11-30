import React, { useEffect, useState } from 'react';
import { styled, withStyle } from 'baseui'; 
import { Grid, Row as Rows, Col as Column } from 'components/FlexBox/FlexBox';
import Select from 'components/Select/Select';
import { useSubscription, gql } from '@apollo/client';
import { Wrapper,Header, Heading } from 'components/Wrapper.style';
import Fade from 'react-reveal/Fade';
import ProductCard from 'components/ProductCard/ProductCard';
import ProductButton from 'components/ProductCard/ProductButton';
import NoResult from 'components/NoResult/NoResult';
import { CURRENCY } from 'settings/constants'; 
import Placeholder from 'components/Placeholder/Placeholder'; 
import Cookies  from 'universal-cookie';
import { GET_CATEGORIAS, GET_PRODUCTS_X_CATEGORIA } from 'utils/graphql/query/categories.query';



import {
  TableWrapper,
  StyledTable,
  StyledHeadCell,
  StyledBodyCell,
} from './../Customers/Customers.style'; 

export const ProductsRow = styled('div', ({ $theme }) => ({
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

export const ProductCardWrapper = styled('div', () => ({
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
const selectorView = [
  { value: true, label: 'Vista Imagen' },
  { value: false, label: 'Vista Detalle' },
];

export default function Products() {
  const cookie = new Cookies() 
  const clientid = cookie.get('suscriptor').clientid

  // tipo de producto / categoria
  const [type, setType] = useState([]); 
  const [isView, setIsView] = useState(true);
  const [textoView, setTextoView] = useState('Vista Imagen');

  // seach text
  const [search, setSearch] = useState(''); 

  
  // lista de productos totales x clientid
  const { data:data1, error:error1 } = useSubscription(GET_PRODUCTS_X_CATEGORIA,
    {
      variables: {
        clientid: clientid, 
        idcategoria: type.length > 0 ? type[0].id:0        
      }
    });
 

  // lista de categorias x clientid
  const { data:data2, error:error2 } = useSubscription(GET_CATEGORIAS,
    {
      variables: {clientid}
    });
    

    useEffect(()=> {
      if(data1)console.log('data1',data1)
      if(data2)console.log('data2',data2)
    },[])
  // lista de productos x categoria x clientid + ordenados asc desc price  
  
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
        offset: data1.producto.length,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        toggleLoading(false);
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          producto: {
            // _typename: prev.producto._typename,
            // items: [...prev.producto.items, ...fetchMoreResult.producto.items],
            // hasMore: fetchMoreResult.producto.hasMore,
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
          <Col md={2} xs={12}>
            <Heading>Productos</Heading>
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
        <Wrapper style={{ boxShadow: '0 0 5px rgba(0, 0 , 0, 0.05)' }}>
            <TableWrapper>
              <StyledTable $gridTemplateColumns="minmax(70px, 70px) minmax(140px, 70px) minmax(140px, 70px) minmax(200px, auto) minmax(150px, auto) minmax(150px, max-content) minmax(150px, auto) minmax(150px, auto)">
                <StyledHeadCell>ID1</StyledHeadCell>
                <StyledHeadCell>SKU</StyledHeadCell>
                <StyledHeadCell>Imagen</StyledHeadCell>
                <StyledHeadCell>Nombre</StyledHeadCell>
                <StyledHeadCell>Categoría</StyledHeadCell>
                <StyledHeadCell>Precio</StyledHeadCell>
                <StyledHeadCell>Descuento</StyledHeadCell>
                <StyledHeadCell>Acción</StyledHeadCell>
                {data1 ? (console.log('pico')):('')}
                {data1 && data1.producto ? (
                  data1.producto.length ? (
                    data1.producto.map((item: any, index: number) => (
                        <React.Fragment key={index}>
                        
                           <StyledBodyCell>{item.id}</StyledBodyCell>
                           <StyledBodyCell>{item.sku}</StyledBodyCell>
                          <StyledBodyCell>
                            <ImageWrapper>
                              <Image src={item.gallery !== null &&  item.gallery.length > 0 ? item.gallery.split(",")[0] : item.imageURL} alt={item.nombre} />
                            </ImageWrapper>
                          </StyledBodyCell>
                          <StyledBodyCell>{item.nombre}</StyledBodyCell>
                          <StyledBodyCell>{item.categorias[0].name}</StyledBodyCell>
                          <StyledBodyCell>${item.precio}</StyledBodyCell>
                          <StyledBodyCell>${item.descuento}</StyledBodyCell>
                          <StyledBodyCell>
                              <ProductButton
                                  orderId={item.id}
                                  clientid={item.clientid}
                                  category={item.categorias[0].value}
                                  title={item.nombre}
                                  descripcion={item.descripcion}
                                  weight={item.unidad}
                                  image={item.imageURL}
                                  gallery={item.gallery}
                                  currency={CURRENCY}
                                  price={item.precio}
                                  salePrice={item.precio_venta}
                                  discountInPercent={item.descuento} 
                                  data={item}
                            />
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

     return ( 
    <Grid fluid={true}>
    <Row>
      <Col md={12}>
        <Header style={{ marginBottom: 15 }}>
          <Col md={2} xs={12}>
            <Heading>Productos</Heading>
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
          {data1? (
            data1.producto.length !== 0 ? (
              data1.producto.map((item: any, index: number) => (
               
                <Col
                  md={4}
                  lg={3}
                  sm={6}
                  xs={12}
                  key={index}
                  style={{ margin: '15px 0' }}
                >
                   
                  <Fade bottom duration={800} delay={index * 10}>
                    <ProductCard
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
      {/*   {data1 !== null && data1.producto !== null && data1.products && data1.products.hasMore && (
          <Row>
            <Col
              md={12}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
               <Button onClick={loadMore} isLoading={loadingMore}>
                Cargar Más...
              </Button>               </Col>
          </Row>
        )} */}
      </Col>
    </Row>
  </Grid>
  
    );
  } 

  function DisplayProduct(){

   if(isView){
      return <Full />
   }else
    {
     return  <Detail />
    }
  }
  return (
   <>
     
        <DisplayProduct/>

   </>

  );
}