//@collapse

// Import Vendor Modules
import { promises as fsPromises, existsSync, mkdirSync } from "fs";
import path from "path";

// Import Enums
import { LogLevel } from "../../enums";

// Import Interfaces
import { LoggerConfig, LoggerInterface } from "../../interfaces";

/**
 * @class `Logger`
 *
 * Provides logging functionality for the library, supporting both file-based and console logging. This class
 * allows configurable logging levels and environment-specific log directories for flexible and organized logging.
 *
 * #### Purpose
 * The `Logger` class is designed to capture and store logs with various severity levels. It centralizes
 * logging within the library, ensuring that messages are consistently recorded and easily accessible for
 * debugging, monitoring, and auditing purposes.
 *
 * #### Implements
 * Implements `LoggerInterface`, adhering to standardized log methods and configuration options.
 *
 * #### Methods Overview
 * The `Logger` class includes the following methods:
 * - `log(level: LogLevel, message: string, data?: Record<string, any>): Promise<void>`: Logs a message with a specified level and optional data context.
 * - `initializeLogDirectory()`: Initializes the log directory structure if it does not exist.
 * - `setupLogDirPath(basePath: string): string`: Configures the base path for log files, adding environment-specific subdirectories.
 * - `writeLogToFile(level: LogLevel, message: string): Promise<void>`: Writes a formatted log message to a file based on the log level and date.
 *
 * #### Usage
 * Instantiate the `Logger` with a configuration to customize logging behavior, including specifying the log
 * directory path and enabling console output. Once instantiated, use the `log` method to record messages
 * with various levels, which are stored in both files and optionally displayed in the console.
 *
 * @example
 * ```typescript
 * const logger = new Logger({ logDirPath: "./logs", enableConsoleLogging: true });
 * logger.log(LogLevel.INFO, "Application started");
 * ```
 */
class Logger implements LoggerInterface {
  /**
   * @property {string} logDirPath
   *
   * The directory path where log files are stored, organized by environment.
   *
   * #### Purpose
   * Provides a path for storing log files, allowing organized and environment-specific logging.
   *
   * @example
   * ```typescript
   * const logDirPath = "./logs/development";
   * ```
   */
  private logDirPath: string;

  /**
   * @property {boolean} enableConsoleLogging
   *
   * Indicates whether logs should also be output to the console. Useful for real-time monitoring in development.
   *
   * #### Purpose
   * Allows toggling of console output for logs, helping with quick debugging during development.
   *
   * @example
   * ```typescript
   * const enableConsoleLogging = true;
   * ```
   */
  private enableConsoleLogging: boolean;

  /**
   * @property {string} env
   *
   * The current environment, typically derived from `NODE_ENV`, determining the subdirectory for log files.
   *
   * #### Purpose
   * Supports environment-based logging, so logs are organized and segregated based on the runtime environment.
   *
   * @example
   * ```typescript
   * const env = "development";
   * ```
   */
  private env: string;

  /**
   * Initializes a new instance of the `Logger` class with optional configuration settings.
   *
   * @param {LoggerConfig} [config] - Optional configuration for log directory path and console logging.
   *
   * @example
   * ```typescript
   * const logger = new Logger({ logDirPath: "./logs", enableConsoleLogging: true });
   * ```
   */
  constructor(config: LoggerConfig = {}) {
    this.env = process.env.NODE_ENV || "development";
    this.logDirPath = this.setupLogDirPath(config.logDirPath || "./logs");
    this.enableConsoleLogging = config.enableConsoleLogging ?? true;
    this.initializeLogDirectory();
  }

  /**
   * Initializes the log directory structure if it does not already exist.
   *
   * #### Purpose
   * Ensures that the log directory is available, creating it if necessary to prevent file write errors.
   *
   * #### Requirements
   * - The directory specified by `logDirPath` must exist or be creatable by the system.
   *
   * @returns {void}
   *
   * @example
   * ```typescript
   * logger.initializeLogDirectory();
   * ```
   */
  private initializeLogDirectory(): void {
    if (!existsSync(this.logDirPath)) {
      mkdirSync(this.logDirPath, { recursive: true });
    }
  }

