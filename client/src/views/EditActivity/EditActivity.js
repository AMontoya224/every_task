import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditActivity.css';
import Form_5 from '../../components/Form_5/Form_5';


function EditActivity( props ){
    const { url } = props;
    const [activity, setActivity] = useState( ' ' );
    const [serverActivity, setServerActivity] = useState( ' ' );

    useEffect( () => {
        const config = {
            headers : {
                'api-token' : localStorage.getItem( 'token' )
            }
        };
        axios.get( `${url}/api/activities/${props.match.params._id}`, config )
            .then( res => {
                setActivity( res.data );
            })
            .catch( err => {})
    }, []);

    const onUpdateActivity = activityNew => {
        const config = {
            headers : {
              'api-token' : localStorage.getItem( 'token' )
            }
        };
        axios.put( `${url}/api/activities/${props.match.params._id}/update`, activityNew, config )
            .then( () => {
                setServerActivity( ' ' );
                props.history.push( '/home' );
            })
            .catch( err => {
                if( err.response.statusText === 'Not authorized' ){
                    props.history.push( '/login' );
                };
                setServerActivity( err.response.statusText );
            })
    };

    return (
        <div className='editTask'>
            <h1>
                Edit activity
            </h1>
            {(activity.title) && <Form_5 onSubmitProp={onUpdateActivity} serverValidation={serverActivity} initialTitle={activity.title} 
                                         initialDate={activity.date} initialContents={activity.contents}/>}
        </div>
    );
};

export default EditActivity;