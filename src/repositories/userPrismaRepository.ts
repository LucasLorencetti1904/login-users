import UserRepository from "@interfaces/repositories/UserRepository";
import UserModelDTO from "@DTOs/UserDTO/UserModelDTO";

export default class UserPrismaRepository implements UserRepository {
    getUserById(id: number): Promise<UserModelDTO | null> {
        
    }

    getAllUsers(): Promise<UserModelDTO[]> {
        
    }
}