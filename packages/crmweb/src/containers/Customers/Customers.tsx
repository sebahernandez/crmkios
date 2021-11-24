import React, { useState } from 'react';
import dayjs from 'dayjs';
import { styled, withStyle } from 'baseui';
import { Grid, Row as Rows, Col as Column } from 'components/FlexBox/FlexBox';
import Input from 'components/Input/Input';
import Select from 'components/Select/Select';
import { useQuery, gql } from '@apollo/client';
import { Wrapper, Header, Heading } from 'components/Wrapper.style';
import Cookies  from 'universal-cookie';

import {
  TableWrapper,
  StyledTable,
  StyledHeadCell,
  StyledBodyCell,
} from './Customers.style';
import NoResult from 'components/NoResult/NoResult';

const GET_CUSTOMERS = gql`
  query getClientes($clientid: String!,$searchText: String!) {
    cliente (where: {clientid: {_eq: $clientid}, nombre: {_like: $searchText} }) {
      id
      imageURL
      nombre
      contacto
      cantidad_orden
      total_orden
      creacion_date
    }
  }
`;

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

const ImageWrapper = styled('div', ({ $theme }) => ({
  width: '38px',
  height: '38px',
  overflow: 'hidden',
  display: 'inline-block',
  borderTopLeftRadius: '20px',
  borderTopRightRadius: '20px',
  borderBottomRightRadius: '20px',
  borderBottomLeftRadius: '20px',
  backgroundColor: $theme.colors.backgroundF7,
}));

const Image = styled('img', () => ({
  width: '100%',
  height: 'auto',
}));

const sortByOptions = [
  { value: 'highestToLowest', label: 'De mayor a menor' },
  { value: 'lowestToHighest', label: 'De menor a mayor' },
];

export default function Customers() {
  const cookie = new Cookies() 
  const clientid = cookie.get('suscriptor').clientid
  const [stock, setStock] = useState([]);
  const [search, setSearch] = useState('');


  let { data:data1, error } = useQuery(GET_CUSTOMERS, {
    variables: {
      clientid: clientid,
      searchText: '%'+search+'%',
    },
  });
  if (error) {
    return <div>Error! {error.message}</div>;
  }

  function handleSort({ value }) {
    setStock(value);
    
  }
  function handleSearch(event) { 
    const value = event.currentTarget.value;

    setSearch(value);
  }
  console.log(data1, 'data');

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
            <Col md={3}>
              <Heading>Clientes</Heading>
            </Col>

            <Col md={9}>
              <Row>
                <Col md={9}>
                  <Input
                    value={search}
                    placeholder="Buscar por nombre"
                    onChange={handleSearch}
                    clearable
                  />
                </Col>

                <Col md={3}>
                  <Select
                    options={sortByOptions}
                    labelKey="label"
                    valueKey="value"
                    placeholder="Total de la orden"
                    value={stock}
                    searchable={false}
                    onChange={handleSort}
                  />
                </Col>
              </Row>
            </Col>
          </Header>

          <Wrapper style={{ boxShadow: '0 0 5px rgba(0, 0 , 0, 0.05)' }}>
            <TableWrapper>
              <StyledTable $gridTemplateColumns="minmax(70px, 70px) minmax(70px, 70px) minmax(200px, auto) minmax(150px, auto) minmax(150px, max-content) minmax(150px, auto) minmax(150px, auto)">
                <StyledHeadCell>ID</StyledHeadCell>
                <StyledHeadCell>Imagen</StyledHeadCell>
                <StyledHeadCell>Nombre</StyledHeadCell>
                <StyledHeadCell>Contactos</StyledHeadCell>
                <StyledHeadCell>Cantidad Pedidos</StyledHeadCell>
                <StyledHeadCell>Total</StyledHeadCell>
                <StyledHeadCell>Ingreso</StyledHeadCell>

                {data1 && data1.cliente ? (
                  data1.cliente.length ? (
                    data1.cliente.map((item) => Object.values(item)).map((row, index) => (
                        <React.Fragment key={index}>
                          <StyledBodyCell>{row[1]}</StyledBodyCell>
                          <StyledBodyCell>
                            <ImageWrapper>
                              <Image src={row[2]} alt={row[3]} />
                            </ImageWrapper>
                          </StyledBodyCell>
                          <StyledBodyCell>{row[3]}</StyledBodyCell>
                          <StyledBodyCell>{row[4]}</StyledBodyCell>
                          <StyledBodyCell>{row[5]}</StyledBodyCell>
                          <StyledBodyCell>${row[6]}</StyledBodyCell>
                          <StyledBodyCell>
                            {dayjs(row[6]).format('DD MMM YYYY')}
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
