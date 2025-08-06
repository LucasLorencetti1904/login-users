type UserModelDTO = {
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

export default UserModelDTO;