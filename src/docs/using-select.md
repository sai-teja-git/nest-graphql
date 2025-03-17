# Fetching Required Fields from DB

You can use graphql-fields (or manually parse GraphQLResolveInfo) to select only the requested fields.

1. The @Info() decorator in the resolver extracts the requested fields from the GraphQL query.
2. The getSelectedFields(info) function parses the fields and converts them into a TypeORM select query.

##### Resolver

```ts
  @Query(() => [Book], { name: 'books' })
  async findAll(@Args("where") where: FindBookInput, @Info() info: GraphQLResolveInfo) {
    return await this.booksService.getAllBooks(where, info);
  }
```

##### Service

```ts
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
```
