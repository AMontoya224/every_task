const User = require( './../models/user.model' );
const {Task} = require( './../models/task.model' );


const getAllTasks = ( request, response ) => {
    Task.find()
        .then( tasks => response.status( 200 ).json( tasks ) )
        .catch( err => { return response.status( 400 ).json({err, statusText:'There was an error executing the find.'}) });
};

const getTask = ( request, response ) => {
    const {_id} = request.params;

    Task.findOne( {_id} )
    .then( task => response.status( 200 ).json( task ) )
    .catch( err => { return response.status( 400 ).json({err, statusText:'There was an error executing the findOne.'}) });
};

const createTask = ( request, response ) => {
    const {title, contents, userName} = request.body;
    const fecha = new Date();
    
    User.find( {userName} )
        .then( userFound => {
            if( userFound === null ){
                return response.status( 201 ).json({statusText:'User not found.'})
            }
            else{
                const taskNew = {
                    title,
                    contents,
                    status : false,
                    created_at : fecha.getTime()
                };
        
                Task.create( taskNew )
                    .then( taskCreated => {
                        User.findOneAndUpdate( {userName}, { $push : { tasks : taskCreated._id } } )
                            .then( () => {
                                return response.status( 201 ).json( taskCreated );
                            });
                    })
                    .catch( err => { return response.status( 400 ).json({err, statusText:'There was an error executing the create.'}) });
            }
        })
        .catch( err => { return response.status( 400 ).json({err, statusText:'Hubo un error al ejecutar el insert.'}) });
};

const updateTask = ( request, response ) => {
    const {_id} = request.params;

    Task.findOneAndUpdate( {_id}, request.body, { runValidators: true, new: true } )
        .then( taskUpdate => response.status( 202 ).json( taskUpdate ) )
        .catch( err => { return response.status( 400 ).json({err, statusText:'There was an error executing the update.'}) });
    /* Pendiente por hacer: actualizar listado de Usuarios */
};

const deleteTask = ( request, response ) => {
    const {_id} = request.params;

    Task.deleteOne( {_id} )
        .then( () => response.status( 204 ).end() )
        .catch( err => { return response.status( 400 ).json({err, statusText:'There was an error executing the delete.'}) });
};

const TaskController = {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
};

module.exports = TaskController;