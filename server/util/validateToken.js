const jwt = require( 'jsonwebtoken' );
const secret = process.env.JWT_SECRET;


function validateToken( request, response, next ){
    const token = request.headers['api-token'];
    
    jwt.verify( token, secret, ( err, decoded ) => {
        if( err ){
            response.statusMessage = 'Not authorized';
            return response.status( 406 ).end();
        }
        else{
            next();
        }
    });
};

module.exports = validateToken;