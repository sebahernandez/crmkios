import React, { useCallback, useState } from 'react';
import { styled, withStyle, createThemedUseStyletron } from 'baseui';
import { Grid, Row as Rows, Col as Column } from 'components/FlexBox/FlexBox';
import { useDrawerDispatch } from 'context/DrawerContext'; 
import Input from 'components/Input/Input';
import Button from 'components/Button/Button';
import Cookies  from 'universal-cookie';
import { Plus } from 'assets/icons/PlusMinus';
import { useSubscription } from '@apollo/client';
import { Wrapper, Header, Heading } from 'components/Wrapper.style'; 
import { GET_CATEGORIAS_SEARCH } from 'utils/graphql/query/categories.query';


import {
  TableWrapper,
  StyledTable,
  StyledHeadCell,
  StyledBodyCell,

} from './Category.style';
import NoResult from 'components/NoResult/NoResult';
import CategoryButton from './CategoryButton';



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

type CustomThemeT = { red400: string; textNormal: string; colors: any };
const themedUseStyletron = createThemedUseStyletron<CustomThemeT>();

const Col = withStyle(Column, () => ({
  '@media only screen and (max-width: 767px)': {
    marginBottom: '20px',

    ':last-child': {
      marginBottom: 0,
    },
  },
}));

const Row = withStyle(Rows, () => ({
  '@media only screen and (min-width: 768px)': {
    alignItems: 'center',
  },
}));

export default function Category() {
  const cookie = new Cookies() 
  const clientid = cookie.get('clientid') 
  const dispatch = useDrawerDispatch(); 

  const openDrawer = useCallback(
    () => dispatch({ type: 'OPEN_DRAWER', drawerComponent: 'CATEGORY_FORM' }),
    [dispatch]
  ); 
  const [search, setSearch] = useState('');  
  const {  error, data } =  useSubscription(GET_CATEGORIAS_SEARCH, {
      variables: {
        clientid: clientid,
        searchText: '%'+search+'%'
      },
  });

  if (error) {
    return <div>Error! {error.message}</div>;
  }
  

  function handleSearch(event) {
    const value = event.currentTarget.value;
    setSearch(value); 
    
  }
 

  
  return (
    <Grid fluid={true}>
      <Row>
        <Col md={12}>
          <Header
            style={{
              marginBottom: 30,
              boxShadow: '0 0 5px rgba(0, 0 ,0, 0.05)',
            }}
          >
            <Col md={2}>
            <Heading>Categorías</Heading>
            </Col>

            <Col md={10}>
              <Row>
                <Col md={8}>
                  <Input
                    value={search}
                    placeholder="Búsqueda por nombre"
                    onChange={handleSearch}
                    clearable
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
                    Crear Categoría
                  </Button>
                </Col>
              </Row>
            </Col>
          </Header>

          <Wrapper style={{ boxShadow: '0 0 5px rgba(0, 0 , 0, 0.05)' }}>
            <TableWrapper>
              <StyledTable $gridTemplateColumns="minmax(70px, 70px) minmax(170px, 70px) minmax(200px, 70px) minmax(200px, 70px) minmax(200px, auto)">
                 
                <StyledHeadCell>ID</StyledHeadCell>
                <StyledHeadCell>Imagen</StyledHeadCell>
                <StyledHeadCell>Nombre Categoría</StyledHeadCell>
                <StyledHeadCell>Descripción Categoría</StyledHeadCell>
                <StyledHeadCell>Acción</StyledHeadCell>


                
                {data && data.categorias ? (
                    data.categorias.length ? (
                      data.categorias.map((item: any, index: number) => (
                          <React.Fragment key={index}>
                            <StyledBodyCell>{item.id}</StyledBodyCell>
                            <StyledBodyCell>
                              <ImageWrapper>
                                <Image src={item.imageURL} />
                              </ImageWrapper>
                            </StyledBodyCell>
                            <StyledBodyCell>{item.name}</StyledBodyCell>
                            <StyledBodyCell>{item.value}</StyledBodyCell>
                            <StyledBodyCell>
                              <CategoryButton
                                  id={item.id}
                                  clientid={item.clientid}
                                  imageURL={item.imageURL}
                                  name={item.name}
                                  value={item.value}  
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
