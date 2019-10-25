import * as env from 'dotenv'
// Load .env file if exists (shouldn't exist for integration/production)
// Uses for development environments
env.config()

// tslint:disable:no-import-side-effect

import { INestApplication } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { SwaggerDocument } from '@nestjs/swagger/dist/interfaces'
import './module-alias'
import { AppModule } from './modules/app.module'

import { ConfigService } from '@app/config/config.service'
import { LogService } from '@logger/LogService'

function prepareOpenApi(app: INestApplication): SwaggerDocument {
    const options = new DocumentBuilder()
        .setTitle(process.env.npm_package_name as string)
        .setDescription(process.env.npm_package_description as string)
        .setVersion(process.env.npm_package_version as string)
        .addTag('Users')
        .addBearerAuth('Authorization', 'header')
        .setSchemes('http', 'https')
        .build()

    return SwaggerModule.createDocument(app, options)
}

const loggerService = LogService.getInstance()

const appPort = ConfigService.getInstance().getConfig().serverConfig.port

async function bootstrap(): Promise<void> {

    // tslint:disable-next-line:no-unsafe-any
    const app: INestApplication = await NestFactory.create(AppModule, {logger: false})
    loggerService.configure(
        ConfigService.getInstance().getConfig().serverConfig.logLevel,
        ConfigService.getInstance().getConfig().serverConfig.logTransport,
    )
    app.useLogger(loggerService)

    SwaggerModule.setup('/swagger', app, prepareOpenApi(app))
    await app.listen(appPort)

    process.on('SIGTERM', () => {
        loggerService.getLogger().info('SIGTERM signal received. Shutting down...')

        app.close()
            .then(_ => {
                loggerService.getLogger().info('App Closed Gracefully by SIGTERM')
                process.exit(0)
            })
            .catch(err => {
                loggerService.getLogger().error('Coundn\'t gracefully shutdown', err)
                process.exit(1)
            })
    })
}

bootstrap().catch((err: Error) =>
    loggerService.getLogger().error(`NestJS bootstrap failed: ${err}`))
