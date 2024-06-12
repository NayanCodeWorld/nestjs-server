import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/cerate-user.dto';
import { User } from './entities/user.entity';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOkResponse({ type: [User] })
  @Get('/all')
  async getUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @ApiNotFoundResponse()
  @ApiOkResponse({ type: User })
  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    return this.usersService.findById(Number(id));
  }

  @ApiCreatedResponse({ type: User })
  @Post()
  async addUser(@Body() body: CreateUserDto): Promise<User> {
    return this.usersService.addUser(body);
  }

  @ApiOkResponse({ type: [User] })
  @ApiQuery({ name: 'name', required: false })
  @Get('/serach-user')
  async searchUser(@Query('name') name?: string): Promise<User[]> {
    return this.usersService.searchUser(name);
  }
}