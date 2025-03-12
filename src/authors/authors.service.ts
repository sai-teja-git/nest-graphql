import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorsService {
    constructor(
        @InjectRepository(Author)
        private authorRepo: Repository<Author>
    ) { }

    async getAllAuthors(where: any) {
        try {
            const data = await this.authorRepo.find({
                where,
            })
            return data
        } catch (e) {
            throw new HttpException(e.message ?? "Failed to fetch", e.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getAuthor(id: number) {
        try {
            const data = await this.authorRepo.findOne({ where: { id } })
            return data
        } catch (e) {
            throw new HttpException(e.message ?? "Failed to fetch", e.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getAuthorBooks(id: number) {
        try {
            const data = await this.authorRepo.findOne({ where: [{ books: { id } }] })
            return data
        } catch (e) {
            throw new HttpException(e.message ?? "Failed to fetch", e.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

}
