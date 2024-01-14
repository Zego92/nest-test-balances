// Core
import { WinstonModule } from 'nest-winston';
import { transports, format } from 'winston';
import 'winston-daily-rotate-file';

const errorTransport = new transports.DailyRotateFile({
  datePattern: 'YYYY-MM-DD',
  filename: `logs/%DATE%-error.log`,
  format: format.combine(format.timestamp(), format.json()),
  level: 'error',
  maxFiles: '30d',
  zippedArchive: false,
});

const warnTransport = new transports.DailyRotateFile({
  datePattern: 'YYYY-MM-DD',
  filename: `logs/%DATE%-warn.log`,
  format: format.combine(format.timestamp(), format.json()),
  level: 'warn',
  maxFiles: '30d',
  zippedArchive: false,
});

const combinedTransport = new transports.DailyRotateFile({
  datePattern: 'YYYY-MM-DD',
  filename: `logs/%DATE%-combined.log`,
  format: format.combine(format.timestamp(), format.json()),
  maxFiles: '30d',
  zippedArchive: false,
});

const consoleTransport = new transports.Console({
  format: format.combine(
    format.cli(),
    format.splat(),
    format.timestamp(),
    format.printf(
      ({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`,
    ),
  ),
});

export const createLogger = () => {
  return WinstonModule.createLogger({
    transports: [
      combinedTransport,
      consoleTransport,
      errorTransport,
      warnTransport,
    ],
  });
};