  /**
   * Configures the base path for log files, appending a `.logs` directory and environment subdirectory if not specified.
   *
   * @param {string} basePath - The initial directory path for logs.
   *
   * #### Purpose
   * Organizes log files under a standardized directory structure, including environment-based subdirectories.
   *
   * #### Requirements
   * - `basePath` should be a valid path where logs can be stored.
   *
   * @returns {string} - The final, environment-based directory path for logs.
   *
   * @example
   * ```typescript
   * const logPath = logger.setupLogDirPath("./logs");
   * console.log(logPath);
   * // Console Output: "./logs/.logs/development"
   * ```
   */
  private setupLogDirPath(basePath: string): string {
    if (!basePath.endsWith("/.logs/")) {
      basePath = path.join(basePath, ".logs/");
    }
    return path.join(basePath, this.env);
  }

  /**
   * #### Description
   * Logs a message with a specified severity level and optional data context. Supports both console output
   * and file logging, storing logs based on environment and log level.
   *
   * #### Purpose
   * Centralizes logging operations, providing a single method to record messages consistently across the library.
   *
   * #### Parameters
   * - `level: LogLevel` - The severity level of the log (e.g., `INFO`, `WARN`, `ERROR`).
   * - `message: string` - The main log message.
   * - `data?: Record<string, any>` - Optional additional data providing context for the log.
   *
   * #### Requirements
   * - `level` must be a valid `LogLevel`.
   * - `message` should provide clear and relevant information for the log entry.
   *
   * #### Returns
   * - `Promise<void>` - Completes once the log entry has been recorded.
   *
   * #### Usage
   * This method is used to log messages with different levels of severity, adding structured data if needed.
   *
   * @param {LogLevel} level - The severity level of the log.
   * @param {string} message - The main log message.
   * @param {Record<string, any>} [data] - Optional additional data for log context.
   *
   * @returns {Promise<void>} - A promise that resolves when logging is complete.
   *
   * @example
   * ```typescript
   * logger.log(LogLevel.ERROR, "Database connection failed", { errorCode: "DB_CONN_ERR" });
   * ```
   */
  public async log(
    level: LogLevel,
    message: string,
    data?: Record<string, any>
  ): Promise<void> {
    const timestamp = new Date().toISOString();
    const formattedMessage = `[${level.toUpperCase()}] [${timestamp}] ${message}`;
    const fullLogMessage = data
      ? `${formattedMessage} - ${JSON.stringify(data)}`
      : formattedMessage;

    if (this.enableConsoleLogging) {
      console.log(fullLogMessage);
    }

    await this.writeLogToFile(level, fullLogMessage);
  }

  /**
   * Writes a log entry to a file, organizing logs by date and severity level.
   *
   * @param {LogLevel} level - The severity level of the log.
   * @param {string} message - The formatted log message to be written.
   *
   * #### Purpose
   * Allows structured storage of logs by separating them into individual files based on date and level.
   *
   * #### Requirements
   * - Log files are created or appended as needed within the specified log directory.
   *
   * @returns {Promise<void>} - Resolves once the log entry is saved to the file.
   *
   * #### Usage
   * Use this method within the `log` function to save log entries to files, keeping logs organized by severity and date.
   *
   * @example
   * ```typescript
   * await logger.writeLogToFile(LogLevel.INFO, "System initialized");
   * ```
   */
  private async writeLogToFile(
    level: LogLevel,
    message: string
  ): Promise<void> {
    const date = new Date().toISOString().split("T")[0];
    const logFilePath = path.join(this.logDirPath, `${date}-${level}.log`);

    try {
      await fsPromises.appendFile(logFilePath, `${message}\n`);
    } catch (error) {
      console.error(`Failed to write to log file: ${error}`);
    }
  }
}

export { Logger };
