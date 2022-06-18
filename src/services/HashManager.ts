import * as bcrypt from "bcryptjs";

export class HashManager {

	public async hash(text: string): Promise<string> {
		const rounds: number = Number(process.env.BCRYPT_COST);

		if(isNaN(Number(process.env.BCRYPT_COST))){
				throw new Error("Cost is not a number");
		}
		
		const salt = await bcrypt.genSalt(rounds);
		const result = await bcrypt.hash(text, salt);

		return result;
	}

	public async compare(text: string, hash: string): Promise<boolean>{
		return await bcrypt.compare(text, hash);
	}
}