import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditTask.css';
import Form4 from '../../components/Form4/Form4';


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
                if( err.data.statusText === 'Not authorized' ){
                    props.history.push( '/login' );
                };
                setServerTask( err.data.statusText );
            })
    };

    return (
        <div className='editTask'>
            <h1>
                Edit task
            </h1>
            {(task.title) && <Form4 onSubmitProp={onUpdateTask} serverValidation={serverTask} 
                                     initialTitle={task.title} initialContents={task.contents}/>}
        </div>
    );
};

export default EditTask;