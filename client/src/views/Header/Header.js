import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import './Header.css';
import Theme from './../../components/Theme/Theme';


function Header( props ){
    const {token, tasks, activities} = props;

    const handleDetails = () => {
        props.history.push( '/profile' );
    };
    
    return (
        <div className='header'>
            <div className='row'>
                <Theme/>
                <div className='space'></div>
                {token ? <Link to='/home' className='tittle'><h2>Ever<b>Task</b></h2></Link> : <Link to='/' className='tittle'><h2>Ever<b>Task</b></h2></Link>}
                {(JSON.parse( localStorage.getItem( 'user' ) ) === '' || JSON.parse( localStorage.getItem( 'user' ) ) === null ) ? 
                    <div className='bh'>
                        <div>
                            <Link to='/login'><p>Ingresar</p></Link>
                        </div>
                        <div className='d'>
                            <Link to='/register'><p>Registrarse</p></Link>
                        </div>
                    </div> : 
                    <div className='profile row' onClick={handleDetails}>
                        <img src={JSON.parse( localStorage.getItem( 'user' ) ).picture} alt='profile'/>
                        <div className='col'>
                            <b>{JSON.parse( localStorage.getItem( 'user' ) ).userName}</b>
                            <p>{JSON.parse( localStorage.getItem( 'user' ) ).firstName}</p>
                        </div>
                    </div>}
            </div>
            {token ? <div className='counter'>
                <p>{tasks.length} | {activities.length}</p>
            </div> : <></>}
        </div>
    );
};

export default withRouter(Header);