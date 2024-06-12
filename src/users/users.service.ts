import { CreateUserDto } from './dto/cerate-user.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    private users: User[] = [{id: 1, name: 'Ram'}, {id: 2, name:'Mohan'}];

    findAll():User[] {
        return this.users;
    }

    findById(userId: number):User {
        let user = this.users.find(u => u.id === userId);
        if(!user){
            throw new NotFoundException()
        }
        return user;
    }

    addUser(createUserDto:CreateUserDto):User {
        let currUser = {id: Date.now(), ...createUserDto}
        this.users.push(currUser);
        return currUser;
    }

    searchUser(name:string):User[]{
        if(name){
            return this.users.filter(user => user.name === name)
        }
        return [];
    }
}
