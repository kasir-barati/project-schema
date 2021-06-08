import { NextFunction, Request, Response } from 'express';

function csrf(req: any, res: Response, next: NextFunction) {
    const token = req.csrfToken();
    res.cookie('XSRF-TOKEN', token);

    next();
}

export { csrf };
