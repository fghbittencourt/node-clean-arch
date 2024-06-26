import { Request, Response } from 'express'
import { ValidationChain } from 'express-validator'

export default interface ExpressController {
  handle(req: Request, res: Response): Promise<void>;
  // Array of validations that will be performed on request
  validations: ValidationChain[];
}
