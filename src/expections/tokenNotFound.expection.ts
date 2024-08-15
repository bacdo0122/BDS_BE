import { HttpException, HttpStatus } from "@nestjs/common";

export class tokenNotFound extends HttpException {
    constructor() {
      super('Token not found!', HttpStatus.FORBIDDEN);
    }
  }