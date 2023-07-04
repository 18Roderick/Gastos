import {
  MiddlewareConsumer,
  Module,
  NestModule,
  DynamicModule,
} from '@nestjs/common';
import { AuthMiddleware } from './auth/auth.middleware';
import {
  ConfigInjectionToken,
  AuthModuleConfig,
  AuthModuleAsyncConfig,
} from './config.interface';
import { SupertokensService } from './supertokens/supertokens.service';

@Module({
  providers: [SupertokensService],
  exports: [],
  controllers: [],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }

  static forRoot({
    connectionURI,
    apiKey,
    appInfo,
  }: AuthModuleConfig): DynamicModule {
    return {
      providers: [
        {
          useValue: {
            appInfo,
            connectionURI,
            apiKey,
          },
          provide: ConfigInjectionToken,
        },
      ],
      exports: [],
      imports: [],
      module: AuthModule,
    };
  }
  static registerAsync(options: AuthModuleAsyncConfig): DynamicModule {
    return {
      module: AuthModule,
      imports: options.imports,
      providers: [
        {
          provide: ConfigInjectionToken,
          useFactory: options.useFactory,
          inject: options.inject,
        },
        SupertokensService,
      ],
      exports: [SupertokensService],
    };
  }
}
