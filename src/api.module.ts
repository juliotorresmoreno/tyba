
import { Module } from '@nestjs/common';
import { AuthModule } from './resources/auth/auth.module';
import { SecureService } from './components/secure/secure.service';
import { SecureModule } from './components/secure/secure.module';
import { RedisModule } from './components/redis/redis.module';
import { MapsModule } from './resources/maps/maps.module';
import { HistoryModule } from './resources/history/history.module';

@Module({
    imports: [
        AuthModule,
        SecureModule,
        RedisModule,
        MapsModule,
        HistoryModule,
    ],
    providers: [SecureService],
})
export class ApiModule {
}
