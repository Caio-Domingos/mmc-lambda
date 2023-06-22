import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as serverless from 'serverless-http';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

let cachedServer;

async function bootstrap() {
  const expressApp = express();
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );
  app.setGlobalPrefix('api');
  await app.init();
  return serverless(expressApp);
}

export const handler = async (event, context) => {
  if (!cachedServer) {
    cachedServer = await bootstrap();
  }
  return cachedServer(event, context);
};
