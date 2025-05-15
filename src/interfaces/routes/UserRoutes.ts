import { Router, Response, Request } from "express";

export default class UserRouter {
    public router: Router;

    constructor(private userController: UserController) {
        this.router = Router();
        this.userRoutes();
    }

    private userRoutes(): void {
        this.router.get("/:id?", this.userController.listUser);
        this.router.post("/register", this.userController.saveUser);
        this.router.put("/:id", this.userController.editUser);
        this.router.delete("/:id", this.userController.removeUser);
    }
}
