import { Body, Controller, ForbiddenException, HttpStatus, Post, Res, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ApiTags } from "@nestjs/swagger";
import { UserLoginReqDto } from "./dto/UserLogin.dto";
import { AuthService } from "./auth.service";
import { Response } from "express";
import { RefreshTokenDto } from "./dto/RefreshToken.dto";

@ApiTags('/auth')
@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('/login')
  async login(
    @Body() payload: UserLoginReqDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const res = await this.authService.login(payload);
    if (!res) {
      throw new ForbiddenException();
    }
    //  await this.userSerivce.addUserToRedis({email:payload.email,accessToken: res.accessToken});

    response.status(HttpStatus.OK);
    return {
      accessToken: res.accessToken,
      refreshToken: res.refreshToken,
    };
  }

  @Post('/refresh-token')
  async refreshToken(@Body() payload: RefreshTokenDto) {
    try {
      const data = this.jwtService.verify(payload.refreshToken);
      const accessToken = this.jwtService.sign({
        email: data.email,
      });
      const refreshToken = this.jwtService.sign(
        {
          email: data.email,
        },
        {
          expiresIn: '7d',
        },
      );
    //   await this.userSerivce.addUserToRedis({ email: data.email, accessToken });
      return {
        accessToken,
        refreshToken,
      };
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}