import React, { useState } from 'react';
import axios from 'axios';
import './AddChat.css';
import UsersAll from '../../components/UsersAll/UsersAll';


function AddChat( props ){
    const [serverTask, setServerTask] = useState( ' ' );

    const onSubmitTask = taskNew => {
        axios.post( 'http://localhost:7800/api/tasks/new', taskNew )
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
            <UsersAll/>
        </div>
    );
};

export default AddChat;