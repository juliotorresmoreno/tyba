import { Controller, Get, Param, Query, Request } from '@nestjs/common';
import getConfig from 'src/config/configuration';
import { RequestWithSession } from 'src/types/http';
import { Authentication } from 'src/utils/secure';
import { MapsService } from './maps.service';
const axios = require('axios').default;

@Controller('maps')
export class MapsController {
  constructor(private readonly mapsService: MapsService) { }

 
  @Get(':location_type')
  @Authentication()
  async findOne(@Request() req: RequestWithSession, @Param('location_type') location_type: string, @Query('location') location: string) {
    const url = new URL("https://maps.googleapis.com/maps/api/place/nearbysearch/json");
    
    url.searchParams.append("location", location);
    url.searchParams.append("radius", "1500");
    url.searchParams.append("type", location_type);
    url.searchParams.append("key", getConfig().google_maps_key);
    
    try {
      const response = await axios.get(url.href);
  
      return response.data.results;
    } catch (error) {
      return [];
    }
  }
}
