import type { Request, Response, NextFunction, RequestHandler } from "express";

export default function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(err); // log erreur in the console (@TODO add logger)

  /**
   * delegate to the default Express error handler, when the headers have already been sent to the client
   * @see https://expressjs.com/en/guide/error-handling.html
   */
  if (res.headersSent) {
    return next(err);
  }

  res.status(500).json({ error: err.message }); // @TODO Custom Error with custom status in it
}
