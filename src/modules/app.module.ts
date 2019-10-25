import { EventEmitterModule } from '@modules/app-event-emitter'
import { HealthcheckModule } from '@modules/healthcheck/healthcheck.module'
import { Module } from '@nestjs/common'

@Module({
    imports: [
        HealthcheckModule,
        EventEmitterModule,
    ],
})

export class AppModule {
}
