import React, { useEffect, useState } from 'react';
import './Community.css';
import axios from 'axios';


function Community( props ){
    const { url } = props;
    const [users, setUsers] = useState( [] );

    useEffect( () => {
        const config = {
            headers : {
              'api-token' : localStorage.getItem( 'token' )
            }
        };
        axios.get( `${url}/api/users/all`, config )
            .then( res => {
                setUsers( res.data );
            })
            .catch( err => {})
          
    }, []);

    return (
        <div className='community'>
            <h3>Comunidad</h3>
            <table>
                <tr>
                    <th>Avatar</th>
                    <th>Nombre completo</th>
                    <th>Correo electrónico</th>
                </tr>
                {users.map( ( user, idx ) =>
                <tr key={idx}>
                    <td><img src={user.picture} alt='profile' /></td>
                    <td>{user.firstName} {user.lastName}</td>
                    <td>{user.email}</td>
                </tr>
                )}
            </table>
        </div>
    );
};

export default Community;