const jwt = require('jsonwebtoken');
const User = require('../models/User')
const {UnauthenticatedError} = require('../errors');

const authenticationMiddleWare = async (req,res,next) =>{

    const authHeaders = req.headers.authorization;
    if(!authHeaders || !authHeaders.startsWith('Bearer ')){
        throw new UnauthenticatedError('invalid token')
    }

    const token = authHeaders.split(' ')[1];

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRETE);
        const {userID, name} = decoded;
        req.user = {userID, name};
        next()
    }catch(error){
        throw new UnauthenticatedError('unauthorized token')
    }
}


module.exports = authenticationMiddleWare;