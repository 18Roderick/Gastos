import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import supertokens from 'supertokens-node';
import { SupertokensExceptionFilter } from './auth/auth/auth.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});

  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT');

  app.enableCors({
    // TODO: URL of the website domain
    allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.use(helmet());
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Savings')
    .setDescription('Save your personal ')
    .setVersion('1.0')
    .addTag('Savings')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalFilters(new SupertokensExceptionFilter());
  await app.listen(PORT, () => {
    console.log(` running on port http://localhost:${PORT}`);
  });
}
bootstrap();
