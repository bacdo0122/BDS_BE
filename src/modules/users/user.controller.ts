import { Body, Controller, Get, Post, Put, Query, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "./dtos/createUser.dto";
import { UserService } from "./users.service";
import { AuthGuard } from "@nestjs/passport";
import { EditUserDto } from "./dtos/editUser.dto";
import { DeleteUserDto } from "./dtos/deleteUser.dto";
import { SearchDto } from "../../common/dtos/search.dto";


@ApiTags("Users")
@Controller("/user")
export class UserController{
    constructor (private userService: UserService) {}

    @Get('/')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    async getMe(@Request() request) {
      return this.userService.findOne({
        email: request.user.email,
      });
    }

    @Get("/getUsers")
    // @ApiBearerAuth()
    // @UseGuards(AuthGuard('jwt'))
    async findUser(@Query() query: SearchDto){
        return await this.userService.findUser(query)
    }

    @Post('/create')
    // @ApiBearerAuth()
    // @UseGuards(AuthGuard('jwt'))
    async createUser(@Body() payload: CreateUserDto){
        return this.userService.create({
            ...payload
        })
    }

    // @ApiBearerAuth()
    // @UseGuards(AuthGuard('jwt'))
    @Put('/edit')
    async editUser(@Body() payload: EditUserDto) {
        return await this.userService.edit(payload);
    }

    // @ApiBearerAuth()
    // @UseGuards(AuthGuard('jwt'))
    @Post('/delete')
    async deleteUser(@Body() payload: DeleteUserDto) {
        return await this.userService.delete(payload);
    }
}