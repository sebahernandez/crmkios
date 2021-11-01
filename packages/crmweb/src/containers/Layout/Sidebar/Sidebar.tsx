import React, { useContext, useState } from 'react';
import { withRouter } from 'react-router-dom';
import {
  SidebarWrapper,
  NavLink,
  MenuWrapper,
  Svg,
  LogoutBtn,
} from './Sidebar.style';
import {
  DASHBOARD,
  PRODUCTS,
  SUBSCRIPTIONS,
  CATEGORY,
  ORDERS,
  CUSTOMERS,
  COUPONS,
  SETTINGS,
  COMMAND_ORDER,
  SITE_HELP
} from 'settings/constants';
import { AuthContext } from 'context/auth';

import { DashboardIcon } from 'assets/icons/DashboardIcon';
import { ProductIcon } from 'assets/icons/ProductIcon';
import { SidebarCategoryIcon } from 'assets/icons/SidebarCategoryIcon';
import { OrderIcon } from 'assets/icons/OrderIcon';
import { CustomerIcon } from 'assets/icons/CustomerIcon';
import { CouponIcon } from 'assets/icons/CouponIcon';
import { SettingIcon } from 'assets/icons/SettingIcon';
import { OrderCommandIcon } from 'assets/icons/OrderCommandIcon';
import { AyudaIcon } from 'assets/icons/AyudaIcon';
import { LogoutIcon } from 'assets/icons/LogoutIcon'; 
import Cookies  from 'universal-cookie';

const sidebarMenus = [
  {
    name: 'Dashboard',
    path: DASHBOARD,
    exact: true,
    icon: <DashboardIcon />,
  },
  {
    name: 'Productos',
    path: PRODUCTS,
    exact: false,
    icon: <ProductIcon />,
  },
  {
    name: 'Categorías',
    path: CATEGORY,
    exact: false,
    icon: <SidebarCategoryIcon />,
  },
  {
    name: 'Pedidos',
    path: ORDERS,
    exact: false,
    icon: <OrderIcon />,
  },
  {
    name: 'Clientes',
    path: CUSTOMERS,
    exact: false,
    icon: <CustomerIcon />,
  },
  {
    name: 'Ofertas',
    path: COUPONS,
    exact: false,
    icon: <CouponIcon />,
  },
  {
    name: 'Panel Pedidos',
    path: COMMAND_ORDER,
    exact: false,
    icon: <OrderCommandIcon />,
  },
  {
    name: 'Configuración',
    path: SETTINGS,
    exact: false,
    icon: <SettingIcon />,
  },
  {
    name: 'Ayuda',
    path: SITE_HELP,
    exact: false,
    icon: <AyudaIcon />,
  },
];

const sidebarMenusRoot = [
  {
    name: 'Dashboard',
    path: DASHBOARD,
    exact: true,
    icon: <DashboardIcon />,
  },
  {
    name: 'Suscripciones',
    path: SUBSCRIPTIONS,
    exact: false,
    icon: <CustomerIcon />,
  },
  {
    name: 'Configuración',
    path: SETTINGS,
    exact: false,
    icon: <SettingIcon />,
  },
  {
    name: 'Soporte',
    path: SITE_HELP,
    exact: false,
    icon: <AyudaIcon />,
  },
];

export default withRouter(function Sidebar({
  refs,
  style,
  onMenuItemClick,
}: any) {
  const { signout } = useContext(AuthContext);
  const cookie = new Cookies() 
  const [isRoot]   = useState(cookie.get('suscriptor')?cookie.get('suscriptor').is_root:false)

  return (
    <SidebarWrapper ref={refs} style={style}>
      <MenuWrapper>
        {!isRoot && sidebarMenus.map((menu: any, index: number) => (
          <NavLink
            to={menu.path}
            key={index}
            exact={menu.exact}
            activeStyle={{
              color: '#00C58D',
              backgroundColor: '#f7f7f7',
              borderRadius: '50px 0 0 50px',
            }}
            onClick={onMenuItemClick}
          >
            {menu.icon ? <Svg>{menu.icon}</Svg> : ''}
            {menu.name}
          </NavLink>
        ))}
       {isRoot && sidebarMenusRoot.map((menu: any, index: number) => (
          <NavLink
            to={menu.path}
            key={index}
            exact={menu.exact}
            activeStyle={{
              color: '#00C58D',
              backgroundColor: '#f7f7f7',
              borderRadius: '50px 0 0 50px',
            }}
            onClick={onMenuItemClick}
          >
            {menu.icon ? <Svg>{menu.icon}</Svg> : ''}
            {menu.name}
          </NavLink>
        ))}


      </MenuWrapper>

      <LogoutBtn
        onClick={() => {
          sessionStorage.setItem('infoUser',null);
          sessionStorage.setItem('clientid',null);
          sessionStorage.clear();
          window.sessionStorage.clear();
          signout();
        }}
      >
        <Svg>
          <LogoutIcon />
        </Svg>
        Cerrar Sesión
      </LogoutBtn>
    </SidebarWrapper>
  );
});
