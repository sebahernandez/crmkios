import React, { useCallback, useEffect, useState } from 'react';
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
import { GET_ALL_NOTIFY } from 'utils/graphql/query/notification.query'; 
import { GET_CATEGORIAS } from 'utils/graphql/query/categories.query';
import { useSubscription } from '@apollo/client'; 
import { Heading } from 'components/Wrapper.style';

const Topbar = ({ refs }: any) => {
  const cookie = new Cookies() 
  const [isRoot]   = useState(cookie.get('suscriptor')?cookie.get('suscriptor').is_root:false)
  const [isNegocioWeb]   = useState(cookie.get('suscriptor')?cookie.get('suscriptor').is_negocio_web:false)
  const [info ] = useState(cookie.get('suscriptor')) 
  const dispatch = useDrawerDispatch();
  const [existCategory, setExistCategory] = useState(false)
  const { signout } = React.useContext(AuthContext);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const openDrawer = useCallback(
    () => dispatch({ type: 'OPEN_DRAWER', drawerComponent: 'PRODUCT_FORM' }),
    [dispatch]
  );

 
   // lista de Subscriptionos totales x clientid
 let [count,setCount] = useState(0)
 const { data  } = useSubscription(GET_ALL_NOTIFY);

  if(info===null){
    window.location.href = '/login';
    window.open('/login');
  }

  const {  data:data1 } =  useSubscription(GET_CATEGORIAS, {
    variables: {
      clientid: info.clientid
    },  
  });
 
  const showCommandOrder = (close:any) =>{
    if(isNegocioWeb === true && !isRoot){
        return <NavLink to={COMMAND_ORDER} exact={false} onClick={close}>
          Panel Pedidos
      </NavLink>
    } else {
      console.log('No se encuentra autorizado para operar el commandorder')
    }
  } 
 
  useEffect(()=>{
    if(data){
      setCount(data.notifications.length)
    }
    if(data1 && data1.categorias.length > 0){
      setExistCategory(true)
    } else{
      setExistCategory(false)
    }
  }, [count, data, data1])



  return (
    <TopbarWrapper ref={refs}>
      <Logo>
        <Link to="/">
          <LogoImage src={cookie.get('suscriptor').shop_image_logo}   />
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

    
  
       <Heading>Hola, {info.nombre} </Heading>   
 

      {!isRoot && 
        <a href={info.negocio_web} target="_blank">
          <Button className="button">Ir Tienda</Button>
        </a> 
      }   
      {!isRoot && !existCategory && <Button disabled  onClick={openDrawer}>Agregar Producto</Button>}
      {!isRoot && existCategory && <Button  onClick={openDrawer}>Agregar Producto</Button>}


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
              <AlertDotIcon $value={count}/>
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
                  cookie.remove('clientid'); 
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
            <Image src={cookie.get('suscriptor').crm_image_user} alt="user" />
          </ProfileImg>
        </Popover>
      </TopbarRightSide>
    </TopbarWrapper>
  );
};

export default Topbar;
