import { LogLevel } from '@utils/LogLevel'

const RADIX = 10
const PORT_MIN = 80
const PORT_MAX = 65535

const portValidator = (val: string) => {
    const port = parseInt(val, RADIX)

    return /^\d+$/.test(val) && port >= PORT_MIN && port <= PORT_MAX
}

const positiveNumberValidator = (val: string) => {
    const num = parseInt(val, RADIX)

    return /^\d+$/.test(val) && num >= 0
}

const booleanValidator = (val: string) => val.toLowerCase() === 'true' || val.toLowerCase() === 'false'
const logLevelValidator = (val: string) => (val in LogLevel)

type ValidationFunction = (value: string) => boolean
const noop: ValidationFunction = () => true

const fetchEnvVariable = (variable: string,
                          errorMsg: string,
                          validator: (value: string) => boolean = noop,
                          ): string => {
    const envVar = process.env[variable]
    if (envVar && validator(envVar)) {
        return envVar
    }
    throw new Error(`missing or invalid env variable ${variable}, ${errorMsg}`)
}

export {
    fetchEnvVariable,
    booleanValidator,
    logLevelValidator,
    noop,
    RADIX,
    portValidator,
    positiveNumberValidator,
}
