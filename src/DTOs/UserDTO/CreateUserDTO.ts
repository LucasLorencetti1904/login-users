export type CreateUserRequestDTO = {
    username: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    email: string;
    password: string;
};

export type CreateUserParsedDTO = {
    username: string;
    firstName: string;
    lastName: string;
    birthDate: Date;
    email: string;
    password: string;
};