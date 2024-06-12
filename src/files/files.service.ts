import { MinioClient } from './../config/minio.config';
import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './entities/file.entity';
import {v4 as uuidv4} from 'uuid';

@Injectable()
export class FilesService {
    constructor(
        @InjectRepository(File)
        private fileRepository: Repository<File>,
        private minioClient: MinioClient,
    ){}

    async uploadFile(file: Express.Multer.File): Promise<File>{
        const bucketName = 'uploads';
        const fileName = `${uuidv4()}-${file.originalname}`;

        await this.minioClient.client.putObject(bucketName, fileName, file.buffer);

        const fileEntity = this.fileRepository.create({
            filename: file.originalname,
            filepath: `${bucketName}/${fileName}`,
        });

        return this.fileRepository.save(fileEntity);
    }

    async getFileDetails(id: number): Promise<File> {
        const file = await this.fileRepository.findOne({ where: { id } });
        if (!file) {
          throw new NotFoundException(`File with ID ${id} not found`);
        }
        return file;
      }
}
