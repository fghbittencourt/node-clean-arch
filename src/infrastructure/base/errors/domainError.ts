import ErrorBase from './errorBase'

export default class DomainError extends ErrorBase {
  httpStatus = 422
}
