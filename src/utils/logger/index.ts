// @collapse

// Import Interfaces
import { LoggerConfig } from "../../interfaces";

// Import Models
import { Logger } from "../../models";

/**
 * @function `singletonLogger`
 *
 * Provides a singleton instance of the `Logger` class with the specified configuration. If an instance already exists,
 * it returns the existing one; otherwise, it creates a new instance.
 *
 * #### Purpose
 * The `singletonLogger` function ensures that there is only one `Logger` instance across the application, enforcing centralized
 * logging configuration and access.
 *
 * #### Parameters
 * - `config?: LoggerConfig` - An optional configuration object for the logger. If provided, it sets properties such as the log
 *   directory path and console logging behavior.
 *
 * #### Returns
 * - `Logger` - Returns the singleton instance of the `Logger` class.
 *
 * #### Usage
 * This function can be used to initialize or access the single instance of the `Logger` class in any part of the application,
 * enabling consistent logging.
 *
 * @param {LoggerConfig} [config] - Optional configuration for initializing the logger instance.
 * @returns {Logger} - The singleton instance of `Logger`.
 *
 * @example
 * ```typescript
 * import { singletonLogger } from "./path/to/utils/logger";
 *
 * const logger = singletonLogger({ logsDirPath: "./logs", consoleLoggingEnabled: true });
 * ```
 */
function singletonLogger(config?: LoggerConfig): Logger {
  return Logger.getInstance(config);
}

/**
 * @constant {LoggerConfig} config
 *
 * The default configuration for the `Logger` instance. This configuration object includes settings for log directory path
 * and console logging, which can be customized based on the environment.
 *
 * #### Purpose
 * Defines initial configuration settings for the logger, such as the log directory path (`logsDirPath`) and whether to enable
 * console logging (`consoleLoggingEnabled`). This configuration can be modified or expanded based on application requirements.
 *
 * #### Requirements
 * - `logsDirPath` should specify a valid directory path for log storage.
 * - `consoleLoggingEnabled` should be a boolean indicating whether console logging is enabled.
 *
 * @example
 * ```typescript
 * const config = {
 *   logsDirPath: process.env.LOG_DIR_PATH || "./.logs",
 *   consoleLoggingEnabled: process.env.ENABLE_CONSOLE_LOGGING !== "false",
 * };
 * ```
 */
const config: LoggerConfig = {
  enableConsoleLogging: process.env.ENABLE_CONSOLE_LOGGING !== "false",
};

/**
 * `logger`
 *
 * A singleton instance of the `Logger` class. This instance is initialized once with the configuration provided by the `config`
 * constant. The instance provides centralized logging across the application.
 *
 * #### Purpose
 * The `logger` singleton offers consistent access to logging functionality, ensuring that all logs follow the specified
 * configuration settings, such as the directory for log files and whether to enable console logging.
 *
 * #### Usage
 * Import the `logger` singleton directly wherever logging is required in the application.
 *
 * @example
 * ```typescript
 * import { logger } from "./path/to/utils/logger";
 *
 * logger.log(LogLevel.INFO, "Application started");
 * ```
 */
const logger = singletonLogger(config);

export { logger };
