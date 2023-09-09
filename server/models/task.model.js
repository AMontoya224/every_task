const mongoose = require( 'mongoose' );


const TaskSchema = mongoose.Schema({
    title : {
        type: String,
        required: [true, 'Title is required.']
    },
    contents : {
        type : String,
        required : [true, 'Contents is required.' ]
    },
    status : {
        type : Boolean,
        required : [true, 'Status is required.' ]
    },
    created_at : {
        type: Date,
        required : true
    }
});

const Task = mongoose.model( 'tasks', TaskSchema );

module.exports = {
    Task,
    TaskSchema
};