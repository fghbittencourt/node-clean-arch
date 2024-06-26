import ErrorBase from './errorBase'

const buildErrorMessage = (msg: string, details?: unknown): string => `${msg} ${details ? JSON.stringify(details) : ''}`
export default class BadRequestError extends ErrorBase {
  details: unknown

  httpStatus = 400

  constructor(msg: string, details?: unknown) {
    super(buildErrorMessage(msg, details))

    this.details = details
  }
}
