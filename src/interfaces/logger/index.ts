//@collapse

// Import Enums
import { LogLevel } from "../../enums";

/**
 * @interface `LoggerConfig`
 *
 * Provides configuration options for the `Logger` class, defining paths, output preferences, and general setup.
 *
 * #### Purpose
 * The `LoggerConfig` interface standardizes the configuration settings for the logger, ensuring a flexible setup.
 * This interface allows users to specify where logs should be stored (`logDirPath`) and whether logging should also
 * appear in the console (`enableConsoleLogging`), thus supporting various logging needs in both development and
 * production environments.
 *
 * #### Usage
 * The `LoggerConfig` interface can be used when initializing a logger to define the configuration that aligns with
 * project-specific requirements.
 *
 * @example
 * ```typescript
 * const config: LoggerConfig = {
 *   logDirPath: "./logs",
 *   enableConsoleLogging: true
 * };
 * ```
 */
interface LoggerConfig {
  /**
   * @property {string} [logDirPath]
   *
   * Specifies the base directory path for log files.
   *
   * #### Purpose
   * Provides the path for storing log files, making it easy to locate and access logs.
   *
   * #### Requirements
   * - Optional: If not provided, the logger may default to a standard directory path.
   *
   * @example
   * ```typescript
   * const config: LoggerConfig = {
   *   logDirPath: "./logs"
   * };
   * ```
   */
  logDirPath?: string;

  /**
   * @property {boolean} [enableConsoleLogging]
   *
   * Enables or disables console output of logs in addition to file storage.
   *
   * #### Purpose
   * Allows developers to toggle console logging, which can be helpful in development environments while
   * potentially disabled in production.
   *
   * #### Requirements
   * - Optional: Default behavior may be true for development and false for production if not explicitly set.
   *
   * @example
   * ```typescript
   * const config: LoggerConfig = {
   *   enableConsoleLogging: false
   * };
   * ```
   */
  enableConsoleLogging?: boolean;
}

/**
 * @interface `LoggerInterface`
 *
 * Defines the structure for logging functionality, ensuring a consistent format for message logging
 * across different log levels and supporting optional data context.
 *
 * #### Purpose
 * The `LoggerInterface` interface establishes the required method for logging in various components
 * within the application. It standardizes how log messages should be formatted and includes support
 * for different levels of logging (info, warn, error).
 *
 * #### Methods Overview
 * - `log(level: LogLevel, message: string, data?: Record<string, any>): Promise<void>`:
 *   Logs a message with the specified level and optional additional data.
 *
 * #### Usage
 * The `LoggerInterface` is implemented by the `Logger` class to standardize how logging is handled.
 * It can be used in classes and utilities where consistent logging behavior is necessary.
 *
 * @example
 * ```typescript
 * class MyLogger implements LoggerInterface {
 *   async log(level: LogLevel, message: string, data?: Record<string, any>): Promise<void> {
 *     // Implementation of log
 *   }
 * }
 *
 * const logger: LoggerInterface = new MyLogger();
 * logger.log("info", "Application started", { timestamp: new Date() });
 * ```
 */
interface LoggerInterface {
  /**
   * #### Description
   * Logs a message with the specified level and optional additional data context. This method
   * is asynchronous to allow for file I/O or remote logging without blocking the application.
   *
   * #### Purpose
   * Standardizes the logging of messages, allowing for log levels and structured data.
   * Provides flexibility in logging with additional context, such as an error stack or
   * metadata related to the log message.
   *
   * #### Parameters
   * - `level: LogLevel` - The severity level of the log message (e.g., "info", "warn", "error").
   * - `message: string` - The main message to be logged.
   * - `data?: Record<string, any>` - Optional additional data that provides context for the log message.
   *
   * #### Requirements
   * - `level` should be a valid log level defined in `LogLevel`.
   * - `message` should clearly describe the event or action.
   *
   * #### Returns
   * - `Promise<void>` - Returns a promise that resolves once the log has been processed.
   *
   * #### Usage
   * Use this method to log important events, errors, or debug information with optional
   * data for added context.
   *
   * @param {LogLevel} level - The severity level of the log message.
   * @param {string} message - The main message to log.
   * @param {Record<string, any>} [data] - Additional context data for the log (optional).
   *
   * @returns {Promise<void>} - A promise that resolves when the logging is complete.
   *
   * @example
   * ```typescript
   * logger.log("error", "Failed to connect to the database", { errorCode: "DB_CONN_ERR", timestamp: new Date() });
   * ```
   */
  log(
    level: LogLevel,
    message: string,
    data?: Record<string, any>
  ): Promise<void>;
}

export { LoggerConfig, LoggerInterface };
