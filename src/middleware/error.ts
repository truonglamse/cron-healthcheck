import { Request, Response, NextFunction } from 'express';
import StatusCodes from 'http-status-codes';
// import logger from '../shared/Logger';
// import winstonLog from '../shared/Winston-Logger'

const { BAD_REQUEST } = StatusCodes;



export default (err: Error, req: Request, res: Response, next: NextFunction) => {
    // logger.err(err, true);
    // winstonLog.error(err)

    if (process.env.NODE_ENV == "development") console.log(err)
    
    //@ts-ignore
    let responseError = err?.fields ? err.fields : err?.message || "Unknown error"
    
    return res.status(BAD_REQUEST).json({
        success: false,
        error: responseError,
        stack : process.env.NODE_ENV == "development" ? err?.stack?.split("\n") : ""
    });
}