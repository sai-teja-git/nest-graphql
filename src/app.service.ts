import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {

  getHello(): string {
    return 'Hello World!';
  }

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

}
