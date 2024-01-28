import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class EditUserDTO {
    @IsString()
    @IsNotEmpty()
    @MaxLength(25)
    username: string;

    profilePhoto: any;
}