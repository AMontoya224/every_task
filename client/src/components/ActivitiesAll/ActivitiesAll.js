import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ActivitiesAll.css';


function ActivitiesAll( props ){
    const {onActivities} = props;
    const [activities, setActivities] = useState( [] );

    const handleCheck = ( _id, status ) => {
        const config = {
            headers : {
              'api-token' : localStorage.getItem( 'token' )
            }
        };
        const activityNew = {
            status : !status
        };
        axios.put( `http://localhost:7800/api/activities/${_id}/update`, activityNew, config )
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

    const deleteActivity = ( _id, title ) => {
        let answer = window.confirm( `Are you sure you want to delete "${title}" activity?` );
        if (answer) {
            const config = {
                headers : {
                    'api-token' : localStorage.getItem( 'token' )
                }
            };
            axios.delete( `http://localhost:7800/api/activities/${_id}/delete`, config )
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
                setActivities( res.data.activities );
                onActivities( res.data.activities );
            })
            .catch( err => {})
    }, [activities]);

    return (
        <div className='tasksAll'>
            {activities.length === 0 ? 
                <div>
                    <p className='message-buttom'>Don't forget to write down your pending activities</p>
                    <Link to='/addActivity' className='tasksAll-buttom'><span className="material-icons-round">add</span></Link>
                </div> 
            : 
                <div>
                    {activities.map( ( activity, idx ) => 
                        <div key={idx} className={( idx % 2 === 0 ) ? 'activity activity-green' : ( idx % 3 === 0 ) ? 'activity activity-blue' : 'activity activity-yellow'}>
                            <div className={activity.status ? "checked-item" : "not-checked-item"}>
                                <div className='title-server'>
                                    <Link to={`/editActivity/${activity._id}`} className='task-link'>
                                        <h3>{activity.title}</h3>
                                    </Link>
                                    <button className='delete-task' type='button' onClick={()=>{deleteActivity( activity._id, activity.title )}}><span className="material-icons-round">remove_circle</span></button>
                                </div>
                                <b>{activity.date}</b>
                                <div className='row'>
                                    <Link to={`/editActivity/${activity._id}`} className='task-link'>
                                        <p>{activity.contents}</p>
                                    </Link>
                                    <input className='input-checkbox' value={activity.status} type="checkbox" checked={activity.status} onChange={()=>{handleCheck( activity._id, activity.status)}} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            }
        </div>
    );
};

export default ActivitiesAll;