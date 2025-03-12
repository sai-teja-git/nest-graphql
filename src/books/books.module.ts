import { forwardRef, Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksResolver } from './books.resolver';
import { Book } from './entities/book.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorsModule } from 'src/authors/authors.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book]),
    forwardRef(() => AuthorsModule)
  ],
  providers: [BooksResolver, BooksService],
  exports: [TypeOrmModule, BooksService]
})
export class BooksModule { }
