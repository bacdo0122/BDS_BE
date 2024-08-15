import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../../users/users.service';

@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  
  constructor(
    private userService: UserService,
 
    ) {
    super({
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_SECRET_KEY,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: true
    });
  } 

  async validate(req,payload: any) {  
    const token = req.headers.authorization.split(" ")[1];
    // const getTokenFromRedis = await this.userService.getUserAccessTokenFromRedis(payload.email);  
    if (payload === null) {
      throw new UnauthorizedException();
    }
    return payload;
  }
  
}
