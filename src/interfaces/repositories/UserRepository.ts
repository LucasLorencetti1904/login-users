import { User } from "@prisma/client";

export default interface UserRepository {
    getUserById(id: string): User | null;
}