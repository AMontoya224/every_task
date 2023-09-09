const express = require( 'express' );
const UserRouter = express.Router();
const UserController = require( '../controllers/user.controller' );
const validateToken = require( '../util/validateToken' );


UserRouter.get( '/all', validateToken, UserController.getAllUsers );
UserRouter.get( '/:userName', validateToken, UserController.getUser );
UserRouter.post( '/register', UserController.registerUser );
UserRouter.get( '/register/email/:email', UserController.registerUserEmail );
UserRouter.get( '/register/userName/:userName', UserController.registerUserName );
UserRouter.post( '/login', UserController.loginUser );
UserRouter.put( '/:userName/update', validateToken, UserController.updateUser );
UserRouter.delete( '/:userName/delete', validateToken, UserController.deleteUser );

module.exports = UserRouter;