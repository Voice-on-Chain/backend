import { Response } from "express";
import { SearchService } from "../services/search.service";
import AppError from "../utils/helpers/AppError";
import { ExtendedRequest } from "../utils/interfaces";

const searchService = new SearchService();

export class SearchController {
  public async search(
    request: ExtendedRequest,
    response: Response
  ): Promise<void> {
    const { query } = request.query;
    try {
      const search = await searchService.search(query as string);
      response.status(200).json(search);
    } catch (error: any) {
      // console.log({ error });
      if (error instanceof AppError) {
        response.status(error.statusCode).json({ message: error.message });
      } else {
        response.status(500).json({ message: "Internal Server Error" });
      }
    }
  }
}
