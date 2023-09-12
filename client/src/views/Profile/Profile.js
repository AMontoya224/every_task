import React from 'react';
import {Link} from 'react-router-dom';
import './Profile.css';


function Profile( ){
    return (
        <div className='user-profile'>
            <h1>
                User profile
            </h1>
            <div className='row'>
                <Link to='/editPicture' className='user-picture'><img src={JSON.parse( localStorage.getItem( 'user' ) ).picture} alt='profile'/></Link>
                <div>
                    <Link to='/editAccount' className='user-info'><div className='user-container'>
                        <h3>
                            Account information
                        </h3>
                        <p>
                            <b>Email address:</b> {JSON.parse( localStorage.getItem( 'user' ) ).email}
                        </p>
                        <p>
                            <b>Country of residence:</b> {JSON.parse( localStorage.getItem( 'user' ) ).country}
                        </p>
                    </div></Link>
                    <Link to='/editUser' className='user-info'><div className='user-container'>
                        <h3>
                            User information
                        </h3>
                        <p>
                            <b>Username:</b> {JSON.parse( localStorage.getItem( 'user' ) ).userName}
                        </p>
                        <p>
                            <b>Full name:</b> {JSON.parse( localStorage.getItem( 'user' ) ).firstName} {JSON.parse( localStorage.getItem( 'user' ) ).lastName}
                        </p>
                        <p>
                            <b>Phone contact:</b> + {JSON.parse( localStorage.getItem( 'user' ) ).phone}
                        </p>
                    </div></Link>
                </div>
            </div>
        </div>
    );
};

export default Profile;