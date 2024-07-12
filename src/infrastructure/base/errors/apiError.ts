// import ErrorBase from './errorBase'

export enum ErrorType {
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  UNPROCESSABLE_ENTITY = 422
}

export default abstract class ApiError extends Error {
  statusCode: number

  constructor(
    status: ErrorType,
    message : string,
  ) {
    super(message)
    this.statusCode = status

    Error.captureStackTrace(this, this.constructor)
  }
}
