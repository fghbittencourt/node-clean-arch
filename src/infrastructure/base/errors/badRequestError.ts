import ApiError, { ErrorType } from './apiError'

export default class BadRequestError extends ApiError {
  constructor(msg: string) {
    super(ErrorType.BAD_REQUEST, msg)
  }
}
