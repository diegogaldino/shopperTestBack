import { UserBusiness } from "../business/UserBusiness"
import { BaseError } from "../error/BaseError"
import { UserInputDTO } from "../model/User"
import { AuthenticatorMock } from "./mocks/AuthenticatorMock"
import { HashManagerMock } from "./mocks/HashManagerMock"
import { IdGeneratorMock } from "./mocks/IdGeneratorMock"
import { UserDatabaseMock } from "./mocks/user/UserDataBaseMock"


const userBusinessMock = new UserBusiness(
  new UserDatabaseMock() as any,
  new IdGeneratorMock(),
  new HashManagerMock(),
  new AuthenticatorMock()
);

describe('User tests', () => {
  test('Should return signUp error, missing input', async () => {
    expect.assertions
    try {
      const input: UserInputDTO = {
        name: '',
        email: 'teste1@gmail.com',
        password: '123456',
      };

      await userBusinessMock.createUser(input)
    } catch (error) {
      if (error instanceof BaseError) {
        expect(error.message).toEqual('Invalid input to signUp')
        expect(error.code).toBe(417)
      }
    }
  });
  test('Should return signUp error, invalid password', async () => {
    expect.assertions;
    try {
      const input: UserInputDTO = {
        name: 'Teste',
        email: 'teste2@gmail.com',
        password: '123'
      };

      await userBusinessMock.createUser(input);
    } catch (error) {
      if (error instanceof BaseError) {
        expect(error.message).toEqual('Password should have more than 6 digits')
        expect(error.code).toBe(417)
      }
    }
  })
  test('Should return signUp error, invalid email format', async () => {
    expect.assertions
    try {
      const input: UserInputDTO = {
        name: 'Teste',
        email: 'teste3gmail.com',
        password: '123456'
      };

      await userBusinessMock.createUser(input)
    } catch (error) {
      if (error instanceof BaseError) {
        expect(error.message).toEqual('Invalid email format')
        expect(error.code).toBe(417)
      }
    }
  })

  test('Should return success', async () => {
    expect.assertions
    try {
      const input: UserInputDTO = {
        name: 'Teste',
        email: 'teste4@gmail.com',
        password: '123456'
      };

      const result = await userBusinessMock.createUser(input)
      expect(result).toEqual('token_mock')
    } catch (error) {
      if (error instanceof BaseError) {
        console.log(error)
      }
    }
  })
})