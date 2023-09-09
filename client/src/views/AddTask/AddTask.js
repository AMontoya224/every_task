import React, { useState } from 'react';
import axios from 'axios';
import './AddTask.css';
import Form_4 from '../../components/Form_4/Form_4';


function AddTask( props ){
    const { url } = props;
    const [serverTask, setServerTask] = useState( ' ' );

    const onSubmitTask = taskNew => {
        const task = {
            title : taskNew.title,
            contents : taskNew.contents,
            userName : JSON.parse( localStorage.getItem( 'user' ) ).userName
        };
        const config = {
            headers : {
              'api-token' : localStorage.getItem( 'token' )
            }
        };
        axios.post( `${url}/api/tasks/new`, task, config )
            .then( () => {
                setServerTask( ' ' );
                props.history.push( '/home' );
            })
            .catch( err => {
                if( err.response.statusText === 'Not authorized' ){
                    props.history.push( '/login' );
                };
                setServerTask( err.response.statusText );
            })
    };

    return (
        <div className='addTask'>
            <h1>
                Add to new task
            </h1>
            <Form_4 onSubmitProp={onSubmitTask} serverValidation={serverTask} initialTitle={''} initialContents={''}/>
        </div>
    );
};

export default AddTask;