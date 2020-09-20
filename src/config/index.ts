import devConfig from './config.dev';
import prodConfig from './config.prod';

const configs = {
  development: devConfig,
  production: prodConfig,
};

const env = process.env.NODE_ENV || 'development';

export default () => configs[env];
