import { AuthenticationData } from "../../services/Authenticator";


export class AuthenticatorMock {
  public generateToken(
    input: AuthenticationData,
    expiresIn: string = process.env.TOKEN_EXPIRES_IN!
  ): string {
    return 'token_mock';
  }

  public getData(token: string): AuthenticationData {
    return { id: 'id_mock' };
  }
}