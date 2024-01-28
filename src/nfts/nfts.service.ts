import { Injectable } from '@nestjs/common';
import { MintNFTDTO } from './dto/mint-nft.dto';
import { ConfigService } from '@nestjs/config';
import { Readable } from 'stream';

const pinataSDK = require('@pinata/sdk')

@Injectable()
export class NftsService {
    private readonly pinata: any;
    private readonly external_url: string;
    constructor(
        private readonly configService: ConfigService
    ) {
        const PINATA_API_KEY = this.configService.get<string>("PINATA_API_KEY");
        const PINATA_SECRET_KEY = this.configService.get<string>("PINATA_SECRET_KEY");
        this.pinata = new pinataSDK(PINATA_API_KEY, PINATA_SECRET_KEY);
        this.external_url = "https://ipfs.io/ipfs/"
    }

    async mintNFT(mintNFTDTO: MintNFTDTO, file: Express.Multer.File) {
        try {
            const { name, description } = mintNFTDTO;

            const readableStreamForFile = new Readable();
            readableStreamForFile._read = () => { };
            readableStreamForFile.push(file.buffer);
            readableStreamForFile.push(null);

            const options = {
                pinataMetadata: {
                    name: name,
                },
                pinataOptions: {
                    cidVersion: 0
                }
            }
            const pinnedFile = await this.pinata.pinFileToIPFS(readableStreamForFile, options);

            const { IpfsHash } = pinnedFile;
            const metaDataNFT = {
                name,
                description,
                external_url: this.external_url,
                image: `https://ipfs.io/ipfs/${IpfsHash}`
            }
            const NFT_options = {
                pinataMetadata: {
                    name: name,
                    keyvalues: {
                        collection: 'Golden Elf NFT Collection'
                    }
                },
                pinataOptions: {
                    cidVersion: 0,
                }
            }
            const pinnedJSON = await this.pinata.pinJSONToIPFS(metaDataNFT, NFT_options);

            const NFT_IpfsHash = pinnedJSON.IpfsHash;
            const URI = `https://ipfs.io/ipfs/${NFT_IpfsHash}`

            return URI;
        }
        catch (error) {
            throw error;
        }
    }
}
