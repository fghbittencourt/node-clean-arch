import { Router } from 'express';
import { container } from 'tsyringe';
import HealthController from './health/healthController';

export default async (): Promise<Router> => {
  const router = Router();

  const healthController = container.resolve(HealthController);
  router.get('/', healthController.handle);

  return router;
};
