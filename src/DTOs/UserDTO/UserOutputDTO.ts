export type UserModelDTO = {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    birthDate: Date;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
};

export type UserResponseDTO = {
    id: number,
    username: string,
    firstName: string,
    lastName: string,
    birthDate: string,
    email: string,
    createdAt: string,
    updatedAt: string
};