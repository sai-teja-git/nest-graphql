import { Args, Info, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthorsService } from 'src/authors/authors.service';
import { Author } from 'src/authors/entities/author.entity';
import { BooksService } from './books.service';
import { Book, FindBookInput } from './entities/book.entity';
import { GraphQLResolveInfo } from 'graphql';
import * as graphqlFields from 'graphql-fields';

@Resolver(() => Book)
export class BooksResolver {
  constructor(
    private readonly booksService: BooksService,
    private readonly authorService: AuthorsService
  ) { }

  // @Mutation(() => Book)
  // createBook(@Args('createBookInput') createBookInput: CreateBookInput) {
  //   return this.booksService.create(createBookInput);
  // }

  @Query(() => [Book], { name: 'books' })
  async findAll(@Args("where") where: FindBookInput, @Info() info: GraphQLResolveInfo) {
    const requestedFields = this.getSelectedFields(info);
    return await this.booksService.getAllBooks(where, requestedFields);
  }

  private getSelectedFields(info: GraphQLResolveInfo): string[] {
    const fields = graphqlFields(info);
    return Object.keys(fields).map(field => `book.${field}`);
  }

  @Query(() => Book, { name: 'book' })
  findOne(@Args('id') { id }: FindBookInput) {
    return this.booksService.getBook(id as number);
  }

  @ResolveField(() => Author, { name: "author" })
  async author(@Parent() parent: Book) {
    return await this.authorService.getAuthorBooks(parent.id)
  }

  // @Mutation(() => Book)
  // updateBook(@Args('updateBookInput') updateBookInput: UpdateBookInput) {
  //   return this.booksService.update(updateBookInput.id, updateBookInput);
  // }

  // @Mutation(() => Book)
  // removeBook(@Args('id', { type: () => Int }) id: number) {
  //   return this.booksService.remove(id);
  // }
}
