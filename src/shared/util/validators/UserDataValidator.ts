import type { User } from "../../../models/User";
import type DataValidator from "./DataValidator";

export default abstract class UserDataValidator implements DataValidator {
    constructor(protected userData: User) {}
    
    public abstract validate(): void;
}