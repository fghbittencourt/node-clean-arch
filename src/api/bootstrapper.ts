import { DependencyContainer } from 'tsyringe';
import Logger from '../infrastructure/log/logger';

export default async (container: DependencyContainer): Promise<void> => {
  Logger.debug('Bootstrapper initializing...');
  // Be careful, the order of these calls are important

  Logger.debug('Bootstrapper initialized!');
};
