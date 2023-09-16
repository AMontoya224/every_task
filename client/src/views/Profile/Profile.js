import React from 'react';
import {Link} from 'react-router-dom';
import './Profile.css';


function Profile( ){
    return (
        <div className='user-profile'>
            <h1>
                Perfil del usuario
            </h1>
            <div className='row'>
                <Link to='/editPicture' className='user-picture'>
                    <img src={JSON.parse( localStorage.getItem( 'user' ) ).picture} alt='profile'/>
                </Link>
                <div>
                    <Link to='/editAccount'>
                        <div className='p-user-container'>
                            <h3>
                                Información de la cuenta
                            </h3>
                            <p>
                                <b>Correo electrónico:</b> {JSON.parse( localStorage.getItem( 'user' ) ).email}
                            </p>
                            <p>
                                <b>País de residencia:</b> {JSON.parse( localStorage.getItem( 'user' ) ).country}
                            </p>
                        </div>
                    </Link>
                    <Link to='/editUser'>
                        <div className='p-user-container'>
                            <h3>
                                Informacion del usuario
                            </h3>
                            <p>
                                <b>Nombre de usuario:</b> {JSON.parse( localStorage.getItem( 'user' ) ).userName}
                            </p>
                            <p>
                                <b>Nombre completo:</b> {JSON.parse( localStorage.getItem( 'user' ) ).firstName} {JSON.parse( localStorage.getItem( 'user' ) ).lastName}
                            </p>
                            <p>
                                <b>Teléfono de contacto:</b> + {JSON.parse( localStorage.getItem( 'user' ) ).phone}
                            </p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Profile;