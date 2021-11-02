import React, {  useState } from 'react';
import { Link } from 'react-router-dom'; 
import Popover, { PLACEMENT } from 'components/Popover/Popover';
import Notification from 'components/Notification/Notification';
import { AuthContext } from 'context/auth';
import { PRODUCTS, STAFF_MEMBERS, SETTINGS } from 'settings/constants';
import { NotificationIcon } from 'assets/icons/NotificationIcon';
import { AlertDotIcon } from 'assets/icons/AlertDotIcon';
import { ArrowLeftRound } from 'assets/icons/ArrowLeftRound';
import { MenuIcon } from 'assets/icons/MenuIcon';
import { Header, Heading } from 'components/Wrapper.style';
import { Grid, Row , Col  } from 'components/FlexBox/FlexBox';
import {
  TopbarWrapper,
  Logo,
  LogoImage,
  TopbarRightSide,
  ProfileImg,
  Image,
  AlertDot,
  NotificationIconWrapper,
  UserDropdowItem,
  NavLink,
  LogoutBtn,
  DrawerIcon,
  CloseButton,
  DrawerWrapper,
} from './TopbarCommand.style'; 
import { useDrawerDispatch } from 'context/DrawerContext';
import Drawer, { ANCHOR } from 'components/Drawer/Drawer';
import Sidebar from '../Sidebar/Sidebar';

const data = [
  {
    title: 'Delivery Successfulx',
    time: '5m',
    message: 'Order #34567 had been placed',
  },
];
const TopbarCommand = ({ refs }: any) => {
  const [info ] = useState(JSON.parse(sessionStorage.getItem('infoUser')))  
  const { signout } = React.useContext(AuthContext);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
 

  if(info===null){
    window.location.href = '/login';
    window.open('/login');
  } 

  return (
    <TopbarWrapper ref={refs}>
      <Logo>
        <Link to="/">
          <LogoImage src={JSON.parse(sessionStorage.getItem('infoUser')).img_site_url}   />
        </Link>
      </Logo>
      <Grid fluid={true}>
      <Row>
        <Col md={12}>
          <Header style={{ marginBottom: 0 }}>
            <Col md={12} xs={12}>
              <Heading>Panel de Pedidos</Heading>
             </Col> 
            </Header>
          </Col>
      </Row>
      </Grid>  

  

      <DrawerWrapper>
        <DrawerIcon onClick={() => setIsDrawerOpen(true)}>
          <MenuIcon />
        </DrawerIcon>
        <Drawer
          isOpen={isDrawerOpen}
          anchor={ANCHOR.left}
          onClose={() => setIsDrawerOpen(false)}
          overrides={{
            Root: {
              style: {
                zIndex: '1',
              },
            },
            DrawerBody: {
              style: {
                marginRight: '0',
                marginLeft: '0',
                '@media only screen and (max-width: 767px)': {
                  marginLeft: '30px',
                },
              },
            },
            DrawerContainer: {
              style: { 
                width: '270px',
                '@media only screen and (max-width: 767px)': {
                  width: '80%',
                },
              },
            },
            Close: {
              component: () => (
                <CloseButton onClick={() => setIsDrawerOpen(false)}>
                  <ArrowLeftRound />
                </CloseButton>
              ),
            },
          }}
        >
          
          <Sidebar onMenuItemClick={() => setIsDrawerOpen(false)} />
        </Drawer>
      </DrawerWrapper>

      <TopbarRightSide>
        

        <Popover
          content={({ close }) => <Notification data={data} onClear={close} />}
          accessibilityType={'tooltip'}
          placement={PLACEMENT.bottomRight}
          overrides={{
            Body: {
              style: {
                width: '330px',
                zIndex: 2,
              },
            },
            Inner: {
              style: {
                backgroundColor: '#ffffff',
              },
            },
          }}
        >
          <NotificationIconWrapper>
            <NotificationIcon />
            <AlertDot>
              <AlertDotIcon />
            </AlertDot>
          </NotificationIconWrapper>
        </Popover>

        <Popover
          content={({ close }) => (
            <UserDropdowItem>
              <NavLink to={PRODUCTS} exact={false} onClick={close}>
                Inicio
              </NavLink>
              <NavLink to={STAFF_MEMBERS} exact={false} onClick={close}>
                Equipo
              </NavLink>
              <NavLink to={SETTINGS} exact={false} onClick={close}>
                Configuración
              </NavLink>
              <LogoutBtn
                onClick={() => {
                  signout();

                  sessionStorage.removeItem('infoUser');
                  sessionStorage.setItem('infoUser',null);
                  sessionStorage.setItem('clientid',null);
                  sessionStorage.clear();
                  window.sessionStorage.clear();
                  close();
                }}
              >
                Cerrar Sesión
              </LogoutBtn>
            </UserDropdowItem>
          )}
          accessibilityType={'tooltip'}
          placement={PLACEMENT.bottomRight}
          overrides={{
            Body: {
              style: () => ({
                width: '220px',
                zIndex: 2,
              }),
            },
            Inner: {
              style: {
                backgroundColor: '#ffffff',
              },
            },
          }}
        >
          <ProfileImg>
            <Image src={JSON.parse(sessionStorage.getItem('infoUser')).img_user_url} alt="user" />
          </ProfileImg>
        </Popover>
      </TopbarRightSide>
    </TopbarWrapper>
  );
};

export default TopbarCommand;
