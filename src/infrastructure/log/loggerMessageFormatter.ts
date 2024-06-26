import winston from 'winston'

import { levels } from './loggerConfig'

export const consoleMessageFormatter = (info: winston.LogEntry): string => {
  let meta = ''

  if (Object.keys(info.metadata).length > 0) {
    meta = ` => ${JSON.stringify(info.metadata)}`
  }

  return `[${info.level}] ${info.timestamp} -> ${info.message}${meta}`
}

export const cloudWatchMessageFormatter = (info: winston.LogEntry): string => `[${info.level.toUpperCase()}] ${info.timestamp} ${JSON.stringify({
  _log_type: 'application',
  extraInfo: {
    ...info.metadata,
  },
  level: levels[info.level as keyof typeof levels],
  message: info.message,
  pid: process.pid,
  timestamp: new Date(info.timestamp).getTime(),
})}`
