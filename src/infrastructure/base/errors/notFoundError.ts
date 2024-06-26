import ErrorBase from './errorBase'

export default class NotFoundError extends ErrorBase {
  httpStatus = 404
}
