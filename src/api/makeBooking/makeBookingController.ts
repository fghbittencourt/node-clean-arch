import { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import { inject, injectable } from 'tsyringe';
import ExpressController from '../../infrastructure/base/api/expressController';
import HTTPStatus from '../../infrastructure/base/api/httpStatus';
import Logger from '../../infrastructure/log/logger';
import MakeBooking from '../../useCases/makeBooking/makeBooking';

@injectable()
export default class MakeBookingController implements ExpressController {
  validations = [
    check('date').isISO8601().toDate(),
    check('flightNumber').isNumeric(),
    check('customer.name').trim().notEmpty(),
    check('customer.email').trim().notEmpty().isEmail(),
    check('passengers').isArray(),
    check('passengers.*.name').trim().notEmpty(),
    check('passengers.*.passportNumber').trim().notEmpty()
  ];

  constructor(@inject(MakeBooking) public readonly useCase: MakeBooking) {}

  handle = async (req: Request, res: Response): Promise<void> => {
    try {
      Logger.debug('handle - Calling use case MakeBooking');

      const schemaErrors = validationResult(req);

      if (!schemaErrors.isEmpty()) {
        res.status(HTTPStatus.BAD_REQUEST).send(schemaErrors.array());
        return;
      }

      const output = await this.useCase.execute(req.body);

      Logger.debug('handle - Called use case MakeBooking');

      res.send(output);
    } catch (error) {
      Logger.error(
        `handle - Error in MakeBookingController: ${error.message}`,
        {
          constructor: this.constructor.name
        }
      );
      res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
  };
}
