import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import UserEntity from "../../entities/users.entity";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserService } from "../users/users.service";
import { jwtStrategy } from "./strategies/jwt.strategy";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: process.env.JWT_EXPIRED_TIME },
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, jwtStrategy], 
  exports: [AuthService],
})
export class AuthModule {}