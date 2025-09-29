import { StatusCodes } from "http-status-codes";

// const errorHandlerMiddleware = (err, req, res, next) => {
//     console.log(err);
//     const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
//     const msg = err.message || 'Something wet wrong, try again later'
//     res.status(statusCode).json({msg: 'Something went wrong'});

//     if (Array.isArray(message)) {
//     return res.status(statusCode).json({ errors: message });
//   }

//   // Handle Mongoose validation errors
//   if (err.name === 'ValidationError') {
//     const mongooseErrors = Object.values(err.errors).map((e) => e.message);
//     return res.status(StatusCodes.BAD_REQUEST).json({ errors: mongooseErrors });
//   }

//   return res.status(statusCode).json({ error: message });
// };


const errorHandlerMiddleware = (err, req, res, next) => {
  console.error('ERROR OBJECT:', err);

  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;

  // If BadRequestError carried multiple messages
  if (err.messages && Array.isArray(err.messages)) {
    return res.status(statusCode).json({ errors: err.messages });
  }

  // Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
    const mongooseErrors = Object.values(err.errors).map((e) => e.message);
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: mongooseErrors });
  }

  // Default fallback
  return res.status(statusCode).json({ error: err.message || 'Something went wrong' });
};



export default errorHandlerMiddleware;