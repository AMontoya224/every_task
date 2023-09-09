const mongoose = require("mongoose")

mongoose.connect( process.env.MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then( () => console.log( 'Established a connection to the database' ) )
    .catch( err => console.log( 'Something went wrong when connecting to the database', err ) );

mongoose.connection.on( 'Error', ( err ) => {
    console.log( 'Mongoose bug: ' + err );
    process.exit( 0 );
});

mongoose.connection.on( 'Disconnected', () => console.log( 'Offline Database' ) );