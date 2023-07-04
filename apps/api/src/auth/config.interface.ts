import { ModuleMetadata, Type } from '@nestjs/common';
import { AppInfo } from 'supertokens-node/types';

export const ConfigInjectionToken = 'ConfigInjectionToken';

export type AuthModuleConfig = {
  appInfo: AppInfo;
  connectionURI: string;
  apiKey?: string;
};

export interface AuthModuleFactory {
  createAuthModuleOptions: () => Promise<AuthModuleConfig> | AuthModuleConfig;
}

export interface AuthModuleAsyncConfig extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useClass?: Type<AuthModuleFactory>;
  useExisting?: Type<AuthModuleFactory>;
  useFactory?: (...args: any[]) => Promise<AuthModuleConfig> | AuthModuleConfig;
}
