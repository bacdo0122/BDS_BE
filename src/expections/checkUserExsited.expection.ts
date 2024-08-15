import { HttpException, HttpStatus } from "@nestjs/common";

export class checkUserExistedExpection extends HttpException {
    constructor() {
      super('The user has existed ! Find a new user', HttpStatus.FORBIDDEN);
    }
  }