import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksResolver } from './books.resolver';

@Module({
  imports: [],
  providers: [BooksResolver, BooksService],
})
export class BooksModule { }
