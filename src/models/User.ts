export type User = {
    username: string,
    firstName: string,
    lastName: string,
    birthDate: string,
    email: string,
    password: string
};

export type FormattedUser = Omit<User, "birthDate"> & {
    birthDate: Date;
}

export type UserModel = User & {
    id: number,
    birthDate: Date,
    createdAt: Date,
    updatedAt: Date
};