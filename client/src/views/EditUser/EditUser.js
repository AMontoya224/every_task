import React from 'react';
import axios from 'axios';
import './EditUser.css';
import Form1 from '../../components/Form1/Form1';


function EditUser( props ){
    const { url } = props;
    //const [serverUpdateError, setServerUpdateError] = useState( ' ' );
    //const [code, setCode] = useState( 0 );

    const onUpdateUser = userNew => {
        const config = {
            headers : {
              'api-token' : localStorage.getItem( 'token' )
            }
        };
        const {firstName, lastName, userName, phone, password} = userNew;
        const userUpdate = {
            firstName,
            lastName,
            userName,
            phone,
            password
        };
        axios.put( `${url}/api/users/${JSON.parse( localStorage.getItem( 'user' ) ).userName}/update`, userUpdate, config )
            .then( res => {
                //setServerUpdateError( ' ' );
                localStorage.setItem( 'user', JSON.stringify( res.data ) );
                props.history.push( '/profile' );
            })
            .catch( err => {
                if( err.data.statusText === 'Not authorized' ){
                    props.history.push( '/login' );
                };
                //setServerUpdateError( err.data.statusText );
            })
    };

    return (
        <div className='editTask'>
            <h1>
                Editar cuenta
            </h1>
            {( JSON.parse( localStorage.getItem( 'user' ) ).email ) && <Form1 url={url} onSubmitProp={onUpdateUser} initialFirstName={JSON.parse( localStorage.getItem( 'user' ) ).firstName} initialLastName={JSON.parse( localStorage.getItem( 'user' ) ).lastName} 
                                        initialUsertName={JSON.parse( localStorage.getItem( 'user' ) ).userName} initialPhone={JSON.parse( localStorage.getItem( 'user' ) ).phone}/>}
        </div>
    );
};

export default EditUser;