import { User } from "../../../model/User";
import { userMock } from "./UserMock";

export class UserDatabaseMock {
  public async createUser(user: User): Promise<void> {}
  public async getUserByEmail(email: string): Promise<User | undefined> {
    if (email === 'teste@gmail.com') {
      return userMock
    } else {
      undefined
    }
  }
}