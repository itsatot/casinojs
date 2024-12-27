//collapse

// Import Vendor Modules
import { promises as fsPromises, existsSync, mkdirSync } from "fs";
import path from "path";

// Import Enums
import { LogLevel } from "../../enums";

// Import Interfaces
import { LoggerConfig, LoggerInterface } from "../../interfaces/logger";

// Resolve the app's package.json dynamically from the current working directory
// const appPackageJson = require(path.resolve(process.cwd(), "package.json"));

// Resolve the library's package.json dynamically from `node_modules`
// const libraryPackageJsonPath = require.resolve("casinojs/package.json");
// const libraryPackageJson = require(libraryPackageJsonPath);

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
 * - `__writeLogToFile(level: LogLevel, message: string): Promise<void>`: Writes a formatted log message to a file based on the log level and date.
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
  /**************************************************************************************************************
   * PROPERTIES (STATIC)
   **************************************************************************************************************/

  /**
   * @property {Logger} __instance
   *
   * Singleton instance of the `Logger` class. Ensures only one instance of the logger is created and used
   * throughout the application, maintaining centralized control over logging.
   *
   * #### Purpose
   * Prevents multiple logger instances from being created, ensuring consistency in log handling, configuration,
   * and output across the application.
   *
   * #### Requirements
   * - **Singleton Pattern**: Only one instance should be created and accessible across modules.
   *
   * @example
   * ```typescript
   * const logger = Logger.getInstance();
   * logger.log(LogLevel.INFO, "Using singleton instance for logging");
   * ```
   */
  private static __instance: Logger;

  /**************************************************************************************************************
   * PROPERTIES (INSTANCE)
   **************************************************************************************************************/

  /**
   * @property {boolean} __consoleLogging
   *
   * Determines if logs should also be output to the console. This setting is particularly useful for real-time
   * monitoring and debugging during development.
   *
   * #### Purpose
   * Provides a configurable toggle for console logging, enhancing flexibility for developers who need immediate
   * feedback during code execution.
   *
   * #### Requirements
   * - **Optional**: Defaults to `true`.
   *
   * @example
   * ```typescript
   * const enableConsoleLogging = loggerInstance.__consoleLogging;
   * console.log(enableConsoleLogging); // Output: true
   * ```
   */
  // private __appName: string = appPackageJson.name;

  /**
   * @property {boolean} __consoleLogging
   *
   * Determines if logs should also be output to the console. This setting is particularly useful for real-time
   * monitoring and debugging during development.
   *
   * #### Purpose
   * Provides a configurable toggle for console logging, enhancing flexibility for developers who need immediate
   * feedback during code execution.
   *
   * #### Requirements
   * - **Optional**: Defaults to `true`.
   *
   * @example
   * ```typescript
   * const enableConsoleLogging = loggerInstance.__consoleLogging;
   * console.log(enableConsoleLogging); // Output: true
   * ```
   */
  private __consoleLogging: boolean = true;

  /**
   * @property {string} __env
   *
   * Specifies the current environment, typically derived from `NODE_ENV`. This setting determines the subdirectory
   * within the logging structure to help organize logs by environment (e.g., `development`, `production`).
   *
   * #### Purpose
   * Helps in segregating log data based on the runtime environment, ensuring that logs generated in production are
   * separated from development logs.
   *
   * #### Requirements
   * - **Optional**: Defaults to the value of `NODE_ENV`, or `"development"` if `NODE_ENV` is undefined.
   *
   * @example
   * ```typescript
   * const env = loggerInstance.__env;
   * console.log(env); // Output: "development" or the current NODE_ENV setting
   * ```
   */
  private __env: string = process.env.NODE_ENV || `development`;

  /**
   * @property {boolean} __consoleLogging
   *
   * Determines if logs should also be output to the console. This setting is particularly useful for real-time
   * monitoring and debugging during development.
   *
   * #### Purpose
   * Provides a configurable toggle for console logging, enhancing flexibility for developers who need immediate
   * feedback during code execution.
   *
   * #### Requirements
   * - **Optional**: Defaults to `true`.
   *
   * @example
   * ```typescript
   * const enableConsoleLogging = loggerInstance.__consoleLogging;
   * console.log(enableConsoleLogging); // Output: true
   * ```
   */
  // private __libraryName: string = libraryPackageJson.name || `casinojs`;

  /**
   * @property {string} __logsDirPath
   *
   * Defines the directory path where log files are stored, organized by environment for better structure.
   * Typically includes a subdirectory for the environment, allowing different logs for `development`, `staging`, and `production`.
   *
   * #### Purpose
   * Provides an organized location for storing log files, structured by the environment to prevent mixing of logs
   * from different runtime stages.
   *
   * #### Requirements
   * - **Optional**: Defaults to a `.logs` directory in the root.
   *
   * @example
   * ```typescript
   * const logDirPath = loggerInstance.__logsDirPath;
   * console.log(logDirPath); // Output: "./logs/development" (example for development environment)
   * ```
   */
  private __logsDirPath: string = path.resolve(process.cwd(), `./.logs`);

  /**************************************************************************************************************
   * CONSTRUCTOR & INITIALIZERS
   **************************************************************************************************************/

  /**
   * #### Description
   * Initializes a new instance of the `Logger` class with optional configuration settings.
   *
   * #### Purpose
   * This constructor configures the `Logger` class by initializing settings such as the log directory path,
   * console logging preferences, and environment setup.
   *
   * #### Parameters
   * - `config?: LoggerConfig` - Optional. A configuration object for log directory path and console logging settings.
   *    - `logDirPath: string` - Specifies the base directory for log files. Defaults to `./logs` if not provided.
   *    - `enableConsoleLogging: boolean` - Determines if logs should also appear in the console. Defaults to `true`.
   *
   * #### Requirements
   * - This method requires no mandatory parameters; configuration is optional.
   *
   * #### Returns
   * - `void` - The constructor does not return a value.
   *
   * #### Usage
   * Instantiates the `Logger` with custom configurations, which dictate logging behavior across the library.
   *
   * @param {LoggerConfig} [config] - Optional. Configuration for log directory path and console logging settings.
   *
   * @example
   * ```typescript
   * const logger = new Logger({ logDirPath: "./logs", enableConsoleLogging: true });
   * // Logs will be saved in "./logs" directory and printed to the console.
   * ```
   */
  constructor(config?: LoggerConfig) {
    this.__init(config);
  }

  /**
   * #### Description
   * The `__init` method is a private initializer function that applies the provided configuration settings to the `Logger` instance.
   * It configures environment variables, log directory path, and console logging preferences, setting defaults where necessary.
   *
   * #### Purpose
   * The initializer method organizes the setup process, making the constructor more concise and maintaining modularity.
   * This method ensures all configurations are applied in one place, enhancing readability and flexibility in the initialization phase.
   *
   * #### Implements
   * N/A
   *
   * #### Overrides
   * N/A
   *
   * #### Parameters
   * - `config?: LoggerConfig` - Optional. A configuration object with:
   *    - `logDirPath: string` - Base directory for log files. Defaults to `"./.logs"`.
   *    - `enableConsoleLogging: boolean` - Whether to enable console logging. Defaults to `true`.
   *
   * #### Requirements
   * - If `logDirPath` is not specified, a default directory of `"./.logs"` is used.
   * - The console logging setting defaults to `true` if not provided.
   *
   * #### Returns
   * - `void` - This method does not return a value.
   *
   * #### Usage
   * This method is automatically called by the constructor to apply initialization settings.
   *
   * @param {LoggerConfig} config - Optional configuration for initializing the Logger.
   *
   * @example
   * ```typescript
   * const logger = new Logger();
   * // Initializes the Logger with default settings.
   * ```
   */
  private __init(config?: LoggerConfig): void {
    this.__env = process.env.NODE_ENV || "development";
    this.__logsDirPath = path.resolve(process.cwd(), ".logs", this.__env);
    this.__setConsoleLogging(config?.enableConsoleLogging ?? true);
    this.__initLogsDir();
  }

  /**************************************************************************************************************
   * STATIC METHODS
   **************************************************************************************************************/

  /**
   * #### Description
   * Provides access to the singleton instance of the `Logger` class. This method ensures that only one instance of
   * the logger is created and shared across the application, providing a centralized logging management system.
   * It initializes the logger with a configuration if not already initialized.
   *
   * #### Purpose
   * The `getInstance` method enforces the Singleton pattern, ensuring that a single instance of the logger is used
   * across the entire library or application. This approach helps maintain consistency in logging configuration,
   * making sure that all logs are handled by a single, globally accessible instance.
   *
   * #### Implements
   * N/A
   *
   * #### Overrides
   * N/A
   *
   * #### Events
   * N/A
   *
   * #### Parameters
   * - `config?: LoggerConfig` - An optional configuration object for customizing the logger instance:
   *   - `logDirPath: string` - Optional. Specifies the directory path for storing log files. Defaults to a standard location if omitted.
   *   - `enableConsoleLogging: boolean` - Optional. Enables or disables logging to the console. Defaults to `true` if omitted.
   *
   * #### Requirements
   * - The logger configuration should be provided only once at initialization; subsequent calls to `getInstance`
   *   ignore additional configurations.
   *
   * #### Returns
   * - `Logger` - Returns the singleton instance of the `Logger` class, ensuring that the same instance is shared
   *   throughout the application.
   *
   * #### Usage
   * Use this method to retrieve the `Logger` instance wherever logging is required. This method guarantees that the
   * same instance of the `Logger` is used, maintaining a consistent logging configuration.
   *
   * @param {LoggerConfig} [config] - Configuration options for the logger instance.
   * @returns {Logger} - The singleton instance of `Logger`.
   *
   * @example
   * ```typescript
   * // Initialize and retrieve the Logger instance with configuration
   * const logger = Logger.getInstance({ logDirPath: "./logs", enableConsoleLogging: true });
   * logger.log(LogLevel.INFO, "Application started"); // Logs with the singleton logger instance
   *
   * // Retrieve the existing Logger instance without reinitializing
   * const anotherLoggerReference = Logger.getInstance();
   * anotherLoggerReference.log(LogLevel.ERROR, "Unexpected error occurred");
   * // Both `logger` and `anotherLoggerReference` refer to the same Logger instance
   * ```
   */
  public static getInstance(config?: LoggerConfig): Logger {
    if (!Logger.__instance) {
      Logger.__instance = new Logger(config);
    }
    return Logger.__instance;
  }

  /**************************************************************************************************************
   * CREATE METHODS (SETTERS & OBJECT CREATION)
   **************************************************************************************************************/

  /**************************************************************************************************************
   * READ METHODS (GETTERS & DATA RETRIEVAL)
   **************************************************************************************************************/

  /**
   * #### Description
   * Retrieves the current status of console logging, indicating if logs are also output to the console.
   *
   * #### Purpose
   * This getter provides access to the console logging status, useful for checking if real-time log output is enabled.
   *
   * #### Parameters
   * N/A
   *
   * #### Requirements
   * - No parameters or dependencies are needed to access this property.
   *
   * #### Returns
   * - `boolean` - `true` if console logging is enabled, `false` otherwise.
   *
   * #### Usage
   * This method is used to verify whether logs are configured to appear in the console.
   *
   * @returns {boolean} - The console logging status.
   *
   * @example
   * ```typescript
   * const logger = Logger.getInstance();
   * console.log(logger.getConsoleLogging());
   * // Console Output: true (or false based on configuration)
   * ```
   */
  public getConsoleLogging(): boolean {
    return this.__consoleLogging;
  }

  /**
   * #### Description
   * Retrieves the environment setting currently configured in the Logger instance, such as `"development"` or `"production"`.
   *
   * #### Purpose
   * This getter method allows access to the environment setting, which determines where logs are stored based on runtime context.
   *
   * #### Parameters
   * N/A
   *
   * #### Requirements
   * - No parameters are required to retrieve this property.
   *
   * #### Returns
   * - `string` - The environment setting in use.
   *
   * #### Usage
   * Use this method to check the runtime environment configured for the Logger.
   *
   * @returns {string} - The current environment setting (e.g., `"development"`).
   *
   * @example
   * ```typescript
   * const logger = Logger.getInstance();
   * console.log(logger.getEnv());
   * // Console Output: "development"
   * ```
   */
  public getEnv(): string {
    return this.__env;
  }

  /**
   * #### Description
   * Retrieves the path of the directory where logs are stored, based on the Logger's configuration and environment setting.
   *
   * #### Purpose
   * This method allows access to the path where logs are written, organized by environment. Useful for managing and verifying log storage locations.
   *
   * #### Parameters
   * N/A
   *
   * #### Requirements
   * - The logs directory should be accessible or creatable by the system.
   *
   * #### Returns
   * - `string` - The full directory path for log storage.
   *
   * #### Usage
   * This method is used to determine where logs are stored on the filesystem, ensuring accessibility and organization.
   *
   * @returns {string} - The directory path where logs are stored.
   *
   * @example
   * ```typescript
   * const logger = Logger.getInstance();
   * console.log(logger.getLogsDirPath());
   * // Console Output: "./logs/development" (example for development environment)
   * ```
   */
  public getLogsDirPath(): string {
    return this.__logsDirPath;
  }

  /**************************************************************************************************************
   * UPDATE METHODS (MODIFYING EXISTING OBJECTS)
   **************************************************************************************************************/

  /**************************************************************************************************************
   * DELETE METHODS (REMOVING OBJECTS)
   **************************************************************************************************************/

  /**************************************************************************************************************
   * BUSINESS-LOGIC METHODS (LOGIC & CALCULATIONS)
   **************************************************************************************************************/

  /**
   * #### Description
   * The `disableConsoleLogging` method disables console logging for the `Logger` instance. When disabled, log
   * entries are only written to log files and are no longer displayed in the console.
   *
   * #### Purpose
   * This method provides a way to turn off console output of log messages, which is useful for reducing console
   * clutter in production environments where log messages are typically directed only to log files.
   *
   * #### Implements
   * N/A
   *
   * #### Overrides
   * N/A
   *
   * #### Parameters
   * N/A
   *
   * #### Requirements
   * - This method requires no parameters and should be called when console logging is no longer needed.
   *
   * #### Returns
   * - `boolean` - Returns `false` indicating console logging is now disabled.
   *
   * #### Usage
   * Use this method to disable console logging, especially in production environments where log messages
   * should only be stored in log files.
   *
   * @returns {boolean} - `false` indicating that console logging is disabled.
   *
   * @example
   * ```typescript
   * // Disable console logging for production
   * logger.disableConsoleLogging();
   * logger.log(LogLevel.INFO, "Console logging disabled");
   * ```
   */
  public disableConsoleLogging(): boolean {
    return this.__setConsoleLogging(false);
  }

  /**
   * #### Description
   * The `enableConsoleLogging` method enables console logging for the `Logger` instance. When activated, all log
   * entries are displayed in the console in addition to being recorded in log files.
   *
   * #### Purpose
   * This method provides a way to turn on real-time logging output to the console, which is particularly useful
   * for development and debugging purposes, allowing for immediate feedback on logged events.
   *
   * #### Implements
   * N/A
   *
   * #### Overrides
   * N/A
   *
   * #### Parameters
   * N/A
   *
   * #### Requirements
   * - This method requires no parameters and should be called when console logging is desired.
   *
   * #### Returns
   * - `boolean` - Returns `true` indicating console logging is now enabled.
   *
   * #### Usage
   * Use this method to enable console logging for quick visibility of log messages during debugging or development.
   *
   * @returns {boolean} - `true` indicating that console logging is enabled.
   *
   * @example
   * ```typescript
   * // Enable console logging for immediate log output
   * logger.enableConsoleLogging();
   * logger.log(LogLevel.INFO, "Console logging enabled");
   * ```
   */
  public enableConsoleLogging(): boolean {
    return this.__setConsoleLogging(true);
  }

  /**
   * #### Description
   * The `log` method logs a message at a specified severity level with optional data. It supports both console
   * output and file-based logging, structuring logs based on environment and log level.
   *
   * #### Purpose
   * This method serves as the core logging function, allowing consistent recording of messages across the library.
   * By accepting a log level and optional data, it provides detailed logging for events, errors, or informational messages.
   *
   * #### Implements
   * Implements the logging functionality from the `LoggerInterface`.
   *
   * #### Overrides
   * N/A
   *
   * #### Events
   * - **Console Logging**: If console logging is enabled, the message is output to the console.
   * - **File Logging**: Each log entry is stored in a file based on log level and date for organized access and auditing.
   *
   * #### Parameters
   * - `level: LogLevel` - The log's severity level, which determines where it appears. Valid options include:
   *   - `LogLevel.INFO`: Informational messages indicating standard operations.
   *   - `LogLevel.WARN`: Warnings that indicate potential issues.
   *   - `LogLevel.ERROR`: Critical errors requiring attention.
   * - `message: string` - The primary log message, ideally concise and descriptive.
   * - `data?: Record<string, any>` - Optional. Additional data to provide context, such as error codes or debug info.
   *
   * #### Requirements
   * - `level` must be a recognized value in `LogLevel`.
   * - `message` should clearly describe the log's purpose, providing insight into system operations.
   *
   * #### Returns
   * - `Promise<void>` - Resolves when the log entry is recorded, either in the console or file.
   *
   * #### Usage
   * Use this method to log critical information across the library, choosing the appropriate `LogLevel` to match
   * the importance and visibility requirements of the message.
   *
   * @param {LogLevel} level - The log's severity level.
   * @param {string} message - The main log message.
   * @param {Record<string, any>} [data] - Optional additional data for context.
   *
   * @returns {Promise<void>} - A promise that resolves when logging completes.
   *
   * @example
   * ```typescript
   * // Logs a critical error with associated data
   * logger.log(LogLevel.ERROR, "Database connection failed", { errorCode: "DB_CONN_ERR", timestamp: Date.now() });
   *
   * // Logs an informational message
   * logger.log(LogLevel.INFO, "Server started successfully");
   * ```
   */
  public async log(
    level: LogLevel,
    message: string,
    data?: Record<string, any>
  ): Promise<void> {
    const timestamp = new Date().toISOString();
    const formattedMessage = /*[${this.__appName}-${
      this.__libraryName
    }]*/ `[${level.toUpperCase()}] [${timestamp}] ${message}`;
    const fullLogMessage = data
      ? `${formattedMessage} - ${JSON.stringify(data)}`
      : formattedMessage;

    if (this.__consoleLogging) {
      console.log(this.__colorize(level, fullLogMessage));
    }

    await this.__writeLogToFile(level, fullLogMessage);
  }

  /**************************************************************************************************************
   * WRAPPER METHODS (UTILITY & CONVENIENCE)
   **************************************************************************************************************/

  /**************************************************************************************************************
   * INTERNAL METHODS (PROTECTED)
   **************************************************************************************************************/

  /**************************************************************************************************************
   * INTERNAL METHODS (PRIVATE)
   **************************************************************************************************************/

  /**
   * #### Description
   * The `__setConsoleLogging` method allows the setting of the console logging preference for the logger.
   *
   * #### Purpose
   * This method configures whether log messages should be displayed in the console, which is particularly useful
   * for debugging in development environments. Enabling or disabling console logging provides flexibility for various
   * deployment scenarios.
   *
   * #### Implements
   * N/A
   *
   * #### Overrides
   * N/A
   *
   * #### Parameters
   * - `bool: boolean` - A boolean indicating whether console logging should be enabled (`true`) or disabled (`false`).
   *
   * #### Requirements
   * - `bool` must be a valid boolean value (`true` or `false`).
   *
   * #### Returns
   * - `boolean` - The current console logging state after assignment.
   *
   * #### Usage
   * This method is used internally to toggle console logging based on configuration settings.
   *
   * @param {boolean} bool - Determines if console logging is enabled.
   * @returns {boolean} - The updated state of console logging.
   *
   * @example
   * ```typescript
   * logger.__setConsoleLogging(false); // Disables console logging
   * ```
   */
  private __setConsoleLogging(bool: boolean): boolean {
    this.__consoleLogging = bool;
    return this.__consoleLogging;
  }

  /**
   * #### Description
   * The `__setEnv` method assigns the runtime environment (e.g., `development`, `production`) to the logger instance.
   *
   * #### Purpose
   * This method ensures that the logger instance is aware of the current environment, which can influence the log file
   * structure and behavior (e.g., different logging levels or file paths based on environment).
   *
   * #### Implements
   * N/A
   *
   * #### Overrides
   * N/A
   *
   * #### Parameters
   * - `env: string` - The environment setting, typically "development", "production", or a custom environment.
   *
   * #### Requirements
   * - `env` must be a non-empty string.
   *
   * #### Returns
   * - `string` - The assigned environment of the logger.
   *
   * #### Usage
   * Used internally to set the logging environment. This value determines where logs are stored or the format.
   *
   * @param {string} env - Environment string for the logger.
   * @returns {string} - The assigned environment.
   *
   * @example
   * ```typescript
   * logger.__setEnv("production"); // Sets the environment to production
   * ```
   */
  private __setEnv(env: string): string {
    this.__env =
      env === process.env.NODE_ENV
        ? env
        : process.env.NODE_ENV || "development";
    return this.__env;
  }

  /**
   * #### Description
   * The `__setLogsDirPath` method configures the base directory path for log files.
   *
   * #### Purpose
   * This method ensures that the log directory path is valid and ends with `/.logs`, maintaining a standardized
   * log file structure.
   *
   * #### Implements
   * N/A
   *
   * #### Overrides
   * N/A
   *
   * #### Parameters
   * - `path: string` - The desired base path for log files.
   *
   * #### Requirements
   * - `path` must be a valid string. It will be appended with `/.logs` if not provided with this suffix.
   *
   * #### Returns
   * - `string` - The updated and standardized log directory path.
   *
   * #### Usage
   * Internally used to configure the base log directory path for storing logs.
   *
   * @param {string} path - The initial base path for logs.
   * @returns {string} - The standardized log directory path.
   *
   * @example
   * ```typescript
   * logger.__setLogsDirPath("./custom/logs"); // Sets and formats the log directory path
   * ```
   */
  private __setLogsDirPath(path: string): string {
    this.__logsDirPath = path.endsWith(`/.logs`) ? path : `${path}/.logs`;
    return this.__logsDirPath;
  }

  /**
   * #### Description
   * Initializes the log directory structure if it does not already exist.
   *
   * #### Purpose
   * Ensures that the log directory is available before any file-based logging occurs, creating it if necessary to
   * avoid file writing errors.
   *
   * #### Implements
   * N/A
   *
   * #### Overrides
   * N/A
   *
   * #### Requirements
   * - The `logDirPath` must be a valid path and writable by the system.
   *
   * #### Returns
   * - `void` - This method does not return a value.
   *
   * #### Usage
   * Called internally to initialize the log directory before any logs are written.
   *
   * @returns {void}
   *
   * @example
   * ```typescript
   * logger.__initLogsDir(); // Ensures log directory exists
   * ```
   */
  private __initLogsDir(): void {
    if (!existsSync(this.__logsDirPath)) {
      mkdirSync(this.__logsDirPath, { recursive: true });
    }
  }

  /**
   * #### Description
   * Writes a log entry to a file, organizing logs by date and severity level.
   *
   * #### Purpose
   * Stores logs in structured files, organized by severity level and date for easy access and auditing.
   *
   * #### Parameters
   * - `level: LogLevel` - Severity of the log.
   * - `message: string` - The log message to be saved.
   *
   * #### Requirements
   * - Log files should be writable.
   *
   * #### Returns
   * - `Promise<void>` - Resolves once logging is complete.
   *
   * @param {LogLevel} level - Severity level of the log.
   * @param {string} message - The log message.
   * @returns {Promise<void>}
   *
   * @example
   * ```typescript
   * await logger.__writeLogToFile(LogLevel.INFO, "System initialized");
   * ```
   */
  private async __writeLogToFile(
    level: LogLevel,
    message: string
  ): Promise<void> {
    const date = new Date().toISOString().split("T")[0];
    const logFilePath = path.join(this.__logsDirPath, `${date}-${level}.log`);
    try {
      await fsPromises.appendFile(logFilePath, `${message}\n`);
    } catch (error) {
      console.error(`Failed to write to log file: ${error}`);
    }
  }

  // Private method to apply color based on log level
  private __colorize(level: LogLevel, message: string): string {
    const colorCodes = {
      [LogLevel.INFO]: "\x1b[32m", // Green
      [LogLevel.WARN]: "\x1b[33m", // Yellow
      [LogLevel.ERROR]: "\x1b[31m", // Red
    };

    const resetCode = "\x1b[0m";
    const color = colorCodes[level] || resetCode; // Default to reset if level is unknown
    return `${color}${message}${resetCode}`;
  }
}

export { Logger };
