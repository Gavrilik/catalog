import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from 'src/exceptions/validation.exception';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  //используется для валидации входных данных (или преобразование входных данных строка в число)
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const obj = plainToClass(metadata.metatype, value); //получаем объект который валидируем (вызываем функцию которая преобразовывает (значение в класс))
    const errors = await validate(obj); //c помощью валидате получаем ошибки после валидации объекта
    if (errors.length) {
      const messages = errors.map((err) => {
        return `${err.property} -${Object.values(err.constraints).join(',')}`; // в строку добовляем property (строка которая не прошла валидацию)
      }); // err.constraints - ограничения не прошедшие проверку(с помощью join склеиваем в строку)
      throw new ValidationException(messages);
    }
    return value;
  }
}
