import { User } from "@prisma/client";
import UserRepository from "@interfaces/repositories/UserRepository";

export default class UserPrismaRepository implements UserRepository {
    getUserById(id: string): User | null {
        
    }
}