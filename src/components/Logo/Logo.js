import React from 'react';

import BurgerLogo from '../../assets/images/logo.png';
import classes from './Logo.css'

const Logo = (props) => (
  <div className = {classes.Logo}>
     <img src = {BurgerLogo} alt = "MyBurgerLogo"/>
  </div>
 
);
export default Logo;