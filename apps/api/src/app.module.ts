import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import * as Joi from 'joi';
import config from './config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { typeOrmConfig } from './db/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
        APP_NAME: Joi.string().required(),
        API_DOMAIN: Joi.string().required(),
        WEBSITE_BASE_PATH: Joi.string().required(),
        API_KEY: Joi.string().required(),
        CONNECTION_URI: Joi.string().required(),
        WEBSITE_DOMAIN: Joi.string().optional(),
        API_BASE_PATH: Joi.string().optional(),
      }),
    }),
    AuthModule.registerAsync({
      useFactory: async (configService: ConfigType<typeof config>) => {
        const spConfig = configService.supertokens;
        return {
          connectionURI: spConfig.connectionURI,
          apiKey: spConfig.apiKey,
          appInfo: {
            appName: spConfig.appName,
            apiDomain: spConfig.apiDomain,
            websiteDomain: spConfig.websiteDomain,
            apiBasePath: '/auth',
            websiteBasePath: '/auth',
          },
        };
      },
      inject: [config.KEY],
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
