import ApiError, { ErrorType } from './apiError'

export default class NotFoundError extends ApiError {
  constructor(msg: string) {
    super(ErrorType.NOT_FOUND, msg)
  }
}
