import React from 'react';
import './backdrop.scss';

const Backdrop = props => props.show ? <div className="backdrop" onClick={props.backdropClicked}></div> : null;


export default Backdrop;
