import { Service } from "typedi";
import { Request, Response } from "express";
import { UserService } from "../services/UserService";

@Service()
export class UserController {
  constructor(private userService: UserService) { }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userService.getAll();
      res.json(users);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ message: "Error fetching users", error: error.message });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    try {
      const user = await this.userService.getById(id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ message: "Error fetching user", error: error.message });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.userService.create(req.body);
      res.status(201).json(user);
    } catch (error: any) {
      console.error(error);
      res.status(400).json({ message: "Error creating user", error: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    try {
      const updatedUser = await this.userService.update(id, req.body);
      if (updatedUser) {
        res.json(updatedUser);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error: any) {
      console.error(error);
      res.status(400).json({ message: "Error updating user", error: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    try {
      const deleted = await this.userService.delete(id);
      if (deleted) {
        res.status(204).send(); // No content
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ message: "Error deleting user", error: error.message });
    }
  }
}
