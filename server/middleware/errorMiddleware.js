const notFound=(req, res, next)=>{
    const error= new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error)
};

const errorHandler= (err, req, res, next)=>{
    let statusCode= res.statusCode === 200 ? 500 : res.statusCode;
    let message= err.message;

    // check for mongoose objectId
    if(err.name==='CastError' && err.kind==='ObjectId'){
        message= `Resource not found`;
        statusCode= 404;
    }

    res.status(statusCode).json({message, 
        stack: process.env.NODE_ENV === 'production' ? '🍻' : err.stack,
    });

    // The stack property in the response is useful for debugging purposes. It provides the stack trace of the error, which helps developers identify where the error occurred in the code.
    //In production, it's common to hide detailed error information for security reasons, so the stack trace is replaced with a generic message (in this case, '🍻'). In development, the actual stack trace is returned, allowing developers to troubleshoot issues more effectively.
}

export {notFound, errorHandler};