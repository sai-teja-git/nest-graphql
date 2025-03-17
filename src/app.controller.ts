import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("books")
  async getBooks() {
    return await this.appService.getBooks()
  }

  @Get("books-data")
  async getBooksData() {
    return await this.appService.getBooksData()
  }
}
