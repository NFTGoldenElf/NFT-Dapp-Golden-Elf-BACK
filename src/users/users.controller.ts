import { Controller, Body, Post, Param, Get, Patch, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { EditUserDTO } from './dto/edit-user.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService,
        private cloudinaryService: CloudinaryService
    ) { }

    @Get('findbyaddress/:address')
    async findByAdress(@Param('address') address: string) {
        const response = this.usersService.findByAddress(address);
        return response;
    }

    @Post()
    async createUser(@Body() createUserDTO: CreateUserDTO) {
        const newUser = await this.usersService.createNewUser(createUserDTO);
        return newUser;
    }

    @Patch(':id')
    @UseInterceptors(FileInterceptor('profilePhoto'))
    async editUser(
        @Body() editUserDTO: EditUserDTO,
        @Param('id') id: string,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 2.5 * 1024 * 1024 }),
                    new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' })
                ]
            })
        ) file: Express.Multer.File
    ) {
        const image = await this.cloudinaryService.uploadFile(file);
        const secure_url = image.secure_url;
        const editInfo = {
            username: editUserDTO.username,
            profilePhoto: secure_url
        }
        const editUser = await this.usersService.editUser(editInfo, id)
        return editUser;
    }
    
    @Get(':address')
    async getUsersExceptMe(@Param('address') address: string) {
        if(!address) throw Error('address not provided')
        const users = await this.usersService.getAllUsersExceptMe(address);
        return users;
    }
}
