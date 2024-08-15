import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../users/users.service";
import { UserLoginReqDto } from "./dto/UserLogin.dto";

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UserService,
    ){} 

    async login({ email, password }: UserLoginReqDto) {
        const res = await this.userService.findOne({email, password});
        if (!res) {
          return;
        }
      // console.log(validPassword)
      return {
        accessToken: this.jwtService.sign({
          email,
          id: res.id,
        }),
        refreshToken: this.jwtService.sign(
          {
            email,
            id: res.id,
          },
          {
            expiresIn: '7d',
          },
        ),
      };
      }
    
      async getUser(email: string){
        const res = await this.userService.getOneUserByEmail(email);
        const data = res.data;
        return data;
      }
}