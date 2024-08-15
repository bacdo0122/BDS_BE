import { HttpException, HttpStatus } from "@nestjs/common";

export class UnVerifiedException extends HttpException {
    constructor() {
      super('unverified email', HttpStatus.FORBIDDEN);
    }
  }