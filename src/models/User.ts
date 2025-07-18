export type User = {
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string
};

export type UserModel = User & {
    id: number,
    createdAt: Date,
    updatedAt: Date
};