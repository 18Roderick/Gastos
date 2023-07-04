import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  PORT: process.env.PORT,
  database: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
  supertokens: {
    connectionURI: process.env.CONNECTION_URI,
    apiKey: process.env.API_KEY,
    appName: process.env.APP_NAME,
    apiDomain: process.env.API_DOMAIN,
    websiteDomain: process.env.WEBSITE_DOMAIN,
    apiBasePath: process.env.API_BASE_PATH,
    websiteBasePath: process.env.WEBSITE_BASE_PATH,
  },
}));
