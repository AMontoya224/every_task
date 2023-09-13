import React, { useState } from 'react';
import {Link, withRouter} from 'react-router-dom';
import './Left.css';


function Left( props ){
    const {onToken} = props;
    const [activeLeft, setActiveLeft] = useState( 0 );

    const handleBoxToggle = idx => {
        setActiveLeft( idx);
    };

    const onLogout = () => {
        localStorage.removeItem( 'token' );
        localStorage.removeItem( 'user' );
        onToken( null );
        props.history.push( '/' );
    };

    return (
        <div className='left'>
            <aside>
                <div className="sidebar">
                    <Link to='/home' onClick={() => handleBoxToggle( 0 )} className={( activeLeft === 0 ) ? 'active' : 'deactivated'}>
                        <span className="material-icons-round">home</span>
                        <h3>Home</h3>
                    </Link>
                    <Link to='/tasks' onClick={() => handleBoxToggle( 1 )} className={( activeLeft === 1 ) ? 'active' : 'deactivated'}>
                        <span className="material-icons-round">task_alt</span>
                        <h3>Daily tasks</h3>
                    </Link>
                    <Link to='/activities' onClick={() => handleBoxToggle( 2 )} className={( activeLeft === 2 ) ? 'active' : 'deactivated'}>
                        <span className="material-icons-round">storage</span>
                        <h3>Activities</h3>
                    </Link>
                    <Link to='/analysis' onClick={() => handleBoxToggle( 3 )} className={( activeLeft === 3 ) ? 'active' : 'deactivated'}>
                        <span className="material-icons-round">query_stats</span>
                        <h3>Statistics</h3>
                    </Link>
                    <Link to='/community' onClick={() => handleBoxToggle( 4 )} className={( activeLeft === 4 ) ? 'active' : 'deactivated'}>
                        <span className="material-icons-round">public</span>
                        <h3>Community</h3>
                    </Link>
                    <Link to='/about-us' onClick={() => handleBoxToggle( 5 )} className={( activeLeft === 5 ) ? 'active' : 'deactivated'}>
                        <span className="material-icons-round">diversity_3</span>
                        <h3 >About us</h3>
                    </Link>
                    <Link to='/settings' onClick={() => handleBoxToggle( 6 )} className={( activeLeft === 6 ) ? 'active' : 'deactivated'}>
                        <span className="material-icons-round">settings</span>
                        <h3>Settings</h3>
                    </Link>
                    <Link to='/' onClick={onLogout} className='deactivated'>
                        <span className="material-icons-round">logout</span>
                        <h3>Logout</h3>
                    </Link>
                </div>
            </aside>
        </div>
    );
};

export default withRouter(Left);