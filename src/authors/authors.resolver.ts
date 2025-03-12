import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { BooksService } from 'src/books/books.service';
import { AuthorsService } from './authors.service';
import { Author, FindAuthorInput } from './entities/author.entity';
import { Book } from 'src/books/entities/book.entity';

@Resolver(() => Author)
export class AuthorsResolver {
  constructor(
    private readonly authorsService: AuthorsService,
    private readonly booksService: BooksService
  ) { }

  @Query(() => [Author], { name: 'authors' })
  async getAuthors(
    @Args("where") where: FindAuthorInput
  ): Promise<Author[]> {
    return await this.authorsService.getAllAuthors(where);
  }

  @Query(() => Author, { name: 'author' })
  findOne(@Args('id') { id }: FindAuthorInput) {
    return this.authorsService.getAuthor(id as number);
  }

  @ResolveField(() => Book, { name: "books" })
  async books(@Parent() parent: Author) {
    return await this.booksService.getBookAuthors(parent.id)
  }

}
