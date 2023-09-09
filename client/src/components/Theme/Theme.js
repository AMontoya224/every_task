import React, { useState } from 'react';
import './Theme.css';


function Theme(){
    const [iconTheme, setIconTheme] = useState( () => {
        const initialValue = JSON.parse( localStorage.getItem( 'iconTheme' ) );
        return initialValue || false;
    });

    const changeTheme = () => {
        document.body.classList.toggle( 'dark-theme-variables' );
        if( document.body.classList.toString() === '' ){
            localStorage.setItem( 'iconTheme', JSON.stringify( false ) );
            setIconTheme( false );
        }
        else{
            localStorage.setItem( 'iconTheme', JSON.stringify( true ) );
            setIconTheme( true );
        }
    };

    return (
        <span className='material-icons theme-toggler' onClick={changeTheme}>
            {iconTheme ? "light_mode" : "dark_mode"}
        </span>
    )
};

export default Theme;