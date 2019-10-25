import { EventEmitter } from 'events'
import { Logger } from 'winston'

import { LogService } from '@logger/LogService'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AppEventEmitterService extends EventEmitter {
    private readonly logger: Logger

    constructor() {
        super()

        // tslint:disable-next-line:no-object-mutation
        this.logger = LogService.getInstance().getLogger()
    }

    // tslint:disable-next-line:no-any readonly-array array-type
    emit(event: string | symbol, ...args: Array<any>): boolean {
        // this.logger.debug(`[AppEventEmitterService] Emit Event: ${event.toString()}`)

        return super.emit(event, ...args)
    }

    // tslint:disable-next-line:no-any readonly-array array-type
    on(event: string | symbol, listener: (...args: Array<any>) => void): this {
        // this.logger.debug(`[AppEventEmitterService] Consume Event: ${event.toString()}`)

        return super.on(event, listener)
    }
}
