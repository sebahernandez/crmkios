import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'components/Button/Button';
import Popover, { PLACEMENT } from 'components/Popover/Popover';
import Notification from 'components/Notification/Notification';
import { AuthContext } from 'context/auth';
import { COMMAND_ORDER, STAFF_MEMBERS, SETTINGS } from 'settings/constants';
import { NotificationIcon } from 'assets/icons/NotificationIcon';
import { AlertDotIcon } from 'assets/icons/AlertDotIcon';
import { ArrowLeftRound } from 'assets/icons/ArrowLeftRound';
import { MenuIcon } from 'assets/icons/MenuIcon';
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
} from './Topbar.style'; 
import { useDrawerDispatch } from 'context/DrawerContext';
import Drawer, { ANCHOR } from 'components/Drawer/Drawer';
import Sidebar from '../Sidebar/Sidebar';
import Cookies  from 'universal-cookie';

const data = [
  {
    title: 'Delivery Successful',
    time: '5m',
    message: 'Order #34567 had been placed',
  },
];
const Topbar = ({ refs }: any) => {
  const cookie = new Cookies() 
  const [isRoot]   = useState(cookie.get('suscriptor')?cookie.get('suscriptor').is_root:false)
  const [isNegocioWeb]   = useState(cookie.get('suscriptor')?cookie.get('suscriptor').is_negocio_web:false)
  const [info ] = useState(JSON.parse(sessionStorage.getItem('infoUser'))) 
  const dispatch = useDrawerDispatch();
  const { signout } = React.useContext(AuthContext);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const openDrawer = useCallback(
    () => dispatch({ type: 'OPEN_DRAWER', drawerComponent: 'PRODUCT_FORM' }),
    [dispatch]
  );

  if(info===null){
    window.location.href = '/login';
    window.open('/login');
  }
 
  const showCommandOrder = (close:any) =>{
    if(isNegocioWeb === true && !isRoot){
        return <NavLink to={COMMAND_ORDER} exact={false} onClick={close}>
          Panel Pedidos
      </NavLink>
    } else {
      console.log('No se encuentra autorizado para operar el commandorder')
    }
  } 


  return (
    <TopbarWrapper ref={refs}>
      <Logo>
        <Link to="/">
          <LogoImage src={JSON.parse(sessionStorage.getItem('infoUser')).img_site_url}   />
        </Link>
      </Logo>

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
        
      {!isRoot && <Button onClick={openDrawer}>Agregar Producto</Button>}

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
              {showCommandOrder(close)}

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
                  sessionStorage.removeItem('pickbazar_token')
                  sessionStorage.removeItem('infoUser')
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

export default Topbar;
