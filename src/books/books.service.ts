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

  async getAllBooks(where: any) {
    try {
      const data = await this.bookRepository.find({ where })
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
