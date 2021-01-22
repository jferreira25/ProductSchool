import { RoleEnum } from '../enuns/role.enum'

export class LoginData {
  username: string;
  name: string;
  role: number;

  constructor(
    username: string,
    name: string,
    role: string
  ) {
    this.username = username;
    this.name = name;
    this.role = +role;
  }
}