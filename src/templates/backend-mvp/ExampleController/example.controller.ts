import { Request, Response } from "express";

export class ExampleController {
  getAll(_req: Request, res: Response): void {
    res.json({ message: "List of items", data: [] });
  }

  getOne(req: Request, res: Response): void {
    res.json({ message: `Item ${req.params.id}`, data: null });
  }

  create(req: Request, res: Response): void {
    res.status(201).json({ message: "Created", data: req.body });
  }

  update(req: Request, res: Response): void {
    res.json({ message: `Updated ${req.params.id}`, data: req.body });
  }

  delete(req: Request, res: Response): void {
    res.json({ message: `Deleted ${req.params.id}` });
  }
}

export const exampleController = new ExampleController();
