import { Controller, Get, Post, UploadedFile, UseInterceptors, BadRequestException, Param, Res } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './helper/fileFilter.helper';
import { diskStorage } from 'multer';
import { fileNamer } from './helper/fileNamer.helper';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService
  ) {}

  @Get('product/:imageName')
  findOne( @Res() res: Response, @Param('imageName') imageName: string){

    const path = this.filesService.getStaticProductImge( imageName );
    
    res.sendFile( path );
  }

  @Post('product')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: fileFilter,
    // limits: {fileSize: 1000}
    storage: diskStorage({
      destination: './static/products',
      filename: fileNamer
    })
  }))
  uploadProductFile( @UploadedFile() file: Express.Multer.File ){

    if( !file ){
      throw new BadRequestException('Make sure that the file is an image');
    }

    const securityUrl = `${ this.configService.get('HOST_API')}/files/product/${ file.filename }`;
    return {
      securityUrl
    };
  }
 
}
