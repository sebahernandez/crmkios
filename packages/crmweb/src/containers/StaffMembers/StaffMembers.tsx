import React, { useCallback, useState } from 'react';
import dayjs from 'dayjs';
import { Grid, Row as Rows, Col as Column } from 'components/FlexBox/FlexBox';
import { useDrawerDispatch } from 'context/DrawerContext'; 
import { styled, withStyle } from 'baseui';
import Input from 'components/Input/Input';
import Button from 'components/Button/Button'; 
import { Plus } from 'assets/icons/PlusMinus'; 
import { useQuery, gql } from '@apollo/client'; 
import { Wrapper, Header, Heading } from 'components/Wrapper.style';

import {
  TableWrapper,
  StyledTable,
  StyledHeadCell,
  StyledBodyCell,
} from './StaffMembers.style';
import NoResult from 'components/NoResult/NoResult';

const GET_STAFFS = gql`
  query getEmpleados($clientid: String!,$searchText: String! ) {
    empleado (where: {clientid: {_eq: $clientid}, nombre: {_like: $searchText} }) {
      id
      nombre
      paterno
      materno
      rol
      telefono
      email
      creation_date
      estado
      image_url
      clientid
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
 



export default function StaffMembers({clientid}) {
  const dispatch = useDrawerDispatch();

  const openDrawer = useCallback(
    () =>
      dispatch({ type: 'OPEN_DRAWER', drawerComponent: 'STAFF_MEMBER_FORM' }),
    [dispatch]
  ); 
  const [search, setSearch] = useState('');

  const { data, error } = useQuery(GET_STAFFS, {
    variables: {
      clientid: clientid,
      searchText: '%'+search+'%'
    }});

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
              marginBottom: 40,
              boxShadow: '0 0 5px rgba(0, 0 ,0, 0.05)',
            }}
          >
            <Col md={3} xs={12}>
              <Heading>Empleados</Heading>
            </Col>

            <Col md={9} xs={12}>
              <Row>
                
                <Col md={8} xs={12}>
                  <Input
                    value={search}
                    placeholder="Ex:Búsqueda rápida por nombre"
                    onChange={handleSearch}
                    clearable
                  />
                </Col>

                <Col md={4} xs={12}>
                  <Button
                    onClick={openDrawer}
                    startEnhancer={() => <Plus />}
                    overrides={{
                      BaseButton: {
                        style: () => ({
                          width: '100%',
                          borderTopLeftRadius: '3px',
                          borderTopRightRadius: '3px',
                          borderBottomLeftRadius: '3px',
                          borderBottomRightRadius: '3px',
                        }),
                      },
                    }}
                  >
                    Agregar Empleado
                  </Button>
                </Col>
              </Row>
            </Col>
          </Header>

          <Wrapper style={{ boxShadow: '0 0 5px rgba(0, 0 , 0, 0.05)' }}>
            <TableWrapper>
              <StyledTable $gridTemplateColumns="minmax(70px, 70px) minmax(120px, max-content)  minmax(270px, max-content) minmax(270px, max-content) minmax(150px, max-content) minmax(150px, auto) minmax(150px, auto)">
                <StyledHeadCell>ID</StyledHeadCell>
                <StyledHeadCell>Imagen</StyledHeadCell>
                <StyledHeadCell>Nombre</StyledHeadCell>
                <StyledHeadCell>Email</StyledHeadCell>
                <StyledHeadCell>Contacto</StyledHeadCell>
                <StyledHeadCell>Dia de ingreso</StyledHeadCell>
                <StyledHeadCell>Rol</StyledHeadCell>

                {data ? (
                  data.empleado.length ? (
                    data.empleado
                      .map((item) => Object.values(item))
                      .map((row, index) => (
                        <React.Fragment key={index}>
                          <StyledBodyCell>{row[1]}</StyledBodyCell>
                          <StyledBodyCell>
                          <ImageWrapper>
                              <Image src={row[10]} alt={row[2]} />
                            </ImageWrapper>
                          </StyledBodyCell>
                          <StyledBodyCell>{row[2] + ' ' +  row[3] + ' ' +  row[4]}</StyledBodyCell>
                          <StyledBodyCell>{row[7]}</StyledBodyCell>
                          <StyledBodyCell>{row[6]}</StyledBodyCell>
                          <StyledBodyCell>
                            {dayjs(row[8]).format('DD MMM YYYY')}
                          </StyledBodyCell>
                          <StyledBodyCell>{row[5]}</StyledBodyCell>
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
