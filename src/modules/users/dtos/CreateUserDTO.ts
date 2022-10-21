export interface createUserDTO {
  name: string;
  email: string;
  hash: string;
  cep: string;
  cpf: string;
}

export interface verifyEmailUserDTO{
  email: string;
}

export interface selectUserByIdDTO {
  id: number;
}

export interface verifyUserDTO {
  email: string;
  password: string;
}

export interface verifyEmailDTO{
  email: string;
}
//TESTANDO
export interface alterPasswordDTO{
  email: string;
  hash: string;
}
