import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DATA } from 'src/const/data.const';
import { Author } from 'src/entities/author.entity';
import { Book } from 'src/entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeedService {

    constructor(
        @InjectRepository(Author)
        private readonly authorRepository: Repository<Author>,

        @InjectRepository(Book)
        private readonly bookRepository: Repository<Book>,
    ) { }

    async onModuleInit() {
        await this.seedAuthor();
        await this.seedBooks();
    }

    async seedAuthor() {
        const count = await this.authorRepository.count();
        const authors: any[] = DATA.authors
        if (count === 0) {
            await this.authorRepository.save(authors);
            console.log('Authors Seed data inserted successfully!');
        } else {
            console.log('Database already has Authors data. Skipping seeding.');
        }
    }

    async seedBooks() {
        const count = await this.bookRepository.count();
        const books: any[] = DATA.books
        if (count === 0) {
            await this.bookRepository.save(books);
            console.log('Books Seed data inserted successfully!');
        } else {
            console.log('Database already has Books data. Skipping seeding.');
        }
    }

}
