const express = require( 'express' );
const TaskRouter = express.Router();
const TaskController = require( '../controllers/task.controller' );


TaskRouter.get( '/all', TaskController.getAllTasks );
TaskRouter.get( '/:_id', TaskController.getTask );
TaskRouter.post( '/new', TaskController.createTask );
TaskRouter.put( '/:_id/update', TaskController.updateTask );
TaskRouter.delete( '/:_id/delete', TaskController.deleteTask );

module.exports = TaskRouter;