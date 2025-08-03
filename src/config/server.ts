import express, { Router, type Express } from "express";
import env from "./env.ts";
import UserRouter from "../routes/userRoutes.ts";
import UserController from "../controllers/UserControllerImpl.ts";
import UserRepository from "../repositories/userPrismaRepository.ts";
import UserService from "../services/UserServiceImpl.ts";

export default class Server {
    private port: number = Number(env.PORT);
    private app: Express = express();

    private userReposity: UserRepository;
    private userService: UserService;
    private userController: UserController;
    private userRouter: UserRouter;

    constructor() {
        this.userReposity = new UserRepository();
        this.userService = new UserService(this.userReposity);
        this.userController = new UserController(this.userService);
        this.userRouter = new UserRouter(this.userController);
        
        this.app.use(express.json());
        
        this.app.use("/users", this.userRouter.router)
    }
    
    public init(): void {
        this.app.listen(this.port, (): void => {
            console.log(`Server running in port ${this.port}`);
        });
    }
}