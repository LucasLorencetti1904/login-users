import PasswordHasher from "@interfaces/adapters/PasswordHasher";
import UserDataMapper from "@interfaces/mappers/UserDataMapper";
import UserRepository from "@interfaces/repositories/UserRepository";
import Validator from "@interfaces/validators/Validator";

export  class MockUpdateUserValidator implements Partial<Validator> {}

export  class MockCreateUserValidator implements Partial<Validator> {}

export  class MockHasher implements Partial<PasswordHasher>{}

export  class MockRepository implements Partial<UserRepository> {} 

export class MockUserDataFormatter implements Partial<UserDataMapper> {}