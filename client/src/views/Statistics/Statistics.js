import React, { useEffect } from 'react';
import {withRouter} from 'react-router-dom';
import './Statistics.css';


function Statistics( props ){
    const { token, onToken } = props;

    useEffect( () => {
        if( token === null ){
            localStorage.removeItem( 'token' );
            localStorage.removeItem( 'user' );
            onToken( null );
            props.history.push( '/' )
        }
    }, []);

    return (
        <div className='statistics'>
            <h2>Statistics</h2>
            <p>...</p>
        </div>
    );
};

export default withRouter(Statistics);