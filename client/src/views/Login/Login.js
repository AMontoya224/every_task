import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import Form_3 from '../../components/Form_3/Form_3';


function Login( props ){
    const { onToken, url } = props;
    const [serverLogin, setServerLogin] = useState( ' ' );

    const onSubmitLogin = userNew => {
        axios.post( `${url}/api/users/login`, userNew )
            .then( res => {
                if( res.request.statusText === 'Valid credentials.' ){
                    localStorage.setItem( 'token', res.data.token );
                    localStorage.setItem( 'user', JSON.stringify( res.data.userFound ) );
                    onToken( res.data.token );
                    setServerLogin( ' ' );
                    props.history.push( '/home' );
                }
                else{
                    setServerLogin( res.request.statusText );
                }
            })
            .catch( err => {
                setServerLogin( err );
            })
    };

    const onSubmitClose = () => {
        setServerLogin( ' ' );
    };

    return (
        <div className='login'>
            <h1>
                Login to your account
            </h1>
            <p>
                Are you new to this site? <Link to='/register' className='link'>Register</Link>
            </p>
            <Form_3 onSubmitProp={onSubmitLogin} serverValidation={serverLogin} onClose={onSubmitClose}/>
        </div>
    );
};

export default Login;