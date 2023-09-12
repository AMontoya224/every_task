import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './Register.css';
import Form0 from '../../components/Form0/Form0';
import Form1 from '../../components/Form1/Form1';
import Form2 from '../../components/Form2/Form2';


function Register( props ){
    const { onToken, url } = props;
    const [user, setUser] = useState( '' );
    const [serverEmail, setServerEmail] = useState( ' ' );
    const [code, setCode] = useState( 0 );
    const [serverCreateError, setServerCreateError] = useState( ' ' );
    const [bar, setBar] = useState( 0 );

    const onSubmitEmail = userNew => {
        const {email, country} = userNew;
        axios.get( `${url}/api/users/register/email/${email}` )
            .then( res => {
                console.log(res)
                if( res.data.statusText === 'Send code to email.' ){
                    setUser( {email, country} );
                    setCode( res.data.codeRandom );
                    setServerEmail( res.data.statusText );
                }
                else{
                    setServerEmail( res.data.statusText )
                }
            })
            .catch( err => {
                try{ setServerEmail( err.data.statusText ) }
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
        axios.post( `${url}/api/users/register`, userCreate )
            .then( res => {
                localStorage.setItem( 'token', res.data.token );
                localStorage.setItem( 'user', JSON.stringify( res.data.userCreated ) );
                onToken( res.data.token );
                setServerCreateError( ' ' );
                props.history.push( '/home' );
            })
            .catch( err => {
                try{ setServerCreateError( err.data.statusText ) }
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
                ( bar === 0 ) ? <Form0 onSubmitProp={onSubmitEmail} serverValidation={serverEmail} onSubmitCode={onSubmitCodeForm} 
                                        onClose={onSubmitClose} initialEmail={''} initialCountry={''}/> : 
                ( bar === 1 ) ? <Form1 onSubmitProp={onSubmitUser} initialFirstName={''} initialLastName={''} 
                                        initialUsertName={''} initialPhone={''} url={url}/> :
                                <Form2 onSubmitProp={onSubmitCreate} serverValidation={serverCreateError} initialPicture={''}/>
            }
            <p>
                Are you already registered? Enter your <Link to='/login' className='link'>login</Link>
            </p>
        </div>
    );
};

export default Register;