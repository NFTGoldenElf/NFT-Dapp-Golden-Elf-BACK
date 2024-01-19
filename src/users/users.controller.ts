import { Controller, Body, Post, Param, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Get('/findbyaddress/:address')
    async findByAdress(@Param('address') address: string) {
        const response = this.usersService.findByAddress(address);
        return response;
    }

    @Post()
    async createUser(@Body() createUserDTO: CreateUserDTO) {
        const newUser = await this.usersService.createNewUser(createUserDTO);
        return newUser;
    }
}
