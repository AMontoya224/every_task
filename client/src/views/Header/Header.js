import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import './Header.css';
import Theme from './../../components/Theme/Theme';


function Header( props ){
    const {onSideBar, tasksLenght, activitiesLenght} = props;

    const handleSideBar = () => {
        onSideBar();
    };

    const handleDetails = () => {
        props.history.push( '/details' );
    };
    
    return (
        <div className='header'>
            <div className='row'>
                <span id='header-show' className='material-icons-outlined' onClick={handleSideBar}>menu</span>
                <Link to='/'><h1>EverTask</h1></Link>
                <Link to='/1'><p>Menu 1</p></Link>
                <Link to='/2'><p>Menu 2</p></Link>
                {(JSON.parse( localStorage.getItem( 'user' ) ) === '' || JSON.parse( localStorage.getItem( 'user' ) ) === null ) ? 
                    <Link to='/login'><span className="material-icons-round">login</span></Link> : 
                    <Link to='/profile'><div className='profile row' onClick={handleDetails}>
                        <img src={JSON.parse( localStorage.getItem( 'user' ) ).picture} alt='profile'/>
                        <div className='col'>
                            <b>{JSON.parse( localStorage.getItem( 'user' ) ).userName}</b>
                            <p>{JSON.parse( localStorage.getItem( 'user' ) ).firstName}</p>
                        </div>
                    </div></Link>}
                <Theme/>
            </div>
            <div className='counter'>
                <p>{tasksLenght} | {activitiesLenght}</p>
            </div>
            <div className='space'></div>
        </div>
    );
};

export default withRouter(Header);