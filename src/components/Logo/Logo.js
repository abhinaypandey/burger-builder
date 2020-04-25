import React from 'react';
import appLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.module.css';

const logo = () => (
    <div className={classes.Logo}>
        <img src={appLogo} alt="app logo"></img>
    </div>

);

export default logo;