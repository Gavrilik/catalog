import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT: number = +process.env.PORT || 3000;
  const app: INestApplication = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Каталог Автомобилей')
    .setDescription(' ')
    .setVersion('0.1.0')
    .addTag('Приложение')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //app.useGlobalPipes(new ValidationPipe()); пайпы и гуарды можно использовать глобально для всего приложения
  //app.useGlobalGuards(new RolesGuard()); защиту по ролям можно ипользовать глобально
  await app.listen(PORT, () => console.log(`Server started on ${PORT}`));
}
bootstrap();
