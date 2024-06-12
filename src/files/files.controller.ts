import { FilesService } from './files.service';
import { Controller, Get, Param, ParseIntPipe, Post, UploadedFile } from '@nestjs/common';
import { File } from './entities/file.entity';

@Controller('files')
export class FilesController {

    constructor(private filesService: FilesService){}

    @Post('upload')
    async uploadFile(@UploadedFile() file:Express.Multer.File):Promise<File>{
        return this.filesService.uploadFile(file);
    }

    @Get(':id')
    async getFileDetails(@Param('id', ParseIntPipe) id:number):Promise<File>{
        return this.filesService.getFileDetails(id);
    }
}
