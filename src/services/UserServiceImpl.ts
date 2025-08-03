import type UserRepository from "../repositories/userPrismaRepository";

export default class UserServiceImpl {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }
}