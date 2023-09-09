const express = require( 'express' );
const ActivityRouter = express.Router();
const ActivityController = require( '../controllers/activity.controller' );


ActivityRouter.get( '/all', ActivityController.getAllActivities );
ActivityRouter.get( '/:_id', ActivityController.getActivity );
ActivityRouter.post( '/new', ActivityController.createActivity );
ActivityRouter.put( '/:_id/update', ActivityController.updateActivity );
ActivityRouter.delete( '/:_id/delete', ActivityController.deleteActivity );

module.exports = ActivityRouter;