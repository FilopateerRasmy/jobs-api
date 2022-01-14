const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    //set default 
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg:err.message || 'something went wrong try again later'
  }
  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message })
  // }
  if(err.name === 'ValidationError'){
    customError.msg = Object.values(err.errors).map(item => item.message ).join(',');
    customError.statusCode = 400
  }
  if(err.name === 'CastError'){
    customError.msg = `no item found with id: ${err.value}`;
    customError.statusCode = 404
  }
  if(err.code && err.code === 11000){
    customError.msg = `Duplicat Value enterd For ${Object.keys(err.keyValue)} field please choose another value`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
    return res.status(customError.statusCode).json({ msg:customError.msg })
  }
  return res.status(customError.statusCode).json({ msg:customError.msg})
}

module.exports = errorHandlerMiddleware
