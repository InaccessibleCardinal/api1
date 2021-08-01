import loggerMiddlware from './loggerMiddlware';
import authenticationMiddlware from './authenticationMiddleware';
import corsMiddlware from './corsMiddleware';

export default [corsMiddlware, authenticationMiddlware, loggerMiddlware];
