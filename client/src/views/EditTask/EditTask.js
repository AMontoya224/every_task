import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditTask.css';
import Form_4 from '../../components/Form_4/Form_4';


function EditTask( props ){
    const { url } = props;
    const [task, setTask] = useState( ' ' );
    const [serverTask, setServerTask] = useState( ' ' );

    useEffect( () => {
        const config = {
            headers : {
                'api-token' : localStorage.getItem( 'token' )
            }
        };
        axios.get( `${url}/api/tasks/${props.match.params._id}`, config )
            .then( res => {
                setTask( res.data );
            })
            .catch( err => {})
    }, []);

    const onUpdateTask = taskNew => {
        const config = {
            headers : {
              'api-token' : localStorage.getItem( 'token' )
            }
        };
        axios.put( `${url}/api/tasks/${props.match.params._id}/update`, taskNew, config )
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
        <div className='editTask'>
            <h1>
                Edit task
            </h1>
            {(task.title) && <Form_4 onSubmitProp={onUpdateTask} serverValidation={serverTask} 
                                     initialTitle={task.title} initialContents={task.contents}/>}
        </div>
    );
};

export default EditTask;