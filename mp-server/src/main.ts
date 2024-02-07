import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { AppInterceptor } from './app.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalInterceptors(new AppInterceptor());
  await app.listen(3000);
}
bootstrap();
