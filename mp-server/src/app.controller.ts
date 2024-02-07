import { Controller, Get, Patch, Post, Request } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('*')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Post()
  @Patch()
  async getProxy(@Request() req) {
    return await this.appService.proxy(req);
  }
}
