
import * as path from "path";
import { History } from "src/entities/history.entity";
import { Session, User } from "src/entities/user.entity";
import { Configuration } from "src/types/configuration";

export default function getConfig(): Configuration {
    const env = ['development', 'production']
        .includes(process.env.NODE_ENV)
        ? process.env.NODE_ENV as any
        : 'development';
    return {
        env: env,
        port: Number.parseInt(process.env.PORT) || 5000,
        secret: process.env.SECRET,
        redisUrl: process.env.REDIS_URL,
        baseUrl: process.env.BASE_URL,
        pageSize: Number.parseInt(process.env.PAGE_SIZE) || 10,
        database: {
            type: process.env.DATABASE_DRIVER as any,
            host: process.env.DATABASE_HOST || 'localhost',
            port: Number(process.env.DATABASE_PORT) || 5432,
            username: process.env.DATABASE_USER || '',
            password: process.env.DATABASE_PASSWORD || '',
            database: process.env.DATABASE_NAME || '',
            synchronize: process.env.DATABASE_SYNC === 'true',

            entities: [
                User,
                Session,
                History
            ],
            logging: 'all'
        } as any,
        google_maps_key: process.env.GOOGLE_MAPS_KEY,
        basePath: path.join(__dirname, '..', '..')
    }
}
