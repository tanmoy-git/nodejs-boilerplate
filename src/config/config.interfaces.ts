import { LogLevel } from '@utils/LogLevel'

export interface IConfigServer {
    readonly port: number
    readonly logLevel: LogLevel
    readonly logTransport: string
}

export interface IConfigEnvVar {
    readonly varKey: string
}
