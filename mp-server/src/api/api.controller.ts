import { Controller, Get, Post, Patch, Request } from '@nestjs/common';
import { ApiService } from './api.service';

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get('*')
  async getProxy(@Request() req) {
    return await this.apiService.proxy(req);
  }
  @Post('*')
  async postProxy(@Request() req) {
    return await this.apiService.proxy(req);
  }
  @Patch('*')
  async patchProxy(@Request() req) {
    return await this.apiService.proxy(req);
  }
}
