export default class User {
    public constructor(
        private username: UserName,
        private firstName: Name,
        private lastName: Name,
        private email: Email,
        private password: Password
    ) {}
}