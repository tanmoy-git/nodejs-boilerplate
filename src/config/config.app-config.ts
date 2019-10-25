import {
    IConfigEnvVar,
    IConfigServer,
} from '@app/config/config.interfaces'

export interface IAppConfig {
    readonly serverConfig: IConfigServer
    readonly otherConfig: IConfigEnvVar
}
