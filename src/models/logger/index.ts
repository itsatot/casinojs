//@collapse

// Import Vendor Modules
import { promises as fsPromises, existsSync, mkdirSync } from "fs";
import path from "path";

// Import Enums
import { LogLevel } from "../../enums";

// // Import Events
// import {} from "../../events";

// Import Interfaces
import { LoggerConfig, LoggerInterface } from "../../interfaces";

// Import Models
// import {} from "fs";

class Logger implements LoggerInterface {
  private logDirPath: string;
  private enableConsoleLogging: boolean;
  private env: string;

  constructor(config: LoggerConfig = {}) {
    this.env = process.env.NODE_ENV || "development";
    this.logDirPath = this.setupLogDirPath(config.logDirPath || "./logs");
    this.enableConsoleLogging = config.enableConsoleLogging ?? true;
    this.initializeLogDirectory();
  }

  private initializeLogDirectory(): void {
    if (!existsSync(this.logDirPath)) {
      mkdirSync(this.logDirPath, { recursive: true });
    }
  }

  private setupLogDirPath(basePath: string): string {
    if (!basePath.endsWith("/.logs/")) {
      basePath = path.join(basePath, ".logs/");
    }
    return path.join(basePath, this.env);
  }

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
