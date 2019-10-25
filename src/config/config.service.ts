import { IAppConfig } from '@app/config/config.app-config'
import {
    IConfigEnvVar,
    IConfigServer,
} from '@app/config/config.interfaces'
import {
    booleanValidator,
    fetchEnvVariable,
    logLevelValidator,
    portValidator,
    RADIX,
} from '@app/config/config.utils'
import { Injectable } from '@nestjs/common'

import { LogLevel } from '@app/utils/LogLevel'

@Injectable()
export class ConfigService {
    // tslint:disable-next-line
    private static instance: ConfigService

    public static readonly getInstance = (): ConfigService => {
        if (!ConfigService.instance) {
            /* tslint:disable-next-line:no-object-mutation */
            ConfigService.instance = new ConfigService()
        }

        return ConfigService.instance
    }

    private readonly config: IAppConfig

    private constructor() {
        this.config = {
            otherConfig: this.loadOtherConfig(),
            serverConfig: this.loadServerConfig(),
        }
    }

    public readonly getConfig = (): IAppConfig => this.config

    private loadServerConfig(): IConfigServer {
        return {
            logLevel: fetchEnvVariable('LOG_LEVEL' , 'LogLevel invalid', logLevelValidator) as LogLevel,
            logTransport: fetchEnvVariable('LOG_TRANSPORT' , 'LOG_TRANSPORT invalid'),
            port: parseInt(fetchEnvVariable('APP_PORT', 'Application Port Invalid', portValidator), RADIX),
        }
    }

    private loadOtherConfig(): IConfigEnvVar {
        return {
            varKey: fetchEnvVariable('ENV_KEY' , 'ENV_KEY invalid'),
        }
    }
}
