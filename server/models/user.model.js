const mongoose = require( 'mongoose' );
const {TaskSchema} = require( './task.model' );
const {ActivitySchema} = require( './activity.model' );


const UserSchema = mongoose.Schema({
    email : {
        type: String,
        required: [true, 'Email is required.'],
        unique : [true, 'Email already exist.'],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: 'Please enter a valid email.'
        }
    },
    country : {
        type : String,
        required : [true, 'Country is required.' ],
    },
    firstName : {
        type : String,
        required : [true, 'First name is required.' ],
        minlength : [2, 'First name must be at least 2 characters long.'],
        validate: {
            validator: val => /^[a-zA-Z ]*$/.test(val),
            message: 'Please enter only letters.'
        }
    },
    lastName : {
        type : String,
        required : [true, 'Last name is required.' ],
        minlength : [2, 'Last name must be at least 2 characters long.'],
        validate: {
            validator: val => /^[a-zA-Z ]*$/.test(val),
            message: 'Please enter only letters.'
        }
    },
    userName : {
        type : String,
        required : [true, 'Username is required.' ],
        minlength : [5, 'Username must be at least 5 characters long.'],
        unique : [true, 'Username already exist.']
    },
    phone : {
        type : Number,
        required : [true, 'Phone is required.' ]
    },
    password : {
        type : String,
        required : [true, 'Password is required.' ]
    },
    picture : {
        type : String,
        required : [true, 'Profile picture is required.' ],
    },
    tasks : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'tasks'
    }],
    activities : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'activities'
    }]
}, { timestamps: true } );

const User = mongoose.model( 'users', UserSchema );

module.exports = User;