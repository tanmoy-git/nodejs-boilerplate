import { Request } from 'express'

import { LogService } from '@logger/LogService'
import { Controller, Get, HttpCode, HttpStatus, Req } from '@nestjs/common'
import { ApiResponse, ApiUseTags } from '@nestjs/swagger'

@ApiUseTags('internal')
@Controller('healthcheck')
export class HealthcheckController {

    @Get()
    @ApiResponse({status: 204, description: 'Hurray!! Application is Up and Running'})
    @HttpCode(HttpStatus.NO_CONTENT)
    public async get(@Req() request: Request): Promise<null> {
        LogService.getInstance().getLogger().debug(`Request.headers: ${JSON.stringify(request.headers)}`)

        return null
    }
}
