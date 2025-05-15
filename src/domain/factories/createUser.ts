import { UserSchema, type UserType } from "../schemas/UserSchema";
import User from "../entities//User";

export default function CreateUser(userProperties: UserType): User | never {
    const parsed = UserSchema.safeParse(userProperties);
    if (!parsed.success) {
        throw parsed.error;
    }
    return new User(
        userProperties.username,
        userProperties.email,
        userProperties.password
    )
}
