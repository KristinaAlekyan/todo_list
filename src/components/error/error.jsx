import React from 'react';

import './error.css';

const Error = ({message}) =>{
    return (
        <div className='errorContainer'><h6>{message}</h6></div>
    );
}

export default Error;