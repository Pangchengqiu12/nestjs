import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LoginGuard } from './login.guard';

@Controller()
@UseGuards(LoginGuard)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('index')
  getHello(): string {
    return 'hello world';
  }
  @Get('test')
  getTest(): string {
    return 'test';
  }
}
