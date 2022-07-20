
import { Injectable } from '@nestjs/common';
import { History } from 'src/entities/history.entity';
import { Connection, Repository } from 'typeorm';

@Injectable()
export class HistoryService {

  private historyRepository: Repository<History>;

  constructor(
    private readonly connection: Connection
  ) {
    this.historyRepository = this.connection.getRepository(History);
  }

  findAll() {
    return this.historyRepository.find({
      select: ['id', 'method', 'url', 'email', 'creation_at']
    });
  }
}
