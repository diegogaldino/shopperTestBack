
import { OrderBusiness } from "../business/OrderBusiness"
import { OrderDatabaseMock } from "../tests/mocks/order/OrderDataBaseMock"
import { BaseError } from "../error/BaseError"
import { AuthenticatorMock } from "./mocks/AuthenticatorMock"
import { IdGeneratorMock } from "./mocks/IdGeneratorMock"
import { OrderInputDTO } from "../model/Order"



const orderBusinessMock = new OrderBusiness(
  new OrderDatabaseMock() as any,
  new IdGeneratorMock(),
  new AuthenticatorMock()
);

describe('Order tests', () => {
  test('Should return signUp error, missing input', async () => {
    expect.assertions
    try {
      const input: OrderInputDTO = {
        userId:'',
        products:[
          {
            id:'id_product',qty:1
          }
        ],
        delivery: new Date()
      }

      await orderBusinessMock.registerOrder(input,'token_mock')
    } catch (error) {
      if (error instanceof BaseError) {
        expect(error.message).toEqual('Invalid input to registerOrder')
        expect(error.code).toBe(417)
      }
    }
  })

  test('Should return missing token error', async () => {
    expect.assertions
    try {
      const input: OrderInputDTO = {
        userId:'id_user_mock',
        products:[
          {
            id:'id_product',qty:1
          }
        ],
        delivery: new Date()
      }

      await orderBusinessMock.registerOrder(input,'')
    } catch (error) {
      if (error instanceof BaseError) {
        expect(error.message).toEqual('Only authorized can access this feature')
        expect(error.code).toBe(403)
      }
    }
  })


})