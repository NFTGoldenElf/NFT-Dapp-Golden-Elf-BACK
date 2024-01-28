import { IsNotEmpty, IsString } from "class-validator";

export class MintNFTDTO {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    image: any;
}