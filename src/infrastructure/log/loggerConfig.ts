import winston from 'winston'

import { consoleMessageFormatter } from './loggerMessageFormatter'

export const levels = {
  debug: 4,
  error: 0,
  http: 3,
  info: 2,
  warn: 1,
}

export const colors = {
  debug: 'cyan',
  error: 'red',
  http: 'magenta',
  info: 'green',
  warn: 'yellow',
}

export const setupCurrentLevel = (): keyof typeof levels => {
  if (process.env.LOG_LEVEL) {
    return process.env.LOG_LEVEL as keyof typeof levels
  }

  const env = process.env.NODE_ENV || 'development'
  const isDevelopment = env === 'development'
  return isDevelopment ? 'debug' : 'warn'
}

export const commomConfig = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:SSS' }),
  winston.format.metadata({
    fillExcept: ['message', 'level', 'timestamp', 'label'],
  }),
)

export const consoleConfig = winston.format.combine(
  winston.format.colorize({ all: true }),
  winston.format.printf(consoleMessageFormatter),
)
