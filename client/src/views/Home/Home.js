import React from 'react';
import './Home.css';
import TasksAll from './../../components/TasksAll/TasksAll';
import ActivitiesAll from './../../components/ActivitiesAll/ActivitiesAll';


function Home( props ){
    const { onActivities, onTasks, url } = props;
    
    return (
        <div className='home'>
            <div className='tasks'>
                <h1>Tasks to do today!!</h1>
                <TasksAll onTasks={onTasks} url={url}/>
            </div>
            <div className='activities'>
                <h1>Future activities, but don't forget to do them</h1>
                <ActivitiesAll onActivities={onActivities} url={url}/>
            </div>
        </div>
    );
};

export default Home;