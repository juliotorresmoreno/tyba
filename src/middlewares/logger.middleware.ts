
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { History } from 'src/entities/history.entity';
import { RequestWithSession } from 'src/types/http';
import { Connection, Repository } from 'typeorm';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private historyRepository: Repository<History>;

    constructor(
        private readonly connection: Connection,
    ) {
        this.historyRepository = this.connection.getRepository(History);
    }

    use(req: RequestWithSession, res: Response, next: NextFunction) {
        const record = {
            method: req.method,
            url: req.originalUrl,
            email: req.session?.email
        }
        this.historyRepository.save(record);
        next();
    }
}

