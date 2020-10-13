import React from 'react';

import classes from './Backdrop.css';

const Backdrop = (props) => (
    props.showOrderSummary ? <div className = {classes.Backdrop} onClick = {props.removeBackdrop}></div> : null
    );


export default Backdrop;