import { User } from "../model/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {

  public async createUser(user: User): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id: user.getId(),
          name: user.getName(),
          email: user.getEmail(),
          password: user.getPassword(),
        })
        .into(this.tables.users)
    } catch (error) {
      throw new Error(error.sqlMessage || error.message)
    }
  }

  public async getUserByEmail(email: string): Promise<User> {
    try {
      const result = await this.getConnection()
        .select("*")
        .from(this.tables.users)
        .where("email", email)

      return User.toUserModel(result[0])
    } catch (error) {
      throw new Error(error.sqlMessage || error.message)
    }
  }

  public async getUserByid(id: string): Promise<User> {
    try {
      const result = await this.getConnection()
        .select("id", "name", "email")
        .from(this.tables.users)
        .where("id", id);

      return User.toUserModel(result[0])
    } catch (error) {
      throw new Error(error.sqlMessage || error.message)
    }
  }

}