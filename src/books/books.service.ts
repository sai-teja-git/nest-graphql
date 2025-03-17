import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book, FindBookInput } from './entities/book.entity';
import * as graphqlFields from 'graphql-fields';
import { GraphQLResolveInfo } from 'graphql';

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
  async getAllBooks(where: FindBookInput, graphqlInfo: GraphQLResolveInfo) {
    try {
      const selectedFields = this.getSelectedFields(graphqlInfo)
      console.table(selectedFields)
      const queryBuilder = this.bookRepository.createQueryBuilder('book')
        .select(selectedFields.length > 0 ? selectedFields : ['book.id'])
      if (where.rating) {
        if (where.rating.gt) {
          queryBuilder.andWhere('book.rating > :ratingGt', { ratingGt: where.rating.gt });
        }
        if (where.rating.lt) {
          queryBuilder.andWhere('book.rating < :ratingLt', { ratingLt: where.rating.lt });
        }
        if (where.rating.eq) {
          queryBuilder.andWhere('book.rating = :ratingEq', { ratingEq: where.rating.eq });
        }
        if (where.rating.gte) {
          queryBuilder.andWhere('book.rating >= :ratingGte', { ratingGte: where.rating.gte });
        }
        if (where.rating.lte) {
          queryBuilder.andWhere('book.rating <= :ratingLte', { ratingLte: where.rating.lte });
        }
      }

      for (let key in where) {
        if (key !== "rating") {
          queryBuilder.andWhere(`book.${key} = :key`, { [key]: where[key] });
        }
      }
      const data = await queryBuilder.getMany();

      const queryRaw = await queryBuilder.getQuery();
      console.log('queryRaw>>', queryRaw)
      return data
    } catch (e) {
      throw new HttpException(e.message ?? "Failed to fetch", e.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  /**
   * This method extracts the selected fields from the GraphQL query info.
   * It uses the graphqlFields library to parse the info object and retrieve the fields requested in the query.
   * The method then maps these fields to a format prefixed with "book." to match the expected format for the service layer.
   * 
   * @param info - The GraphQLResolveInfo object containing the query information.
   * @returns An array of strings representing the selected fields, each prefixed with "book.".
   */
  private getSelectedFields(info: GraphQLResolveInfo): string[] {
    const fields = graphqlFields(info);
    return Object.keys(fields).map(field => `book.${field}`);
  }

  async getBook(where: FindBookInput, graphqlInfo: GraphQLResolveInfo) {
    try {
      const selectedFields = this.getSelectedFields(graphqlInfo)
      console.table(selectedFields)
      const queryBuilder = this.bookRepository.createQueryBuilder('book')
        .select(selectedFields.length > 0 ? selectedFields : ['book.id'])

      if (where.rating) {
        if (where.rating.gt) {
          queryBuilder.andWhere('book.rating > :ratingGt', { ratingGt: where.rating.gt });
        }
        if (where.rating.lt) {
          queryBuilder.andWhere('book.rating < :ratingLt', { ratingLt: where.rating.lt });
        }
        if (where.rating.eq) {
          queryBuilder.andWhere('book.rating = :ratingEq', { ratingEq: where.rating.eq });
        }
        if (where.rating.gte) {
          queryBuilder.andWhere('book.rating >= :ratingGte', { ratingGte: where.rating.gte });
        }
        if (where.rating.lte) {
          queryBuilder.andWhere('book.rating <= :ratingLte', { ratingLte: where.rating.lte });
        }
      }

      for (let key in where) {
        if (key !== "rating") {
          queryBuilder.andWhere(`book.${key} = :${key}`, { [`${key}`]: where[key] });
        }
      }
      console.log('queryBuilder.getQuery', queryBuilder.getQuery())

      const data = await queryBuilder.getOne();
      return data;
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
