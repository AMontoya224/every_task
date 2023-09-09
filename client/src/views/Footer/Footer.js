import React from 'react';
import './Footer.css';


function Footer( props ){
    return (
        <div className='footer'>
            <h3>
                EverTask
            </h3>
            <p>
                EverTask is a well-designed app for managing your daily life better. Tasks, to-do lists, 
                reminders, appointments, memos, grocery lists… all in one place, so you do not need to spend extra 
                money for other apps.
            </p>
            <p>
                EverTask helps to manage your life by responsive calendar view, flexible tasks and lists and 
                powerful notes. Tired to record memos by typing? Try to add an audio memo directly in app.
            </p>
        </div>
    );
};

export default Footer;