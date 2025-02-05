import { join } from 'path';
import { BadRequestException, Injectable } from '@nestjs/common';
import { existsSync } from 'fs';

@Injectable()
export class FilesService {
    getStaticProductImge( imageName: string ){
        const path = join(__dirname, '../../static/products', imageName);

        if( !existsSync(path) ){
            throw new BadRequestException(`Image ${ imageName} not found`);
        }

        return path;
    }
}
