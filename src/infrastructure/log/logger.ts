import winston from 'winston';
import {
  colors,
  commomConfig,
  consoleConfig,
  levels,
  setupCurrentLevel
} from './loggerConfig';

winston.addColors(colors);

const transports: winston.transport[] = [
  new winston.transports.Console({
    format: consoleConfig
  })
];

const Logger = winston.createLogger({
  level: setupCurrentLevel(),
  levels,
  format: commomConfig,
  transports
});

export default Logger;

Logger.debug('Logger initialized');
