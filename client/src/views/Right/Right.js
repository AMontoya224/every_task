import React from 'react';
import {Link} from 'react-router-dom';
import './Right.css';


function Right( props ){
    return (
        <div className='right'>
            <Link to='/addTask' className='right-buttom'><span className="material-icons-round">add_task</span></Link>
            <Link to='/addActivity' className='right-buttom'><span className="material-icons-round">event_available</span></Link>
            <Link to='/addChat' className='right-buttom'><span className="material-icons-round">add_comment</span></Link>
        </div>
    );
};

export default Right;