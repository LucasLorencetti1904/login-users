import UserRepository from "@interfaces/repositories/UserRepository";
import { User } from "@prisma/client";

export default class UserPrismaRepository implements UserRepository {
    getUserById(id: string): Promise<User | null> {
        
    }
}