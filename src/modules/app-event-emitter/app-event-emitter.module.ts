import { Global, Module } from '@nestjs/common'

import { AppEventEmitterService } from '@modules/app-event-emitter/app-event-emitter.service'

@Global()
@Module({
    exports: [
        AppEventEmitterService,
    ],
    providers: [
        AppEventEmitterService,
    ],
})

export class EventEmitterModule {
}
