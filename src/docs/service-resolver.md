# Calling Graphql resolver from service

**1. Call the GraphQL Query Internally (via HTTP Request)**

```ts
async getData(){
    const query = `
        query Books($where: FindBookInput!) {
          books(where: $where) {
            id
            title
            author {
              name
              birth_year
            }
          }
        }
      `;
      const GRAPHQL_ENDPOINT = "http://127.0.0.1:5200/graphql"

      const variables = { where };
      const res = await axios.post(GRAPHQL_ENDPOINT, {
        query,
        variables
      });
      const data = res.data
}
```

**2. Call the GraphQL Query Internally (via GraphQLClient)**

```ts
@Injectable()
export class AppService {
  constructor(private readonly graphqlClient: GraphQLClient) {}

  async getBooksData(where = {}) {
    try {
      const query = `
        query Books($where: FindBookInput!) {
          books(where: $where) {
            id
            title
            author {
              name
              birth_year
            }
          }
        }
      `;

      const data = await this.graphqlClient.request(query, { where });
      return {
        data,
        message: 'Fetched Successfully',
        status: HttpStatus.OK,
      };
    } catch (e) {
      throw new HttpException(
        e.message ?? 'Failed to fetch',
        e.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
```

in `app-module.ts`

```ts
import { Module } from '@nestjs/common';
import { GraphQLClient } from 'graphql-request';
import { AppService } from './app.service';

@Module({
  providers: [
    {
      provide: GraphQLClient,
      useValue: new GraphQLClient('http://127.0.0.1:5200/graphql'),
    },
    AppService,
  ],
})
export class AppModule {}
```

in case of multiple graphql endpoints

```ts
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GraphQLClient } from 'graphql-request';

@Injectable()
export class AppService {
  constructor(
    @Inject('BOOKS_CLIENT')
    private readonly booksClient: GraphQLClient,
    @Inject('AUTHORS_CLIENT')
    private readonly authorsClient: GraphQLClient,
  ) {}

  async getBooks(where = {}) {
    try {
      const query = `
        query Books($where: FindBookInput!) {
          books(where: $where) {
            id
            title
            author {
              name
              birth_year
            }
          }
        }
      `;
      const data = await this.booksClient.request(query, { where });
      return {
        data,
        message: 'Fetched Successfully',
        status: HttpStatus.OK,
      };
    } catch (e) {
      throw new HttpException(
        e.message ?? 'Failed to fetch',
        e.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAuthors(where = {}) {
    try {
      const query = `
        query Authors($where: FindAuthorInput!) {
          authors(where: $where) {
            id
            name
            birth_year
          }
        }
      `;
      const data = await this.authorsClient.request(query, { where });
      return {
        data,
        message: 'Fetched Successfully',
        status: HttpStatus.OK,
      };
    } catch (e) {
      throw new HttpException(
        e.message ?? 'Failed to fetch',
        e.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
```

in `app-module.ts`

```ts
import { Module } from '@nestjs/common';
import { GraphQLClient } from 'graphql-request';
import { AppService } from './app.service';

@Module({
  providers: [
    {
      provide: 'BOOKS_CLIENT',
      useValue: new GraphQLClient('http://127.0.0.1:5200/books/graphql'),
    },
    {
      provide: 'AUTHORS_CLIENT',
      useValue: new GraphQLClient('http://127.0.0.1:5300/authors/graphql'),
    },
    AppService,
  ],
})
export class AppModule {}
```
