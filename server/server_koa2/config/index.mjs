import { config as development_env } from './development.mjs';
import { config as test_env } from './test.mjs';
import { config as production_env } from './production.mjs';

export const config = {
    development: development_env,
    test: test_env,
    production: production_env
}[process.env.NODE_ENV && process.env.NODE_ENV.trim() || 'development']