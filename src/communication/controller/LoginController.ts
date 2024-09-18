import { ILoginUseCase } from "../../core/usesCase/ILoginUseCase"

export class LoginController {

    constructor(private loginUseCase: ILoginUseCase){}

    async handler(email: string, password: string): Promise<string> {

        return await this.loginUseCase.execute(email, password)
    }
}