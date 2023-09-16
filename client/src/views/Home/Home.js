import React from 'react';
import './Home.css';
import TasksAll from './../../components/TasksAll/TasksAll';
import ActivitiesAll from './../../components/ActivitiesAll/ActivitiesAll';


function Home( props ){
    const { onActivities, onTasks, url } = props;
    
    return (
        <div className='home'>
            <div className='tasks'>
                <h4>¡Tareas para hacer hoy!</h4>
                <TasksAll onTasks={onTasks} url={url}/>
            </div>
            <div className='activities'>
                <h4>Actividades futuras, pero no olvides realizarlas</h4>
                <ActivitiesAll onActivities={onActivities} url={url}/>
            </div>
        </div>
    );
};

export default Home;