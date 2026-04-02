import { Response } from "express";

export const ApiResponse = {
  success<T>(res: Response, data: T, statusCode = 200): Response {
    return res.status(statusCode).json({ success: true, data });
  },

  error(res: Response, message: string, statusCode = 400): Response {
    return res.status(statusCode).json({ success: false, message });
  },

  paginated<T>(
    res: Response,
    data: T[],
    total: number,
    page: number,
    limit: number,
  ): Response {
    return res.json({
      success: true,
      data,
      pagination: { total, page, limit, pages: Math.ceil(total / limit) },
    });
  },
};
