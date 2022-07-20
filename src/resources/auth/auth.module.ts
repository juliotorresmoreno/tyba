import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SecureService } from 'src/components/secure/secure.service';
import { RedisService } from 'src/components/redis/redis.service';

@Module({
    imports: [],
    controllers: [AuthController],
    providers: [
        AuthService,
        SecureService,
        RedisService
    ]
})
export class AuthModule { }
