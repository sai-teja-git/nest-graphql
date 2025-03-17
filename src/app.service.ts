import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { GraphQLClient } from 'graphql-request';

@Injectable()
export class AppService {

  constructor(
    private readonly graphqlClient: GraphQLClient) { }

  getHello(): string {
    return 'Hello World!';
  }

  /**
   * This TypeScript function fetches book data using a GraphQL query and returns the result along with
   * a success message and status code.
   * @param where - The `where` parameter in the `getBooksData` function is used to specify filtering
   * criteria for the books query. It allows you to pass in specific conditions to filter the books
   * data that you want to retrieve from the GraphQL endpoint. This parameter is of type
   * `FindBookInput` in the GraphQL
   * @returns The `getBooksData` function is returning an object with the following properties:
   * - `data`: The data fetched from the GraphQL endpoint.
   * - `message`: A message indicating that the data was fetched successfully.
   * - `status`: The HTTP status code indicating a successful response (200 OK).
   */
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
      const GRAPHQL_ENDPOINT = "http://127.0.0.1:5200/graphql"

      const variables = { where };
      const res = await axios.post(GRAPHQL_ENDPOINT, {
        query,
        variables
      });
      const data = res.data
      return {
        data,
        message: "Fetched Successfully",
        status: HttpStatus.OK
      }
    } catch (e) {
      throw new HttpException(e.message ?? "Failed to fetch", e.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

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
      const data = await this.graphqlClient.request(query, { where });
      return {
        data,
        message: "Fetched Successfully",
        status: HttpStatus.OK
      }
    } catch (e) {
      throw new HttpException(e.message ?? "Failed to fetch", e.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

}
