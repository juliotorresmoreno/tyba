import { Injectable } from '@nestjs/common';

@Injectable()
export class MapsService {
  
  findOne(id: number) {
    return `This action returns a #${id} map`;
  }
}
