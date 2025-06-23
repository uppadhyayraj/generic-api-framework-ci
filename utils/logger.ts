// utils/logger.ts
import pino from 'pino';
import pinoHttp from 'pino-http';

// Configure the main logger instance for general application logging
const logger = pino({
  level: 'info', // Default logging level
  transport: { // Configuration for pretty-printing logs to console
    target: 'pino-pretty',
    options: {
      destination: 1, // Output to stdout
      colorize: true, // Enable colorful output in console
      levelFirst: true, // Show log level before message
      messageFormat: '{msg}', // Format the log message
      ignore: 'pid,hostname', // Exclude process ID and hostname from output for cleaner logs
      customLevels: { // Define custom log levels if needed (standard pino levels are: fatal, error, warn, info, debug, trace)
        error: 50, // Standard pino error level
        warn: 40,  // Standard pino warn level
        info: 30,  // Standard pino info level
        debug: 20, // Standard pino debug level
        trace: 10, // Standard pino trace level
      },
      customColors: 'error:red,warn:yellow,info:green,debug:blue,trace:magenta', // Custom colors for log levels
    }
  }
});

// Configure an HTTP logger instance for logging incoming HTTP requests/responses
const httpLogger = pinoHttp({
  logger, // Use the main logger instance
  customLogLevel: (res, err) => { // Custom logic to determine log level based on HTTP response
    if (res.statusCode && res.statusCode >= 400 && res.statusCode < 500) return 'warn'; // Client errors are warnings
    if ((res.statusCode && res.statusCode >= 500) || err) return 'error'; // Server errors or exceptions are errors
    return 'info'; // All other successful requests are info
  },
  // Optional: Define properties to ignore from the request/response object to keep logs clean
  // ignorePaths: ['/healthcheck'],
});

export { logger, httpLogger };
