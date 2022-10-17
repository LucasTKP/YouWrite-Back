import { Request, Response } from "express";
import { UserUseCase} from "./userUseCase";
var bcrypt = require('bcryptjs');

export class UserController {
  async createUser(req: Request, res: Response) {
    const userUseCase = new UserUseCase();
    const { name, email, password  } = req.body;
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    

    const result = await userUseCase.createUser({name, email, hash});

    return res.status(200).json({result, statusCreateUser: 200,});
  }

  async selectUserByID (req: Request, res: Response) {
    const userUseCase = new UserUseCase();
    const id = parseInt(req.params.id)

    const result = await userUseCase.selectUserByID({id});

    return res.status(200).json(result);
  }

  async verifyEmailSignUp(req: Request, res: Response) {
    const userUseCase = new UserUseCase();
    const email = req.body.email

    const result = await userUseCase.verifyEmailSignUp({email});
    console.log(result)
    return res.status(200).json({code:result, statusVerifyEmail: 200});
  }

  async verifyUserLogin(req: Request, res: Response) {
    const userUseCase = new UserUseCase();
    const email = req.body.email
    const password = req.body.password
    const result = await userUseCase.verifyUserLogin({email, password});
    result.password = ""
    return res.status(200).json({result, statusVerifyLogin: 200, message: "You make login with sucess"});
  }

  async recoveryPassword(req: Request, res: Response) {
    const userUseCase = new UserUseCase();
    const email = req.body.email

    const result = await userUseCase.recoveryPassword({email});

    return res.status(200).json({result, statusRecoveryPassword: 200});
  }

  async alterPassword(req: Request, res: Response) {
    const userUseCase = new UserUseCase();
    const {email, password  } = req.body;
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    
    const result = await userUseCase.alterPassword({email, hash});

    return res.status(200).json({result, statusAlterPassword: 200, message: "password changed with sucess!"});
  }
}
