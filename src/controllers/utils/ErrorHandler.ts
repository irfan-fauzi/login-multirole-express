import { type Response } from "express"

export const errorHandler = (res: Response, error: any) => {
  if (error != null && error instanceof Error) {
    return res.status(500).send({
      status: 500,
      message: `😢 error because: ${error.message}`,
      errors: error,
    });
  }
  return res.status(500).send({
    status: 500,
    message: `🖥 internal server error`,
    errors: error,
  });
}