import React, { useState } from 'react';
import { styled, withStyle, createThemedUseStyletron } from 'baseui';
import dayjs from 'dayjs';
import { Grid, Row as Rows, Col as Column } from 'components/FlexBox/FlexBox';
import Select from 'components/Select/Select';
import Input from 'components/Input/Input';

import { FormFields, FormLabel } from 'components/FormFields/FormFields';
import { useQuery, gql } from '@apollo/client';
import { Wrapper, Header, Heading } from 'components/Wrapper.style';
import Checkbox from 'components/CheckBox/CheckBox';

import {
  TableWrapper,
  StyledTable,
  StyledHeadCell,
  StyledCell,
} from './Orders.style';
import NoResult from 'components/NoResult/NoResult';

const GET_ORDERS = gql`
  query getOrders($clientid: String!,$searchText: String!) {
    pedido (where: {clientid: {_eq: $clientid}, delivery_address: {_like: $searchText}}, order_by: {creation_date: desc}) {
      id
      cliente
      creation_date
      delivery_address
      total
      metodo_pago
      contacto
      estado
      status
      order
    }
  }
`;

type CustomThemeT = { red400: string; textNormal: string; colors: any };
const themedUseStyletron = createThemedUseStyletron<CustomThemeT>();

const Status = styled('div', ({ $theme }) => ({
  ...$theme.typography.fontBold14,
  color: $theme.colors.textDark,
  display: 'flex',
  alignItems: 'center',
  lineHeight: '1',
  textTransform: 'capitalize',

  ':before': {
    content: '""',
    width: '10px',
    height: '10px',
    display: 'inline-block',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    borderBottomRightRadius: '10px',
    borderBottomLeftRadius: '10px',
    backgroundColor: $theme.borders.borderE6,
    marginRight: '10px',
  },
}));

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

const statusSelectOptions = [
  { value: 'Todos', label: 'Todos' },
  { value: 'Recibida', label: 'Recibida' },
  { value: 'En Ruta', label: 'En Ruta' },
  { value: 'Por Entregar', label: 'Por Entregar' },
  { value: 'En Preparacion', label: 'En Preparacion' },
  { value: 'Cancelado', label: 'Cancelado' },
];
const limitSelectOptions = [
  { value: 7, label: 'últimos 7 pedidos' },
  { value: 15, label: 'últimos15 pedidos' },
  { value: 30, label: 'últimos 30 pedidos' },
];

export default function Orders({clientid}) {
  const [checkedId, setCheckedId] = useState([]);
  const [checked, setChecked] = useState(false);

  const [useCss, theme] = themedUseStyletron();
  const sent = useCss({
    ':before': {
      content: '""',
      backgroundColor: theme.colors.primary,
    },
  });
  const failed = useCss({
    ':before': {
      content: '""',
      backgroundColor: theme.colors.red400,
    },
  });
  const processing = useCss({
    ':before': {
      content: '""',
      backgroundColor: theme.colors.textNormal,
    },
  });
  const paid = useCss({
    ':before': {
      content: '""',
      backgroundColor: theme.colors.blue400,
    },
  });

  const [estado, setEstado] = useState([{ value: 'Entregado', label: 'Entregado' }]);
  const [limit, setLimit] = useState([]);
  const [tag, setTag] = useState([]);
  const [search, setSearch] = useState('');

  const { data, error, refetch } = useQuery(GET_ORDERS, {
    variables: {
      clientid: sessionStorage.getItem('clientid'),
      searchText: '%'+search+'%' 
    },
  });

  if (error) {
    return <div>Error! {error.message}</div>;
  }

 

  function handleLimite({ value }) {
    setLimit(value);
    
  }
  function handleSearch(event) {
    const { value } = event.currentTarget;
    setSearch(value);
    
  }
  function onAllCheck(event) {
    if (event.target.checked) {
      const idx = data && data.orders.map((order) => order.id);
      setCheckedId(idx);
    } else {
      setCheckedId([]);
    }
    setChecked(event.target.checked);
  }
  const handleMultiChange = ({ value }) => {
    
    setTag(value);
  }
  function handleCheckbox(event) {
    const { name } = event.currentTarget;
    if (!checkedId.includes(name)) {
      setCheckedId((prevState) => [...prevState, name]);
    } else {
      setCheckedId((prevState) => prevState.filter((id) => id !== name));
    }
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
