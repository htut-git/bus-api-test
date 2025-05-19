import winston from 'winston';
import 'winston-daily-rotate-file';
import path from 'path';

// Define log directory
const logDir = 'logs';

// Define daily rotation transport
const transport = new winston.transports.DailyRotateFile({
  dirname: path.join(logDir, 'application'),
  filename: '%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  level: 'info',
});

const errorTransport = new winston.transports.DailyRotateFile({
  dirname: path.join(logDir, 'errors'),
  filename: '%DATE%.error.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '10m',
  maxFiles: '30d',
  level: 'error',
});

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(
      ({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}]: ${message}`
    )
  ),
  transports: [
    transport,
    errorTransport
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({ format: winston.format.simple() }));
}

export default logger;
