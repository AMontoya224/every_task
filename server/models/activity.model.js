const mongoose = require( 'mongoose' );


const ActivitySchema = mongoose.Schema({
    title : {
        type: String,
        required: [true, 'Title is required.']
    },
    contents : {
        type : String,
        required : [true, 'Contents is required.' ]
    },
    date : {
        type : Date,
        required : [true, 'Date is required.' ]
    },
    status : {
        type : Boolean,
        required : [true, 'Status is required.' ]
    }
}, { timestamps: true } );

const Activity = mongoose.model( 'activities', ActivitySchema );

module.exports = {
    Activity,
    ActivitySchema
};