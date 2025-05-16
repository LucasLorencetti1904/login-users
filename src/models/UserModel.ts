import { Model } from "sequelize";
import type { IUserModel } from "../interfaces/IUserModel";
import type { User } from "../domain/schemas/UserSchema";
import Database from "../config/database";

class UserModel extends Model<IUserModel, User> {}