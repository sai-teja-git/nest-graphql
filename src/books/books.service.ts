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

  /**
   * The function `getAllBooks` retrieves books based on specified fields using TypeORM in TypeScript.
   * @param {any} where - The `where` parameter in the `getAllBooks` function is used to specify
   * conditions for filtering the books to be retrieved. It allows you to define criteria based on the
   * properties of the books, such as title, author, genre, etc. This helps in narrowing down the
   * results to only include books
   * @param {any[]} selectedFields - The `selectedFields` parameter in the `getAllBooks` function is an
   * array that contains the fields that you want to select from the database query. If the
   * `selectedFields` array is empty, it defaults to selecting only the `book.id` field. Otherwise, it
   * selects the fields specified in
   * @returns The `getAllBooks` function is returning the data fetched from the database based on the
   * provided `where` condition and `selectedFields`. The function first logs the `selectedFields`
   * array, then uses the TypeORM `createQueryBuilder` method to construct a query to select the
   * specified fields or default to selecting the book id if no fields are provided. The data is
   * retrieved using `getMany()` method.
   */
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
