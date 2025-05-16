import express from "express";
import env from "./env.ts";
import Database from "./database.ts";
import UserRouter from "../routes/userRoutes.ts";
import getErrorMessage from "../shared/util/getErrorMessage.ts";
import UserController from "../controllers/userController.ts";

export default class Server {
    private port: number;
    private app: any;

    private userController: UserController;
    private userRouter: UserRouter;

    constructor() {
        this.userController = new UserController();
        this.userRouter = new UserRouter(this.userController);
        
        this.port = Number(env.PORT);
        this.app = express();
        this.app.use(express.json());
        
        
        this.app.use("/users", this.userRouter.router)
    }
    
    public async init(): Promise<void> {
        const database = new Database({ url: String(env.DATABASE_URL) });
        try {
            await database.authenticate();
            await database.sync();

            this.app.listen(this.port, (): void => {
                console.log(`Server running in port ${this.port}`);
            });
        }
        catch(error: unknown) {
            console.error(getErrorMessage(error));
        }
    }
}
