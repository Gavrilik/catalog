import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  //app.useGlobalPipes(new ValidationPipe()); пайпы и гуарды можно использовать глобально для всего приложения
  await app.listen(PORT, () => console.log(`Server started on ${PORT}`));
}
bootstrap();
