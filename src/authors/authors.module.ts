import { forwardRef, Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsResolver } from './authors.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { BooksModule } from 'src/books/books.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Author]),
    forwardRef(() => BooksModule)
  ],
  providers: [AuthorsResolver, AuthorsService],
  exports: [TypeOrmModule, AuthorsService]
})
export class AuthorsModule { }
