import express, { Request, Response } from "express";
import env from "./env.ts";
import Database from "./Database";

export default class Server {
    private port: number;
    private app: any;

    private userController: UserController;
    private userRouter: UserRouter;

    constructor() {
        this.port = env.PORT;
        this.app = express();
        this.app.use(express.json());

        this.userController = new UserController();
        this.userRouter = new UserRouter(userController);
    }

    public async init(): void {
        const database = new Database({ url: env.DATABASE_URL});
        try {
            await database.authenticate();
            await database.sync();

            this.app.listen(this.port, (): void => {
                console.log(`Server running in port ${this.port}`);
            });
        }
        catch(error: Error) {
            console.error(error.message);
        }
    }
}
