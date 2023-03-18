import { validate } from 'class-validator';
import Logger from '../../log/logger';

export default abstract class PayloadBase {
  validate = async (): Promise<void> => {
    const validation = await validate(this);
    if (validation.length > 0) {
      Logger.error(`Error validating payload`, {
        constructor: this.constructor.name
      });
      throw new Error(JSON.stringify(validation));
    }
  };
}
