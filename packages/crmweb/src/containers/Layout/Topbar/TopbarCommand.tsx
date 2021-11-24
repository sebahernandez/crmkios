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
import { useSubscription } from '@apollo/client';
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
import Drawer, { ANCHOR } from 'components/Drawer/Drawer';
import Sidebar from '../Sidebar/Sidebar';
import { GET_ALL_NOTIFY } from 'utils/graphql/query/notification.query';
import Cookies  from 'universal-cookie';


const data = [
  {
    title: 'Delivery Successfulx',
    time: '5m',
    message: 'Order #34567 had been placed',
  },
];
const TopbarCommand = ({ refs }: any) => {


 // lista de Subscriptionos totales x clientid
 const { data  } = useSubscription(GET_ALL_NOTIFY);
 const cookie = new Cookies() 


  const [ suscriptor ] = useState(JSON.parse(cookie.get('suscriptor')))  
  const { signout } = React.useContext(AuthContext);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
 

  if(suscriptor===null){
    window.location.href = '/login';
    window.open('/login');
  } 

  return (
    <TopbarWrapper ref={refs}>
      <Logo>
        <Link to="/">
          <LogoImage src={suscriptor.shop_image_logo}   />
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
          content={({ close }) => <Notification data={data.notifications} onClear={close} />}
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
              <AlertDotIcon $value={(data)?data.notifications.length:0}/>
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
                   
                  cookie.remove('suscriptor');
                  cookie.remove('clientid');
                  cookie.set('suscriptor',null);
                  cookie.set('clientid',null);                   
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
            <Image src={JSON.parse(cookie.get('suscriptor')).img_user_url} alt="user" />
          </ProfileImg>
        </Popover>
      </TopbarRightSide>
    </TopbarWrapper>
  );
};

export default TopbarCommand;
