const express = require( 'express' );
const cors = require( 'cors' );
require( './config/mongoose.config' );
const validateToken = require( './util/validateToken' );
const app = express();
const UserRouter = require( './routes/user.route' );
const TaskRouter = require( './routes/task.route' );
const ActivityRouter = require( './routes/activity.route' );
app.use( cors() );
app.use( express.json() );

app.use( '/api/users', UserRouter);
app.use( '/api/tasks', validateToken, TaskRouter );
app.use( '/api/activities', validateToken, ActivityRouter);


app.listen( 7800, () => {
    console.log( 'Listening at Port 7800' );
});