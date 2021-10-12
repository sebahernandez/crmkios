import React, { useCallback,useState } from 'react';
import { styled, withStyle } from 'baseui'; 
import { Grid, Row as Rows, Col as Column } from 'components/FlexBox/FlexBox';
import Input from 'components/Input/Input'; 
import { gql, useSubscription } from '@apollo/client';
import Moment from 'react-moment';
import 'moment-timezone';
import { Wrapper,Header, Heading } from 'components/Wrapper.style'; 
import CuponButton from 'components/CuponCard/CuponButton';
import { Plus } from 'assets/icons/PlusMinus';
import NoResult from 'components/NoResult/NoResult'; 
import Button from 'components/Button/Button';
import { useDrawerDispatch } from 'context/DrawerContext'; 
import Cookies  from 'universal-cookie';
import {
  TableWrapper,
  StyledTable,
  StyledHeadCell,
  StyledBodyCell,
} from '../Customers/Customers.style'; 



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

const GET_COUPONS = gql`
  subscription getCoupons($clientid: String!,$searchText: String!) {
    cupon (where: {clientid: {_eq: $clientid}, titulo:{_like: $searchText}}) {
      id
      clientid
      image
      titulo
      code
      cupones_usados
      numero_cupon
      creacion
      estado
      discount 
    }
  }
`;

export default function Coupons() {
  const cookie = new Cookies() 
  const clientid = cookie.get('suscriptor').clientid
  const dispatch = useDrawerDispatch(); 
  const openDrawer = useCallback(
    () => dispatch({ type: 'OPEN_DRAWER', drawerComponent: 'CAMPAING_FORM' }),
    [dispatch]
  );
   const [search, setSearch] = useState(''); 

  
  const { data,error } = useSubscription(GET_COUPONS,{
    variables: { clientid:clientid,
                 searchText: '%'+search+'%'
                }
  });
 
  function handleSearch(event) {
    const value = event.currentTarget.value;
    setSearch(value); 
  }

   

  function Detail(){

  return (
    <Grid fluid={true} >
    <Row>
      <Col md={12}>
      <Header style={{ marginBottom: 15 }}>
          <Col md={2} xs={12}>
            <Heading>Cupones</Heading>
          </Col>

          <Col md={10} xs={12}>
            <Row>
              <Col md={6} xs={12}>
                <Input
                  value={search}
                  placeholder="Ex: Buscar por nombre"
                   onChange={handleSearch} 
                />
              </Col>
              <Col md={4}>
                  <Button
                    onClick={openDrawer}
                    startEnhancer={() => <Plus />}
                    overrides={{
                      BaseButton: {
                        style: ({ $theme, $size, $shape }) => {
                          return {
                            width: '100%',
                            borderTopLeftRadius: '3px',
                            borderTopRightRadius: '3px',
                            borderBottomLeftRadius: '3px',
                            borderBottomRightRadius: '3px',
                          };
                        },
                      },
                    }}
                  >
                    Crear Campaña
                  </Button>
                </Col>
            </Row>
          </Col>
        </Header>
        <Wrapper style={{ boxShadow: '0 0 5px rgba(0, 0 , 0, 0.05)' }}>
            <TableWrapper>
              <StyledTable $gridTemplateColumns=" minmax(150px, 70px) minmax(300px, 70px) minmax(100px, auto) minmax(50px, auto) minmax(50px, max-content) minmax(150px, auto) minmax(150px, auto) minmax(150px, auto)">
                <StyledHeadCell>Imagen</StyledHeadCell>
                <StyledHeadCell>Nombre Campaña</StyledHeadCell>
                <StyledHeadCell>Código</StyledHeadCell>
                <StyledHeadCell>Dscto.</StyledHeadCell>
                <StyledHeadCell>Usados</StyledHeadCell>
                <StyledHeadCell>Nro.Cupones</StyledHeadCell>
                <StyledHeadCell>Creación</StyledHeadCell>
                <StyledHeadCell>Acción</StyledHeadCell>


                {data && data.cupon ? (
                  data.cupon.length ? (
                    data.cupon.map((item: any, index: number) => (
                        <React.Fragment key={index}> 
                          <StyledBodyCell>
                            <ImageWrapper className="img-cupon">
                              <Image  src={item.image} alt={item.titulo} />
                            </ImageWrapper>
                          </StyledBodyCell>
                          <StyledBodyCell>{item.titulo}</StyledBodyCell>
                          <StyledBodyCell>{item.code}</StyledBodyCell>
                          <StyledBodyCell>{item.discount}%</StyledBodyCell>
                          <StyledBodyCell>{item.cupones_usados}</StyledBodyCell>
                          <StyledBodyCell>{item.numero_cupon}</StyledBodyCell>
                          <StyledBodyCell><Moment format="DD/MM/YYYY">{item.creacion}</Moment></StyledBodyCell>
                          <StyledBodyCell>
                           <CuponButton
                                  id={item.id}
                                  clientid={item.clientid}
                                  titulo={item.titulo}
                                  code={item.code}
                                  discount={item.discount}
                                  cupones_usados={item.cupones_usados}
                                  numero_cupon={item.numero_cupon}
                                  image={item.image} 
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


  function DisplayProduct(){

     return  <Detail />
  }
  return (
   <>
     
        <DisplayProduct/>

   </>

  );
}