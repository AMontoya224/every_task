import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './TasksAll.css';


function TasksAll( props ){
    const {onTasks} = props;
    const [tasks, setTasks] = useState( [] );
    

    const handleCheck = ( _id, status ) => {
        const config = {
            headers : {
              'api-token' : localStorage.getItem( 'token' )
            }
        };
        const taskNew = {
            status : !status
        };
        axios.put( `http://localhost:7800/api/tasks/${_id}/update`, taskNew, config )
            .then( () => {} )
            .catch( err => {
                try{
                    if( err.response.statusText === 'Not authorized' ){
                        props.history.push( '/login' );
                    };
                }
                catch(err){}
            })
    };

    const deleteTask = ( _id, title ) => {
        let answer = window.confirm( `Are you sure you want to delete "${title}" task?` );
        if (answer) {
            const config = {
                headers : {
                    'api-token' : localStorage.getItem( 'token' )
                }
            };
            axios.delete( `http://localhost:7800/api/tasks/${_id}/delete`, config )
        }
    };

    useEffect( () => {
        const config = {
            headers : {
                'api-token' : localStorage.getItem( 'token' )
            }
        };
        const userName = JSON.parse( localStorage.getItem( 'user' ) ).userName;
        axios.get( `http://localhost:7800/api/users/${userName}`, config )
            .then( res => {
                setTasks( res.data.tasks );
                onTasks( res.data.tasks );
            })
            .catch( err => {})
    }, [tasks]);

    return (
        <div className='tasksAll'>
            {tasks.length === 0 ? 
                <div>
                    <p className='message-buttom'>Start the day writing tasks that you have to do, good luck!</p>
                    <Link to='/addTask' className='tasksAll-buttom'><span className="material-icons-round">add</span></Link>
                </div> 
            : 
                <div>
                    {tasks.map( ( task, idx ) => 
                        <div key={idx} className={( idx % 2 === 0 ) ? 'task task-green' : ( idx % 3 === 0 ) ? 'task task-blue' : 'task task-yellow'}>
                                <div className={task.status ? "checked-item" : "not-checked-item"}>
                                    <div className='title-server'>
                                        <Link to={`/editTask/${task._id}`} className='task-link'>
                                            <h3>{task.title}</h3>
                                        </Link>
                                        <button className='delete-task' type='button' onClick={()=>{deleteTask( task._id, task.title )}}><span className="material-icons-round">remove_circle</span></button>
                                    </div>
                                    <div className='row'>
                                        <Link to={`/editTask/${task._id}`} className='task-link'>
                                            <p>{task.contents}</p>
                                        </Link>
                                        <input className='input-checkbox' value={task.status} type="checkbox" checked={task.status} onChange={()=>{handleCheck( task._id, task.status)}} />
                                    </div>
                                </div>
                        </div>
                    )}
                </div>
            }
        </div>
    );
};

export default TasksAll;