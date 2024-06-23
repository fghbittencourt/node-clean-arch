import { Router } from 'express';
import { container } from 'tsyringe';
import HealthController from './health/healthController';
import MakeBookingController from './makeBooking/makeBookingController';

export default async (): Promise<Router> => {
  const router = Router();

  const healthController = container.resolve(HealthController);
  router.get('/', healthController.handle);

  const makeBookingController = container.resolve(MakeBookingController);
  router.post(
    '/makeBooking',
    makeBookingController.validations,
    makeBookingController.handle
  );

  return router;
};
