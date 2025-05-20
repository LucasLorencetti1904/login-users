import prisma from "../config/prisma";
import type { UserModel } from "../domain/schemas/UserSchema";

export default class UserRepository {
    public async findAll(): Promise<UserModel[]> {
        return await prisma.user.findMany()
    }
    public async findById(id: number): Promise<UserModel | null> {
        return await prisma.user.findUnique({ where: { id } })
    }
}