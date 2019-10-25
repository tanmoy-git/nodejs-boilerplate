import { Injectable, LoggerService } from '@nestjs/common'
import { LogLevel } from '@utils/LogLevel'
import { TransformableInfo } from 'logform'
import * as moment from 'moment'
import { createLogger, format, Logger, transports } from 'winston'
import * as Transport from 'winston-transport'

@Injectable()
export class LogService implements LoggerService {
    // tslint:disable-next-line
    private static instance: LogService

    public static readonly getInstance = (): LogService => {
        if (!LogService.instance) {
            /* tslint:disable-next-line:no-object-mutation */
            LogService.instance = new LogService()
        }

        return LogService.instance
    }

    private readonly logger: Logger

    private constructor() {
        this.logger = createLogger()
    }

    public readonly getLogger = (): Logger => this.logger

    public readonly configure = (logLevel: LogLevel, outputType?: string): void => {
        const transportInstance = this.getTransport(outputType)

        this.logger.configure({
            level: logLevel,
            transports: [transportInstance],
        })
    }

    public readonly error = (message: string, trace?: string, context?: string): void => {
        this.logger.error(message, trace, context)
    }

    public readonly log = (message: string, context?: string): void => {
        this.logger.info(message, context)
    }

    public readonly warn = (message: string, context?: string): void => {
        this.logger.warn(message, context)
    }

    // tslint:disable-next-line:cyclomatic-complexity
    private format(options: TransformableInfo): string {
        const time = moment().format()

        // tslint:disable-next-line:no-unsafe-any
        const log = `[${time}]: ${options.level} - ${(options.message ? options.message : '')} ${(options.meta && Object.keys(options.meta).length) ? `\n${JSON.stringify(options.meta)}` : ''}`

        // Lets display important for us meta information from error
        if (options.level === LogLevel.error && options.data) return `${log}\n${JSON.stringify(options.data)}`

        return log
    }

    private getTransport(outputType?: string): Transport {
        switch (outputType) {
            case 'logstash':
                return new transports.Console({
                    format: format.logstash(),
                })

            default:
                return new transports.Console({
                    format: format.printf(this.format),
                })
        }
    }
}
