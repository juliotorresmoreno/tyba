import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/configuration';
import { HealthcheckController } from './healthcheck/healthcheck.controller';
import { ApiModule } from './api.module';
import getConfig from './config/configuration';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { RedisService } from './components/redis/redis.service';
import * as dotenv from 'dotenv';
import { LoggerMiddleware } from './middlewares/logger.middleware';

dotenv.config();

const config = getConfig();

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
        }),
        TypeOrmModule.forRoot(config.database as any),
        ApiModule,
    ],
    controllers: [HealthcheckController],
    providers: [RedisService],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware, LoggerMiddleware)
            .forRoutes('*');
    }
}
