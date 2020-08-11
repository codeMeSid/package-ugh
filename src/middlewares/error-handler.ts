import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-error';
import { errorlog } from '../utils/logger';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
	errorlog(err.message);
	if (err instanceof CustomError) {
		return res.status(err.statusCode).send({ errors: err.serializeErrors() });
	}
	res.status(400).send({
		errors: [{ message: 'Something went wrong' }],
	});
};
