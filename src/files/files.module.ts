import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { MinioClient } from 'src/config/minio.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './entities/file.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([File])],
  controllers: [FilesController],
  providers: [FilesService, MinioClient]
})

export class FilesModule {}
