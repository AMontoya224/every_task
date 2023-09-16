import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ActivitiesAll.css';


function ActivitiesAll( props ){
    const {onActivities, url} = props;
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
        axios.put( `${url}/api/activities/${_id}/update`, activityNew, config )
            .then( () => {} )
            .catch( err => {
                try{
                    if( err.data.statusText === 'Not authorized' ){
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
            axios.delete( `${url}/api/activities/${_id}/delete`, config )
        }
    };

    useEffect( () => {
        const config = {
            headers : {
                'api-token' : localStorage.getItem( 'token' )
            }
        };
        const userName = JSON.parse( localStorage.getItem( 'user' ) ).userName;
        axios.get( `${url}/api/users/${userName}`, config )
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
                    <p className='message-buttom'>No olvides anotar tus actividades pendientes</p>
                    <Link to='/addActivity' className='tasksAll-buttom'><span className="material-icons-round">add</span></Link>
                </div> 
            : 
                <div>
                    {activities.map( ( activity, idx ) => 
                        <div key={idx} className={activity.status ? "activity checked" : "activity not-checked"}>
                            <div>
                                <div className='title'>
                                    <Link to={`/editActivity/${activity._id}`}>
                                        <h3>{activity.title}</h3>
                                    </Link>
                                    <button className='delete-task' type='button' onClick={()=>{deleteActivity( activity._id, activity.title )}}><span className="material-icons-round">remove_circle</span></button>
                                </div>
                                <i>{activity.date.slice(0, 10)} | {activity.date.slice(11, 16)}</i>
                                <div className='row'>
                                    <p>{activity.contents}</p>
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