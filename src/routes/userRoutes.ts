import { Router } from "express";
import type UserController from "../controllers/userController";

export default class UserRouter {
    private userController: UserController;
    public router: Router;

    constructor(userController: UserController) {
        this.userController = userController;
        this.router = Router();
        this.userRoutes();
    }

    private userRoutes(): void {
        this.router.get("/:id?", this.userController.listUser);
    }
}