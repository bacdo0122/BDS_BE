import { HttpException, HttpStatus } from "@nestjs/common";

export class Exsisted extends HttpException {
    constructor() {
      super('Exsisted!', HttpStatus.FORBIDDEN);
    }
  }