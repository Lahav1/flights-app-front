import React from 'react';
import classes from './Logo.module.css';
import airplaneLogo from '../../assets/images/airplane.svg'

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={airplaneLogo} alt="Flight Scanner" />
    </div>
);

export default logo;