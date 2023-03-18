import winston from 'winston';
import { levels } from './loggerConfig';

export const consoleMessageFormatter = (info: winston.LogEntry): string => {
  let meta = '';

  if (Object.keys(info.metadata).length > 0) {
    meta = ` => ${JSON.stringify(info.metadata)}`;
  }

  return `[${info.level}] ${info.timestamp} -> ${info.message}${meta}`;
};

export const cloudWatchMessageFormatter = (info: winston.LogEntry): string => {
  return `[${info.level.toUpperCase()}] ${info.timestamp} ${JSON.stringify({
    pid: process.pid,
    level: levels[info.level as keyof typeof levels],
    timestamp: new Date(info.timestamp).getTime(),
    message: info.message,
    _log_type: 'application',
    extraInfo: {
      ...info.metadata
    }
  })}`;
};
