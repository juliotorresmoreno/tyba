import { Credentials } from "aws-sdk";
import { CredentialsOptions } from "aws-sdk/lib/credentials";
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export type Configuration = {
    env: 'development' | 'production';
    port: number;
    secret: string;
    database: TypeOrmModuleOptions;
    redisUrl: string;
    baseUrl: string;
    pageSize: number;
    google_maps_key: string;
    basePath: string
}
