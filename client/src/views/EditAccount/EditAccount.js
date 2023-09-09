import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditAccount.css';
import Form_0 from '../../components/Form_0/Form_0';


function EditAccount( props ){
    const [serverUpdateError, setServerUpdateError] = useState( ' ' );
    const [code, setCode] = useState( 0 );

    const onUpdateEmail = userNew => {
        const config = {
            headers : {
              'api-token' : localStorage.getItem( 'token' )
            }
        };
        const {email, country} = userNew;
        const userUpdate = {
            email,
            country
        };
        axios.put( `http://localhost:7800/api/users/${JSON.parse( localStorage.getItem( 'user' ) ).userName}/update`, userUpdate, config )
            .then( res => {
                setServerUpdateError( ' ' );
                localStorage.setItem( 'user', JSON.stringify( res.data ) );
                props.history.push( '/profile' );
            })
            .catch( err => {
                if( err.response.statusText === 'Not authorized' ){
                    props.history.push( '/login' );
                };
                setServerUpdateError( err.response.statusText );
            })
    };

    const onSubmitCodeForm = codeNew => {
        const {codeForm} = codeNew;
        if( codeForm === code ){
            setServerUpdateError( ' ' );
        }
        else{
            setServerUpdateError( 'err' );
        }
    };

    const onSubmitClose = () => {
        setServerUpdateError( ' ' );
    };

    return (
        <div className='editTask'>
            <h1>
                Edit Account
            </h1>
            {( JSON.parse( localStorage.getItem( 'user' ) ).email ) && <Form_0 onSubmitProp={onUpdateEmail} serverValidation={serverUpdateError} onSubmitCode={onSubmitCodeForm} 
            onClose={onSubmitClose} initialEmail={JSON.parse( localStorage.getItem( 'user' ) ).email} initialCountry={JSON.parse( localStorage.getItem( 'user' ) ).country}/>}
        </div>
    );
};

export default EditAccount;