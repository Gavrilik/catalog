//класс который наследуется от httpException

import { HttpException, HttpStatus } from '@nestjs/common';

// кастомные ошибки
export class ValidationException extends HttpException {
  messages; //в классе добавили новое поле

  constructor(response) {
    // параметром респонс
    super(response, HttpStatus.BAD_REQUEST); //вызвали родительский конструктор 2 параметр статус код с ошибкой
    this.messages = response; // и в messages присваиваем то что пришло в респон
  }
}
