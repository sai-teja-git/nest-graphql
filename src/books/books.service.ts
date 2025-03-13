import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {

  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>
  ) { }

  async getAllBooks(where: any, selectedFields: any[]) {
    try {
      console.log('selectedFields', selectedFields)
      // const data = await this.bookRepository.find({ where, select: selectedFields.length > 0 ? selectedFields : ['book.id'] })
      const data = await this.bookRepository.createQueryBuilder('book')
        .select(selectedFields.length > 0 ? selectedFields : ['book.id'])
        .getMany();

      const queryRaw = this.bookRepository.createQueryBuilder('book')
        .select(selectedFields.length > 0 ? selectedFields : ['book.id'])
        .getQuery();
      console.log('queryRaw>>', queryRaw)
      return data
    } catch (e) {
      throw new HttpException(e.message ?? "Failed to fetch", e.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getBook(id: number) {
    try {
      const data = await this.bookRepository.findOne({ where: { id } })
      return data
    } catch (e) {
      throw new HttpException(e.message ?? "Failed to fetch", e.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getBookAuthors(id: number) {
    try {
      const data = await this.bookRepository.find({ where: [{ author: { id } }] })
      return data
    } catch (e) {
      throw new HttpException(e.message ?? "Failed to fetch", e.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

}
