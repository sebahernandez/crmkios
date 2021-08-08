import React from 'react';
import { Navbar } from 'react-bootstrap';
import LogoutBtn from './Auth/LogoutBtn';
import 'assets/styles/App.css';

const Header = () => (
  <Navbar className="justify-content-between">
    <Navbar.Brand>Gestión de Pedidos</Navbar.Brand>
    <Navbar.Collapse className="justify-content-end">
      <LogoutBtn />
    </Navbar.Collapse>
  </Navbar>
);

export default Header;
