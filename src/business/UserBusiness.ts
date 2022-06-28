import { UserDatabase } from "../data/UserDatabase"
import { InvalidInputError } from "../error/InvalidInputError"
import { UnauthorizedError } from "../error/UnauthorizedError"
import { LoginInputDTO, User, UserInputDTO } from "../model/User"
import { Authenticator } from "../services/Authenticator"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"


export class UserBusiness {
  constructor(
    private userDatabase: UserDatabase,
    private idGenerator: IdGenerator,
    private hashManager: HashManager,
    private authenticator: Authenticator
  ) { }

  async createUser(user: UserInputDTO) { 
    if (!user.email || !user.name || !user.password ) throw new InvalidInputError("Invalid input to signUp")
    
    if (user.email.indexOf("@") === -1) throw new InvalidInputError("Invalid email format")
    
    if (user.password && user.password.length < 6) throw new InvalidInputError("Password should have more than 6 digits")
    
    const userDB = await this.userDatabase.getUserByEmail(user.email)

    if (!userDB) throw new InvalidInputError("Invalid email")
    
    const userId = this.idGenerator.generate()

    const hashPassword = await this.hashManager.hash(user.password)

    await this.userDatabase.createUser(
			User.toUserModel({
				...user,
				id: userId,
				password: hashPassword
			})
    )

    const accessToken = this.authenticator.generateToken({ id: userId })

    return accessToken
  }

  async authUserByEmail(user: LoginInputDTO) { 
		if (!user.email || !user.password ) throw new InvalidInputError("Invalid input to login")
		
		if (user.email.indexOf("@") === -1) throw new InvalidInputError("Invalid email format")
		
		const userDB = await this.userDatabase.getUserByEmail(user.email)
		const hashCompare = await this.hashManager.compare(user.password, userDB.getPassword())

		if (!hashCompare) throw new InvalidInputError("Invalid password")

		const accessToken = this.authenticator.generateToken({ id: userDB.getId() })

		return accessToken
  }

  async getProfileUserById(id: string,token:string) { 
		const tokenData = this.authenticator.getData(token)

		if (!tokenData.id) throw new UnauthorizedError("Only authorized can access this feature")
		
		if (!id ) throw new InvalidInputError("Invalid input to login")
		
		return await this.userDatabase.getUserByid(id)
  }
  
}