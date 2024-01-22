import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDTO } from './dto/create-user.dto';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async findByAddress(accountAddress: string): Promise<User | null | { exist: boolean }> {
        const existingUser = await this.userModel.findOne({ accountAddress })
        if (Boolean(existingUser)) {
            const { __v, ...result } = existingUser["_doc"];
            return {
                ...result,
                exist: true
            }
        } else {
            return {
                exist: false,
            }
        }
    }

    async createNewUser(createUserDTO: CreateUserDTO): Promise<User> {
        const newUser = new this.userModel(createUserDTO);
        const savedUser = await newUser.save()
        const { __v, ...result } = savedUser["_doc"]
        return result
    }

    async editUser(editUserDTO: any, id: string): Promise<User> {
        await this.userModel.updateOne(
            { _id: id },
            {
                $set: {
                    username: editUserDTO.username,
                    profilePhoto: editUserDTO.profilePhoto
                }
            }
        )
        const updatedUser = await this.userModel.findById(id);
        if (!updatedUser) {
            throw new NotFoundException('Usuario no encontrado después de la actualización');
        }
        const { __v, ...resultData } = updatedUser["_doc"];
        return resultData;
    }
}
