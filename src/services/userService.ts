import type { UserModel } from "../domain/schemas/UserSchema";
import type UserRepository from "../repositories/userRepository";

export default class UserService {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public async getUser(id?: number): Promise<UserModel[] | UserModel | null> {
        if(!id) {
            return await this.userRepository.findAll();
        }
        return await this.userRepository.findById(id);
    }
}