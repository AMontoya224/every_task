import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import Form3 from '../../components/Form3/Form3';


function Login( props ){
    const { onToken, url } = props;
    const [serverLogin, setServerLogin] = useState( ' ' );

    const onSubmitLogin = userNew => {
        axios.post( `${url}/api/users/login`, userNew )
            .then( res => {
                console.log(res)
                if( res.data.statusText === 'Valid credentials.' ){
                    localStorage.setItem( 'token', res.data.token );
                    localStorage.setItem( 'user', JSON.stringify( res.data.userFound ) );
                    onToken( res.data.token );
                    setServerLogin( ' ' );
                    props.history.push( '/home' );
                }
                else{
                    setServerLogin( res.data.statusText );
                }
            })
            .catch( err => {
                setServerLogin( err.data.statusText );
            })
    };

    const onSubmitClose = () => {
        setServerLogin( ' ' );
    };

    return (
        <div className='login'>
            <h1>
                Ingrese a su cuenta
            </h1>
            <p>
                ¿Eres nuevo en este sitio? <Link to='/register' className='link'>Registrarse</Link>
            </p>
            <Form3 onSubmitProp={onSubmitLogin} serverValidation={serverLogin} onClose={onSubmitClose}/>
        </div>
    );
};

export default Login;