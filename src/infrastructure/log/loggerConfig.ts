import winston from 'winston';
import { consoleMessageFormatter } from './loggerMessageFormatter';

export const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4
};

export const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'cyan'
};

export const setupCurrentLevel = (): keyof typeof levels => {
  if (process.env.LOG_LEVEL) {
    return process.env.LOG_LEVEL as keyof typeof levels;
  }

  const env = process.env.NODE_ENV || 'development';
  const isDevelopment = env === 'development';
  return isDevelopment ? 'debug' : 'warn';
};

export const commomConfig = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:SSS' }),
  winston.format.metadata({
    fillExcept: ['message', 'level', 'timestamp', 'label']
  })
);

export const consoleConfig = winston.format.combine(
  winston.format.colorize({ all: true }),
  winston.format.printf(consoleMessageFormatter)
);
