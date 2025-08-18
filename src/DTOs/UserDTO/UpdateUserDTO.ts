export type UpdateUserRequestDTO = {
    username?: string,
    firstName?: string,
    lastName?: string,
    birthDate?: string,
    email?: string,
    password?: string
};

export type UpdateUserParsedDTO = {
    username?: string,
    firstName?: string,
    lastName?: string,
    birthDate?: Date,
    email?: string,
    password?: string
};