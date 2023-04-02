import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomBadRequestException extends HttpException {
  constructor(message: string) {
    super(
      { status: HttpStatus.BAD_REQUEST, message, errors: true },
      HttpStatus.BAD_REQUEST,
    );
  }
}
