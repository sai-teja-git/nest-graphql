import { Args, Info, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';
import { AuthorsService } from 'src/authors/authors.service';
import { Author } from 'src/authors/entities/author.entity';
import { BooksService } from './books.service';
import { Book, FindBookInput } from './entities/book.entity';


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
    return await this.booksService.getAllBooks(where, info);
  }

  @Query(() => Book, { name: 'book' })
  findOne(@Args('where') where: FindBookInput, @Info() info: GraphQLResolveInfo) {
    return this.booksService.getBook(where, info);
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
