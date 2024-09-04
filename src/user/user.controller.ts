import { Controller, Get, Headers, Post, Put, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Delete } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService:UserService
  ) {}

  @Get('/')
  getUser(@Headers('tokenAuthorization') tokenAuthorization:any, @Res({ passthrough: true }) responseReq):any {
    return this.userService.getUser(tokenAuthorization, responseReq);  
  }
  
  @Get(':id')
  getUserId(@Headers('tokenAuthorization') tokenAuthorization:any, @Param('id') id:any, @Res({ passthrough: true }) responseReq) {
    return this.userService.getUserId(tokenAuthorization, id, responseReq);
  }

  @Post('create')
  createUser(@Headers('tokenAuthorization') tokenAuthorization:any, @Body() createUserDto: CreateUserDto, @Res({ passthrough: true }) responseReq) {
    return this.userService.createUser(tokenAuthorization, createUserDto, responseReq);
  }

  @Delete(':id')
  deleteUser(@Headers('tokenAuthorization') tokenAuthorization:any, @Param('id') id: string, @Res({ passthrough: true }) responseReq) {
    return this.userService.deleteUser(tokenAuthorization, id, responseReq);
  }

  @Put(':id')
  updateUser(@Headers('tokenAuthorization') tokenAuthorization:any, @Param('id') id: any, @Body() updateUserDto: UpdateUserDto, @Res({ passthrough: true }) responseReq) {
    return this.userService.updateUser(tokenAuthorization, id, updateUserDto, responseReq);
  }

}
