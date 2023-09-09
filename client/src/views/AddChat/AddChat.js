import React, { useState } from 'react';
import axios from 'axios';
import './AddChat.css';
import UsersAll from '../../components/UsersAll/UsersAll';


function AddChat( props ){
    const { url } = props;
    const [serverTask, setServerTask] = useState( ' ' );

    const onSubmitTask = taskNew => {
        axios.post( `${url}/api/tasks/new`, taskNew )
            .then( () => {
                setServerTask( ' ' );
                props.history.push( '/' );
            })
            .catch( err => {
                setServerTask( err );
            })
    };
    //falta editar
    return (
        <div className='addChat'>
            <h1>
                Send a message to...
            </h1>
            <UsersAll url={url}/>
        </div>
    );
};

export default AddChat;