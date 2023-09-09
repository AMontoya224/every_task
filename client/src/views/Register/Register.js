import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './Register.css';
import Form_0 from '../../components/Form_0/Form_0';
import Form_1 from '../../components/Form_1/Form_1';
import Form_2 from '../../components/Form_2/Form_2';


function Register( props ){
    const {onToken} = props;
    const [user, setUser] = useState( '' );
    const [serverEmail, setServerEmail] = useState( ' ' );
    const [code, setCode] = useState( 0 );
    const [serverCreateError, setServerCreateError] = useState( ' ' );
    const [bar, setBar] = useState( 0 );

    const onSubmitEmail = userNew => {
        const {email, country} = userNew;
        axios.get( `http://localhost:7800/api/users/register/email/${email}` )
            .then( res => {
                if( res.request.statusText === 'Send code to email.' ){
                    setUser( {email, country} );
                    setCode( res.data.codeRandom );
                    setServerEmail( res.request.statusText );
                }
                else{
                    setServerEmail( res.request.statusText )
                }
            })
            .catch( err => {
                try{ setServerEmail( err.response.statusText ) }
                catch( err ) { setServerEmail( ' ' ); };
            });
    };

    const onSubmitCodeForm = codeNew => {
        const {codeForm} = codeNew;
        if( codeForm === code ){
            setBar( 1 );
        }
        else{
            setServerEmail( 'err' );
        }
    };

    const onSubmitClose = () => {
        setServerEmail( ' ' );
    };

    const onSubmitUser = userNew => {
        const {firstName, lastName, userName, phone, password} = userNew;
        const {email, country} = user;
        setUser( {email, country, firstName, lastName, userName, phone, password} );
        setBar( 3 );
    };

    const onSubmitCreate = userNew => {
        const {picture} = userNew;
        const {email, country, firstName, lastName, userName, phone, password} = user;
        const userCreate = {
            email,
            country,
            firstName,
            lastName,
            userName,
            phone : Number(phone),
            password,
            picture
        }
        axios.post( 'http://localhost:7800/api/users/register', userCreate )
            .then( res => {
                localStorage.setItem( 'token', res.data.token );
                localStorage.setItem( 'user', JSON.stringify( res.data.userCreated ) );
                onToken( res.data.token );
                setServerCreateError( ' ' );
                props.history.push( '/home' );
            })
            .catch( err => {
                try{ setServerCreateError( err.response.statusText ) }
                catch( err ) { setServerCreateError( ' ' ); };
            })
    };

    return (
        <div className='register'>
            <progress value={bar} max='3'>{bar} %</progress>
            <h1>
                Create your account
            </h1>
            {
                ( bar === 0 ) ? <Form_0 onSubmitProp={onSubmitEmail} serverValidation={serverEmail} onSubmitCode={onSubmitCodeForm} 
                                        onClose={onSubmitClose} initialEmail={''} initialCountry={''}/> : 
                ( bar === 1 ) ? <Form_1 onSubmitProp={onSubmitUser} initialFirstName={''} initialLastName={''} 
                                        initialUsertName={''} initialPhone={''}/> :
                                <Form_2 onSubmitProp={onSubmitCreate} serverValidation={serverCreateError} initialPicture={''}/>
            }
            <p>
                Are you already registered? Enter your <Link to='/login' className='link'>login</Link>
            </p>
        </div>
    );
};

export default Register;