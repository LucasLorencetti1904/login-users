export default class User {
    private username: string;
    private email: string;
    private password: string;
    private admin: boolean = false;
    constructor(username: string, email: string, password: string) { }
    public status(): void {
        console.log(`
            username: ${this.username}
            email: ${this.email}
        `);
    }
    public getPermission(): never | void {
        if (this.admin) {
            throw new Error("Is Already Admin");
        }
        this.admin = true;
    }
}
