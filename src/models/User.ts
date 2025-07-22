export type User = {
    username: string,
    firstName: string,
    lastName: string,
    birthDate: Date,
    email: string,
    password: string
};

export type UserModel = User & {
    id: number,
    createdAt: Date,
    updatedAt: Date
};