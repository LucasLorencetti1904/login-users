import type { UserModel } from "../shared/schemas/UserSchema";
import type UserRepository from "../repositories/userPrismaRepository";

export default class UserService {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }
}