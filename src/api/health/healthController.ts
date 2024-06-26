import { Request, Response } from 'express'
import { injectable } from 'tsyringe'

import ExpressController from '../../infrastructure/base/api/expressController'
import Logger from '../../infrastructure/log/logger'

@injectable()
export default class HealthController implements ExpressController {
  handle = async (req: Request, res: Response): Promise<void> => {
    Logger.debug('handle - Calling Health Check')

    const check = {
      app: process.env.APP_NAME,
      httpStatus: 200,
      status: 'healthy',
      timestamp: Date.now(),
      uptime: process.uptime(),
    }

    res.status(check.httpStatus).send(check)
    Logger.debug('handle - Called Health Check')
  }

  validations = []
}
