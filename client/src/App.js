import React, { useState } from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Header from './views/Header/Header';
import Left from './views/Left/Left';
import Right from './views/Right/Right';
import Information from './views/Information/Information';
import Home from './views/Home/Home';
import Register from './views/Register/Register';
import Login from './views/Login/Login';
import Profile from './views/Profile/Profile';
import EditPicture from './views/EditPicture/EditPicture';
import EditAccount from './views/EditAccount/EditAccount';
import EditUser from './views/EditUser/EditUser';
import Footer from './views/Footer/Footer';
import AddTask from './views/AddTask/AddTask';
import AddActivity from './views/AddActivity/AddActivity';
import AddChat from './views/AddChat/AddChat';
import EditTask from './views/EditTask/EditTask';
import EditActivity from './views/EditActivity/EditActivity';
import TasksAll from './components/TasksAll/TasksAll';
import ActivitiesAll from './components/ActivitiesAll/ActivitiesAll';
import AboutUs from './views/AboutUs/AboutUs';


function App() {
  const [token, setToken] = useState( localStorage.getItem( 'token' ) );
  const [tasks, setTasks] = useState( [] );
  const [activities, setActivities] = useState( [] );
  const url = 'https://every-task.onrender.com';

  const onToken = tokenNew => {
    setToken( tokenNew );
  };

  const onTasks = tasksNew => {
    setTasks( tasksNew );
  };

  const onActivities = activitiesNew => {
    setActivities( activitiesNew );
    
  };
/*
    useEffect( () => {
      if( token !== null ){
        console.log( 'tnnt')
      const config = {
          headers : {
              'api-token' : localStorage.getItem( 'token' )
          }
      };
      const userName = JSON.parse( localStorage.getItem( 'user' ) ).userName;
      axios.get( `http://localhost:8000/api/users/${userName}`, config )
          .then( res => {
              setTasks( res.data.tasks );
          })
          .catch( err => {})
        }
    }, [token]);

    useEffect( () => {
      if( token !== null ){
      const config = {
          headers : {
              'api-token' : localStorage.getItem( 'token' )
          }
      };
      const userName = JSON.parse( localStorage.getItem( 'user' ) ).userName;
      axios.get( `http://localhost:8000/api/users/${userName}`, config )
          .then( res => {
              setActivities( res.data.activities );
          })
          .catch( err => {})
        }
    }, [token]);
  */

  return (
    <div className="App">
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet"></link>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet"></link>
      
      <BrowserRouter>
        <Header token={token} tasks={tasks} activities={activities}/>
        {token === null ? <></> : <Left onToken={onToken}/>}
        {token === null ? <></> : <Right/>}
        <Switch>
          <Route exact path="/" render={ routeProps => <Information {...routeProps} />}/>
          <Route exact path="/home" render={ routeProps => <Home onTasks={onTasks} onActivities={onActivities} url={url} {...routeProps} />}/>
          <Route exact path="/editTask/:_id" render={ routeProps => <EditTask url={url} {...routeProps} />}/>
          <Route exact path="/editActivity/:_id" render={ routeProps => <EditActivity url={url} {...routeProps} />}/>
          <Route exact path="/register" render={ routeProps => <Register onToken={onToken} url={url} {...routeProps} />}/>
          <Route exact path="/login" render={ routeProps => <Login onToken={onToken} url={url} {...routeProps} />}/>
          <Route exact path="/profile" render={ routeProps => <Profile url={url} {...routeProps} />}/>
          <Route exact path="/editPicture" render={ routeProps => <EditPicture url={url} {...routeProps} />}/>
          <Route exact path="/editAccount" render={ routeProps => <EditAccount url={url} {...routeProps} />}/>
          <Route exact path="/editUser" render={ routeProps => <EditUser url={url} {...routeProps} />}/>
          <Route exact path="/addTask" render={ routeProps => <AddTask url={url} {...routeProps} />}/>
          <Route exact path="/addActivity" render={ routeProps => <AddActivity url={url} {...routeProps} />}/>
          <Route exact path="/addChat" render={ routeProps => <AddChat url={url} {...routeProps} />}/>
          <Route exact path="/tasks" render={ routeProps => <><h1>Tasks All</h1><TasksAll onTasks={onTasks} url={url} {...routeProps} /></>}/>
          <Route exact path="/activities" render={ routeProps => <><h1>Activities All</h1><ActivitiesAll onActivities={onActivities} url={url} {...routeProps} /></>}/>
          <Route exact path="/about-us" render={ routeProps => <AboutUs {...routeProps} />}/>
        </Switch>
        <Footer/>
      </BrowserRouter>
    </div>
  );
};

export default App;