import { User } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { alterPasswordDTO, createUserDTO, selectUserByIdDTO, verifyEmailUserDTO, verifyUserDTO } from "../../dtos/CreateUserDTO";
const SMTP_CONFIG = require ("../../../../smtp")
const nodemailer = require ('nodemailer')
var bcrypt = require('bcryptjs');

export class UserUseCase {
    //Search user by Email
  async verifyEmailSignUp({email}: verifyEmailUserDTO): Promise<number>{
        const userAlreadyExists = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        if (userAlreadyExists) {
          throw new AppError("This email has already been registered!");
        }
        var number = Math.floor(Math.random() * (999999 - 100000) + 100000)
        SendEmail(number, email)
        return number;
  }


    // Criar o usuário
  async createUser({ name, email, hash}: createUserDTO): Promise<User> {
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hash,
      },
    });
    return user;
  }


  //Search user by ID
  async selectUserByID({id}: selectUserByIdDTO): Promise<User | null>{
    const user = await prisma.user.findUnique({
      where: {
        id: id
      }
    });
    return user;
  }

  async verifyUserLogin({email, password}: verifyUserDTO){
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
     const result = await bcrypt.compare(password, user.password)
        if(result){
          console.log(result)
          return user
        }
    } else {
      throw new AppError("This email not was registred in we bank of data!");
    }
      throw new AppError("Credentials are incorrect");
  }

  async recoveryPassword({email}: verifyEmailUserDTO){
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (user) {
      var number = Math.floor(Math.random() * (999999 - 100000) + 100000)
      return  SendEmail(number, email)
    } else {
      throw new AppError("This email not was registred in we bank of data!");
    }
  }

  async alterPassword({email, hash}: alterPasswordDTO){
    const user = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        password: hash,
      },
    })
    return true
  }

}


  //Send code to the email of user
  function SendEmail(number: number, email: string){
    let transporter = nodemailer.createTransport({
      host: SMTP_CONFIG.host,
      port: SMTP_CONFIG.port,
      secure: true, // true for 465, false for other ports
      auth: {
        user: SMTP_CONFIG.user, 
        pass: process.env.PASSWORD,
      },
    });
    const mailSend = transporter.sendMail({
      text: String(number),
      subject: "Code",
      From: "Suporte iStudy <suporte.youwrite@gmail.com>",
      to: email
    })
    return number;
}
