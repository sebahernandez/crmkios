import React, { useState } from 'react';
import { withStyle } from 'baseui';
import dayjs from 'dayjs';
import { Grid, Row as Rows, Col as Column } from 'components/FlexBox/FlexBox'; 
import Input from 'components/Input/Input'; 
import { useQuery } from '@apollo/client';
import { Wrapper, Header, Heading } from 'components/Wrapper.style'; 
import Cookies  from 'universal-cookie';
import { GET_ORDERS } from 'utils/graphql/query/orders.query';

import {
  TableWrapper,
  StyledTable,
  StyledHeadCell,
  StyledCell,
} from './Orders.style';
import NoResult from 'components/NoResult/NoResult';


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
 

export default function Orders() { 
  const cookie = new Cookies() 
  const clientid = cookie.get('clientid')
  const [search, setSearch] = useState('');

  const { data, error } = useQuery(GET_ORDERS, {
    variables: {
      clientid: clientid,
      searchText: '%'+search+'%' 
    },
  });

  if (error) {
    return <div>Error! {error.message}</div>;
  }
  
  function handleSearch(event) {
    const { value } = event.currentTarget;
    setSearch(value);
    
  }
 
 

  return (
    <Grid fluid={true}>
      <Row>
        <Col md={12}>
          <Header
            style={{
              marginBottom: 30,
              boxShadow: '0 0 8px rgba(0, 0 ,0, 0.1)',
            }}
          >
            <Col md={3} xs={12}>
              <Heading>Pedidos</Heading>
            </Col>

            <Col md={9} xs={12}>
              <Row>
                 
{/* 
                <Col md={3} xs={12}>
                  <Select
                    options={limitSelectOptions}
                    labelKey="label"
                    valueKey="value"
                    value={limit}
                    placeholder="Límites de pedidos"
                    searchable={false}
                    onChange={handleLimite}
                  />
                </Col> */}

                <Col md={6} xs={12}>
                  <Input
                    value={search}
                    placeholder="Ex:Buscar por dirección"
                    onChange={handleSearch}
                    clearable
                  />
                </Col>
              </Row>
            </Col>
          </Header>

          <Wrapper style={{ boxShadow: '0 0 5px rgba(0, 0 , 0, 0.05)' }}>
            <TableWrapper>
              <StyledTable $gridTemplateColumns="minmax(150px, 50px)  minmax(200px, auto) minmax(100px, max-content) minmax(150px, auto) minmax(150px, auto) minmax(150px, auto) minmax(80px, auto)">
                
                <StyledHeadCell>Órden</StyledHeadCell>               
                <StyledHeadCell>Dirección de entrega</StyledHeadCell>
                <StyledHeadCell>Monto</StyledHeadCell>
                <StyledHeadCell>Método de pago</StyledHeadCell>
                <StyledHeadCell>Contacto</StyledHeadCell>
                <StyledHeadCell>Estado</StyledHeadCell>
                <StyledHeadCell>Hora</StyledHeadCell>                

                {data && data.pedido ? (
                  data.pedido.length ? (
                    data.pedido
                      .map((item) => Object.values(item))
                      .map((row, index) => (
                        <React.Fragment key={index}>
                         
                          <StyledCell >{row[10]}</StyledCell>
                          <StyledCell>{row[4]}</StyledCell>
                          <StyledCell style={{ align: 'right' }}>${row[5]}</StyledCell>
                          <StyledCell style={{ justifyContent: 'center' }}>{row[6]}</StyledCell>
                          <StyledCell>{row[7]}</StyledCell>
                         
                            <StyledCell style={{ justifyContent: 'center' }}>
                            {row[8]} 
                            </StyledCell>
                            <StyledCell>
                            {dayjs(row[3]).format('DD MMM YYYY HH:mm:ss')}
                          </StyledCell>
                          
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
