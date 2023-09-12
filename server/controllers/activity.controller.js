const User = require( './../models/user.model' );
const {Activity} = require( './../models/activity.model' );


const getAllActivities = ( request, response ) => {
    Activity.find()
        .then( Activities => response.status( 200 ).json( Activities ) )
        .catch( err => { return response.status( 400 ).json({err, statusText:'There was an error executing the find.'}) });
};

const getActivity = ( request, response ) => {
    const {_id} = request.params;

    Activity.findOne( {_id} )
    .then( Activity => response.status( 200 ).json( Activity ) )
    .catch( err => { return response.status( 400 ).json({err, statusText:'There was an error executing the findOne.'}) });
};

const createActivity = ( request, response ) => {
    const {title, contents, date, userName} = request.body;
    
    User.find( {userName} )
        .then( userFound => {
            if( userFound === null ){
                return response.status( 201 ).json({statusText:'User not found.'})
            }
            else{
                const activityNew = {
                    title,
                    contents,
                    date,
                    status : false
                };
        
                Activity.create( activityNew )
                    .then( activityCreated => {
                        User.findOneAndUpdate( {userName}, { $push : { activities : activityCreated._id } } )
                            .then( () => {
                                return response.status( 201 ).json( activityCreated );
                            });
                    })
                    .catch( err => { return response.status( 400 ).json({err, statusText:'There was an error executing the create.'}) });
            }
        })
        .catch( err => { return response.status( 400 ).json({err, statusText:'Hubo un error al ejecutar el insert.'}) });
};

const updateActivity = ( request, response ) => {
    const {_id} = request.params;

    Activity.findOneAndUpdate( {_id}, request.body, { runValidators: true, new: true } )
        .then( activityUpdate => response.status( 202 ).json( activityUpdate ) )
        .catch( err => { return response.status( 400 ).json({err, statusText:'There was an error executing the update.'}) });
    /* Pendiente por hacer: actualizar listado de Usuarios */
};

const deleteActivity = ( request, response ) => {
    const {_id} = request.params;

    Activity.deleteOne( {_id} )
        .then( () => response.status( 204 ).end() )
        .catch( err => { return response.status( 400 ).json({err, statusText:'There was an error executing the delete.'}) });
};

const ActivityController = {
    getAllActivities,
    getActivity,
    createActivity,
    updateActivity,
    deleteActivity
};

module.exports = ActivityController;