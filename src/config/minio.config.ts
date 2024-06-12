import {Injectable} from '@nestjs/common';
import * as Minio from 'minio'

@Injectable()
export class MinioClient {
    public client: Minio.Client;

    constructor(){
        this.client = new Minio.Client({
            endPoint: process.env.MINIO_ENDPOINT,
            port: parseInt(process.env.MINIO_PORT, 10),
            useSSL: process.env.MINIO_USE_SSL === 'true',
            accessKey: process.env.MINIO_ACCESS_KEY,
            secretKey: process.env.MINIO_SECRET_KEY,
        });
    }
}