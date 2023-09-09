import React, { useState } from 'react';
import axios from 'axios';
import './AddActivity.css';
import Form_5 from '../../components/Form_5/Form_5';


function AddActivity( props ){
    const { url } = props;
    const [serverActivity, setServerActivity] = useState( ' ' );

    const onSubmitActivity = activityNew => {
        const activity = {
            title : activityNew.title,
            contents : activityNew.contents,
            date : activityNew.date,
            userName : JSON.parse( localStorage.getItem( 'user' ) ).userName
        };
        const config = {
            headers : {
              'api-token' : localStorage.getItem( 'token' )
            }
        };
        axios.post( `${url}/api/activities/new`, activity, config )
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
        <div className='addActivity'>
            <h1>
                Add to new Activity
            </h1>
            <Form_5 onSubmitProp={onSubmitActivity} serverValidation={serverActivity} initialTitle={''} initialDate={''} initialContents={''}/>
        </div>
    );
};

export default AddActivity;