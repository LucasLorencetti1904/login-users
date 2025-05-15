import { Sequelize } from "sequelize";

type DBPromise = Promise<void | never>;

export default class Database {
    private sequelize: Sequelize;

    constructor({ url }: { url: string }) {
        this sequelize = new Sequelize({
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
        catch(error) {
            throw new Error(error.message);
        }
    }
    
    public async sync(): DBPromise {
        try {
            await this.sequelize.sync({ force: true });
            console.log("DB synchronized.");
        }
        catch(error) {
            throw new Error(error.message);
        }
    }
}
