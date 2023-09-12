import React, { useState } from 'react';
import axios from 'axios';
import './EditPicture.css';
import Form2 from '../../components/Form2/Form2';


function EditPicture( props ){
    const { url } = props;
    const [serverCreateError, setServerCreateError] = useState( ' ' );

    const onUpdateActivity = userNew => {
        const config = {
            headers : {
              'api-token' : localStorage.getItem( 'token' )
            }
        };
        const {picture} = userNew;
        const userUpdate = {
            picture
        };
        axios.put( `${url}/api/users/${JSON.parse( localStorage.getItem( 'user' ) ).userName}/update`, userUpdate, config )
            .then( res => {
                setServerCreateError( ' ' );
                localStorage.setItem( 'user', JSON.stringify( res.data ) );
                props.history.push( '/profile' );
            })
            .catch( err => {
                if( err.data.statusText === 'Not authorized' ){
                    props.history.push( '/login' );
                };
                setServerCreateError( err.data.statusText );
            })
    };

    return (
        <div className='editTask'>
            <h1>
                Edit profile picture
            </h1>
            {( JSON.parse( localStorage.getItem( 'user' ) ).picture ) && <Form2 onSubmitProp={onUpdateActivity} 
            serverValidation={serverCreateError} initialPicture={JSON.parse( localStorage.getItem( 'user' ) ).picture}/>}
        </div>
    );
};

export default EditPicture;