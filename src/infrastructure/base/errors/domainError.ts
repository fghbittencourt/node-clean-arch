import ApiError, { ErrorType } from './apiError'

export default class DomainError extends ApiError {
  constructor(msg: string) {
    super(ErrorType.UNPROCESSABLE_ENTITY, msg)
  }
}
