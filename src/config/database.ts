import { Sequelize } from "sequelize";
import getErrorMessage from "../shared/util/getErrorMessage";

type DBPromise = Promise<void | never>;

export default class Database {
    public sequelize: Sequelize;

    constructor({ url }: { url: string }) {
        this.sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: url,
            logging: false
        });
    }

    public async authenticate(): DBPromise {
        try {
            await this.sequelize.authenticate();
            console.log("Authentication success.");
        }
        catch(error: any) {
            console.error(getErrorMessage(error));
        }
    }
    
    public async sync(): DBPromise {
        try {
            await this.sequelize.sync({ force: true });
            console.log("DB synchronized.");
        }
        catch(error: any) {
            console.error(getErrorMessage(error));
        }
    }
}
