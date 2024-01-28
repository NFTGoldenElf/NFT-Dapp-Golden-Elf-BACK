import { Controller, UploadedFile, UseInterceptors } from '@nestjs/common';
import { NftsService } from './nfts.service';
import { Post, Body } from '@nestjs/common';
import { MintNFTDTO } from './dto/mint-nft.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('nfts')
export class NftsController {
    constructor(private readonly nftsService: NftsService) { }

    @Post('create')
    @UseInterceptors(FileInterceptor("image"))

    async createFileNFT(@Body() mintNFTDTO: MintNFTDTO, @UploadedFile() image: Express.Multer.File) {
        try {
            const response: string = await this.nftsService.mintNFT(mintNFTDTO, image);
            return response
        }
        catch (error) {
            throw error
        }
    }
}
