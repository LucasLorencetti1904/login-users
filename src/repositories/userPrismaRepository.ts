import type UserRepository from "@interfaces/repositories/UserRepository";
import type UserModelDTO from "@DTOs/UserDTO/UserOutputDTO";

export default class UserPrismaRepository implements UserRepository {
    getUserById(id: number): Promise<UserModelDTO | null> {
        
    }

    getAllUsers(): Promise<UserModelDTO[]> {
        
    }
}