import * as moduleAlias from 'module-alias'

moduleAlias.addAliases({
    '@app': `${__dirname}`,
    '@entities': `${__dirname}/entities`,
    '@infra': `${__dirname}/infrastructure`,
    '@logger': `${__dirname}/modules/logger`,
    '@modules': `${__dirname}/modules`,
    '@utils': `${__dirname}/utils`,
})
