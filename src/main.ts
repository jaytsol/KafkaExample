import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (error) => new BadRequestException(error),
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )

  await app.listen(3000);
}
bootstrap();
