import React, { useCallback, useState } from 'react';
import dayjs from 'dayjs';
import { withStyle, createThemedUseStyletron } from 'baseui';
import { Grid, Row as Rows, Col as Column } from 'components/FlexBox/FlexBox';
import { useDrawerDispatch } from 'context/DrawerContext';
import ProgressBar from 'components/ProgressBar/ProgressBar';

import Select from 'components/Select/Select';
import Input from 'components/Input/Input';
import Button from 'components/Button/Button';

import { Plus } from 'assets/icons/PlusMinus';
import { useQuery, gql } from '@apollo/client';
import { Wrapper, Header, Heading } from 'components/Wrapper.style';
import Checkbox from 'components/CheckBox/CheckBox';

import {
  TableWrapper,
  StyledTable,
  StyledHeadCell,
  StyledBodyCell,
  ProgressWrapper,
  ProgressText,
  Status,
} from './Coupon.style';
import NoResult from 'components/NoResult/NoResult';

const GET_COUPONS = gql`
  query getCoupons($clientid: String!,$searchText: String!) {
    cupon (where: {clientid: {_eq: $clientid}, titulo:{_like: $searchText}}) {
      id
      titulo
      codigo
      cupones_usados
      numero_cupon
      expiracion
      creacion
      estado
    }
  }
`;

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

const statusSelectOptions = [
  { value: 'activo', label: 'Activo' },
  { value: 'terminado', label: 'Terminado' },
];

export default function Coupons({clientid}) {
  const dispatch = useDrawerDispatch();
  const [checkedId, setCheckedId] = useState([]);
  const [checked, setChecked] = useState(false);

  const openDrawer = useCallback(
    () => dispatch({ type: 'OPEN_DRAWER', drawerComponent: 'CAMPAING_FORM' }),
    [dispatch]
  );
  const [status, setStatus] = useState([]);
  const [search, setSearch] = useState('');
  const [useCss, theme] = themedUseStyletron();
  const active = useCss({
    ':before': {
      content: '""',
      backgroundColor: theme.colors.primary,
    },
  });
  const revoked = useCss({
    ':before': {
      content: '""',
      backgroundColor: theme.colors.red400,
    },
  });

  const { data:data1, error, refetch } = useQuery(GET_COUPONS,{
    variables: { clientid: sessionStorage.getItem('clientid'),
                 searchText: '%'+search+'%'
                }
  });
  
  if (error) {
    return <div>Error! {error.message}</div>;
  }

  function handleSelect({ value }) {
    setStatus(value);
    if (value.length) {
      
    } 
  }

  function handleSearch(event) {
    const value = event.currentTarget.value;

    setSearch(value);
 
  } 

  const numberToPercent = (num, total) => {
    return (num * 100) / total;
  };

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
              <Heading>Campañas</Heading>
            </Col>

            <Col md={10}>
              <Row>
                <Col md={3}>
                  <Select
                    options={statusSelectOptions}
                    labelKey="label"
                    valueKey="value"
                    placeholder="Estado"
                    value={status}
                    searchable={false}
                    onChange={handleSelect}
                  />
                </Col>

                <Col md={5}>
                  <Input
                    value={search}
                    placeholder="Ex: Búsqueda por Nombre"
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
                    Crear Campaña
                  </Button>
                </Col>
              </Row>
            </Col>
          </Header>

          <Wrapper style={{ boxShadow: '0 0 5px rgba(0, 0 , 0, 0.05)' }}>
            <TableWrapper>
              <StyledTable $gridTemplateColumns="minmax(70px, 70px) minmax(200px, auto) minmax(200px, auto) minmax(200px, max-content) minmax(150px, auto) minmax(150px, auto) minmax(150px, auto)">
                 <StyledHeadCell>ID</StyledHeadCell>
                <StyledHeadCell>Nombre Campaña</StyledHeadCell>
                <StyledHeadCell>Código</StyledHeadCell>
                <StyledHeadCell>Cupón restante</StyledHeadCell>
                <StyledHeadCell>Caducidad</StyledHeadCell>
                <StyledHeadCell>Creación</StyledHeadCell>
                <StyledHeadCell>Estado</StyledHeadCell>

                {data1 && data1.cupon ? (
                  data1.cupon.length ? (
                    data1.cupon
                      .map((item) => Object.values(item))
                      .map((row, index) => {
                        return (
                          <React.Fragment key={index}>
                            
                            <StyledBodyCell>{row[1]}</StyledBodyCell>
                            <StyledBodyCell>{row[2]}</StyledBodyCell>
                            <StyledBodyCell>{row[3]}</StyledBodyCell>
                            <StyledBodyCell>
                              <ProgressWrapper>
                                <ProgressBar
                                  value={numberToPercent(row[4], row[5])}
                                  successValue={100}
                                  overrides={{
                                    Bar: {
                                      style: () => {
                                        return {
                                          backgroundColor: '#F2F2F2',
                                          marginLeft: '0px',
                                          marginRight: '0px',
                                          height: '4px',
                                          borderTopLeftRadius: '5px',
                                          borderTopRightRadius: '5px',
                                          borderBottomLeftRadius: '5px',
                                          borderBottomRightRadius: '5px',
                                          position: 'relative',
                                        };
                                      },
                                    },
                                    BarProgress: {
                                      style: ({ $theme }) => {
                                        return {
                                          backgroundColor:
                                            $theme.colors.primary,
                                          borderTopLeftRadius: '5px',
                                          borderTopRightRadius: '5px',
                                          borderBottomLeftRadius: '5px',
                                          borderBottomRightRadius: '5px',
                                        };
                                      },
                                    },
                                  }}
                                />

                                <ProgressText>{`${row[4] ? row[4] : 0} of ${
                                  row[5]
                                } codes remaining`}</ProgressText>
                              </ProgressWrapper>
                            </StyledBodyCell>
                            <StyledBodyCell>
                              {dayjs(row[6]).format('DD MMM YYYY')}
                            </StyledBodyCell>
                            <StyledBodyCell>
                              {dayjs(row[7]).format('DD MMM YYYY')}
                            </StyledBodyCell>
                            <StyledBodyCell>
                              <Status
                                className={
                                  row[8] === 'active'
                                    ? active
                                    : row[8] === 'revoked'
                                    ? revoked
                                    : ''
                                }
                              >
                                {row[8]}
                              </Status>
                            </StyledBodyCell>
                          </React.Fragment>
                        );
                      })
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
