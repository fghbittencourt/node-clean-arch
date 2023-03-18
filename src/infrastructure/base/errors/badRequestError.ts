import ErrorBase from './errorBase';

const buildErrorMessage = (msg: string, details?: unknown): string => {
  return `${msg} ${details ? JSON.stringify(details) : ''}`;
};
export default class BadRequestError extends ErrorBase {
  constructor(msg: string, details?: unknown) {
    super(buildErrorMessage(msg, details));

    this.details = details;
  }

  details: unknown;

  httpStatus = 400;
}
