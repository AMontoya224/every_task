const bcrypt = require( 'bcrypt' );
const res = require( 'express/lib/response' );
const { render } = require( 'express/lib/response' );
const saltRound = 10;
const jwt = require( 'jsonwebtoken' );
const secret = 'This is secret';
const User = require( './../models/user.model' );
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

const getAllUsers = ( request, response ) => {
    User.find()
        .then( users => response.status( 200 ).json( users ) )
        .catch( err => {
            response.statusMessage = 'There was an error executing the find.';
            return response.status( 400 ).json( err ) 
        });
};

const getUser = ( request, response ) => {
    const {userName} = request.params;

    User.findOne( {userName} )
        .populate( 'tasks', ['_id', 'title', 'contents', 'status', 'created_at'])
        .populate( 'activities', ['_id', 'title', 'contents', 'date', 'status'])
        .then( user => response.status( 200 ).json( user ) )
        .catch( err => {
            response.statusMessage = 'There was an error executing the findOne.';
            return response.status( 400 ).json( err ) 
        });
};

const registerUserEmail = ( request, response ) => {
    const {email} = request.params;
    const codeRandom = email[0].toUpperCase() + '-' + Math.floor( Math.random() * (900000) + 100000 );

    User.findOne( {email} )
        .then( user => {
            if( user === null ){
                transporter.sendMail({
                    from: '"Andres Montoya" <'+process.env.EMAIL_USER+'>',
                    to: email,
                    subject: "Verification Code",
                    html: "<h3>Verification Code</h3>" + "<h1>"+codeRandom+"</h1>"
                })
                .then( () => {
                    response.statusMessage = 'Send code to email.';
                    return response.status( 200 ).json( {codeRandom} )
                })
                .catch( err => {
                    response.statusMessage = 'Email could not be sent.';
                    return response.status( 400 ).json( err ) 
                });
            }
            else{
                response.statusMessage = 'Email is already registered.';
                return response.status( 200 ).end();
            }
        })
        .catch( err => {
            response.statusMessage = 'There was an error executing the findOne.';
            return response.status( 400 ).json( err ) 
        });
};

const registerUserName = ( request, response ) => {
    const {userName} = request.params;

    User.findOne( {userName} )
        .then( user => response.status( 200 ).json( user ) )
        .catch( err => {
            response.statusMessage = 'There was an error executing the findOne.';
            return response.status( 400 ).json( err ) 
        });
};

const registerUser = ( request, response ) => {
    const {email, country, firstName, lastName, userName, phone, password, picture} = request.body;
    
    if( email && country && firstName && lastName && userName && phone && password && picture ){
        bcrypt.hash( password, saltRound )
            .then( encryptedPassword => {
                const userNew = {
                    email,
                    country,
                    firstName,
                    lastName,
                    userName,
                    phone,
                    password : encryptedPassword,
                    picture
                };
                User.create( userNew )
                    .then( userCreated => {
                        const payload = {
                            userCreated
                        };

                        const expiration = {
                            expiresIn : '25m'
                        };

                        jwt.sign( payload, secret, expiration, ( err, token ) => {
                            return response.status( 201 ).json( {token, userCreated} );
                        });
                    })
                    .catch( err => {
                        response.statusMessage = 'There was an error executing the create.';
                        return response.status( 400 ).json( err ) 
                    });
            })
    }
    else{
        response.statusMessage = "Complete data is required."
        return response.status( 400 ).end();
    }
};

const loginUser = ( request, response ) => {
    const {userName, password} = request.body;

    User.findOne( {userName} )
        .then( userFound => {
            if( userFound === null ){
                response.statusMessage = 'User not found.';
                return response.status( 201 ).end();
            }
            else{
                bcrypt.compare( password, userFound.password )
                    .then( result => {
                        if( !result ){
                            response.statusMessage = 'Invalid credentials.';
                            return response.status( 201 ).end();
                        }
                        else{
                            const payload = {
                                userFound
                            };

                            const expiration = {
                                expiresIn : '25m'
                            };

                            jwt.sign( payload, secret, expiration, ( err, token ) => {
                                response.statusMessage = 'Valid credentials.';
                                return response.status( 201 ).json( {token, userFound} );
                            });
                        }
                    });
            }
        })
        .catch( err => {
            response.statusMessage = 'There was an error executing the findOne.';
            return response.status( 400 ).json( err ) 
        });
};

const updateUser = ( request, response ) => {
    const {userName} = request.params;
    /*const {password} = request.body;
    console.log('eoeo' + password )
    if( password !== null ){
        const {firstName, lastName, userName, phone} = request.body;
        bcrypt.hash( password, saltRound )
            .then(encryptedPassword => {
                const userNew = {
                    firstName,
                    lastName,
                    userName,
                    phone,
                    password : encryptedPassword
                };
                User.findOneAndUpdate( {userName}, userNew, { runValidators: true, new: true } )
                    .then( userUpdate => response.status( 202 ).json( userUpdate ) )
                    .catch( err => {
                        response.statusMessage = 'There was an error executing the update.';
                        return response.status( 400 ).json( err ) 
                    });
            })
    }*/
    User.findOneAndUpdate( {userName}, request.body, { runValidators: true, new: true } )
        .then( userUpdate => response.status( 202 ).json( userUpdate ) )
        .catch( err => {
            response.statusMessage = 'There was an error executing the update.';
            return response.status( 400 ).json( err ) 
        });
};

const deleteUser = ( request, response ) => {
    const {userName} = request.params;

    User.deleteOne( {userName} )
        .then( () => response.status( 204 ).end() )
        .catch( err => {
            response.statusMessage = "There was an error executing the delete. ";
            return response.status( 400 ).json( err )
        });
};

const UserController = {
    getAllUsers,
    getUser,
    registerUser,
    registerUserEmail,
    registerUserName,
    loginUser,
    updateUser,
    deleteUser
}

module.exports = UserController;