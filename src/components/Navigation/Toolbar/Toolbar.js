import React from 'react';

import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToogle from '../SideDrawer/DrawerToogle/DrawerToogle';

const Toolbar = (props) => (
  <header className = {classes.Toolbar}>
    <DrawerToogle clicked = {props.ToogleSideDrawer}/>
    <Logo />
    <nav className = {classes.OnlyDesktop}>
      <NavigationItems isAuthenticated = {props.isAuth}/>
    </nav>
  </header>
);
export default Toolbar;