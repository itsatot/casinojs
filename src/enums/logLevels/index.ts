//@collapse

/**
 * @enum {string} `LogLevel`
 *
 * Represents the different levels of logging severity available within the library.
 * Each log level corresponds to a specific type of message, providing clarity on the nature and urgency of the log.
 * The levels are structured to allow for selective filtering based on severity and importance.
 *
 * #### Purpose
 * The `LogLevel` enum standardizes log severity levels, ensuring that log messages are consistently categorized.
 * This approach aids in debugging, monitoring, and organizing log data by its importance, making it easier to parse
 * and filter through logs in development, production, or auditing scenarios.
 *
 * #### Usage
 * The `LogLevel` enum is used across the logging system to specify the severity of each log message. It includes:
 * - **INFO**: For general informational messages, routine operations, and non-urgent updates.
 * - **WARN**: For warnings or potential issues that may not yet be errors but deserve attention.
 * - **ERROR**: For serious issues that have occurred and require immediate attention.
 *
 * @example
 * ```typescript
 * const logLevel = LogLevel.INFO;
 * console.log(logLevel);
 * // Console Output: "info"
 * ```
 */
enum LogLevel {
  /**
   * @property {string} INFO
   *
   * Indicates an informational message. Typically used for routine logs that help track the flow of execution
   * without implying any issues. Ideal for logs that document standard operations, function calls, or
   * non-critical messages.
   *
   * #### Purpose
   * Helps developers or system operators understand the application flow and record operational steps.
   *
   * @example
   * ```typescript
   * const level = LogLevel.INFO;
   * console.log(level);
   * // Console Output: "info"
   * ```
   */
  INFO = "info",

  /**
   * @property {string} WARN
   *
   * Denotes a warning message. Used for situations that might lead to errors if not addressed,
   * such as deprecated function usage, unexpected states, or recoverable issues.
   *
   * #### Purpose
   * Allows developers to identify and monitor areas of the application that might require future action
   * to prevent errors or enhance performance.
   *
   * @example
   * ```typescript
   * const level = LogLevel.WARN;
   * console.log(level);
   * // Console Output: "warning"
   * ```
   */
  WARN = "warning",

  /**
   * @property {string} ERROR
   *
   * Represents an error message, indicating a failure that disrupts functionality or prevents a process from completing.
   * This level of logging is reserved for serious issues that demand immediate attention and correction.
   *
   * #### Purpose
   * Used to signal critical failures, alerting developers or operators to take immediate action to resolve the issue.
   *
   * @example
   * ```typescript
   * const level = LogLevel.ERROR;
   * console.log(level);
   * // Console Output: "error"
   * ```
   */
  ERROR = "error",
}

export { LogLevel };
