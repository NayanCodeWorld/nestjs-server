import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/cerate-user.dto';
import { User } from './entities/user.entity';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private usersService : UsersService){}

    @ApiOkResponse({type:User, isArray:true})
    @Get('/all')
    getUsers():User[]{
        return this.usersService.findAll();
    }

    @ApiNotFoundResponse()
    @ApiOkResponse({type:User})
    @Get(':id')
    getUser(@Param('id') id:string):User{
        return this.usersService.findById(Number(id));
    }

    @ApiCreatedResponse({type: User})
    @Post()
    addUser(@Body() body: CreateUserDto):User {
        return this.usersService.addUser(body);
    }

    @ApiOkResponse({type:User, isArray: true})
    @ApiQuery({name:'name', required: false})
    @Get('/serach-user')
    searchUser(@Query('name') name?:string):User[] {
        return this.usersService.searchUser(name)
    }
}
