const User = require( './../models/user.model' );
const {Activity} = require( './../models/activity.model' );


const getAllActivities = ( request, response ) => {
    Activity.find()
        .then( Activities => response.status( 200 ).json( Activities ) )
        .catch( err => {
            response.statusMessage = 'There was an error executing the find.';
            return response.status( 400 ).json( err ) 
        });
};

const getActivity = ( request, response ) => {
    const {_id} = request.params;

    Activity.findOne( {_id} )
    .then( Activity => response.status( 200 ).json( Activity ) )
    .catch( err => {
        response.statusMessage = 'There was an error executing the findOne.';
        return response.status( 400 ).json( err ) 
    });
};

const createActivity = ( request, response ) => {
    const {title, contents, date, userName} = request.body;
    
    User.find( {userName} )
        .then( userFound => {
            if( userFound === null ){
                response.statusMessage = 'User not found.';
                return response.status( 201 ).end();
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
                    .catch( err => {
                        response.statusMessage = 'There was an error executing the create.';
                        return response.status( 400 ).json( err );
                    });
            }
        })
        .catch( err => {
            response.statusMessage = "Hubo un error al ejecutar el insert. " + err;
            return response.status( 400 ).end();
        });
};

const updateActivity = ( request, response ) => {
    const {_id} = request.params;

    Activity.findOneAndUpdate( {_id}, request.body, { runValidators: true, new: true } )
        .then( activityUpdate => response.status( 202 ).json( activityUpdate ) )
        .catch( err => {
            response.statusMessage = 'There was an error executing the update.';
            return response.status( 400 ).json( err ) 
        });
    /* Pendiente por hacer: actualizar listado de Usuarios */
};

const deleteActivity = ( request, response ) => {
    const {_id} = request.params;

    Activity.deleteOne( {_id} )
        .then( () => response.status( 204 ).end() )
        .catch( err => {
            response.statusMessage = "There was an error executing the delete. ";
            return response.status( 400 ).json( err )
        });
};

const ActivityController = {
    getAllActivities,
    getActivity,
    createActivity,
    updateActivity,
    deleteActivity
};

module.exports = ActivityController;