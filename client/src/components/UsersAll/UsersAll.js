import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './UsersAll.css';


function UsersAll( props ){
    const [users, setUsers] = useState( [] );

    useEffect( () => {
        const config = {
            headers : {
                'api-token' : localStorage.getItem( 'token' )
            }
        };
        axios.get( `http://localhost:7800/api/users/all`, config )
            .then( res => {
                setUsers( res.data );
            })
            .catch( err => {})
    }, [users]);

    return (
        <div className='usersAll'>
            {users.map( ( user, idx ) => 
                <div key={idx} className='user-container'>
                    <img src={user.picture} alt='profile'/>
                    <p>{user.userName}</p>
                </div>
            )}
        </div>
    );
};

export default UsersAll;