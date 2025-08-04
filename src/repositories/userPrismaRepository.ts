import { User } from "@prisma/client";
import UserRepository from "./UserRepository";

export default class UserPrismaRepository implements UserRepository {
    getUserById(id: string): User | null {
        
    }
}