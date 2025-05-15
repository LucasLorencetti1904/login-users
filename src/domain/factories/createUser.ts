import { UserSchema, UserType } from "./UserSchema";
import User from "./User";

export default function CreateUser(userProporties: UserType): User | never {
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
