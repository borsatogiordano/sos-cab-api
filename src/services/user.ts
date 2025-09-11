import { Prisma } from "@prisma/client";
import { UserRepository } from "../repositories/user";
import bcrypt from "bcryptjs";

export class UserService {
  constructor(private userRepo: UserRepository) {}

  async createUser(input: Prisma.UserCreateInput) {
    // regra de negócio: criptografar senha
    if ("password" in input) {
      input.password = await bcrypt.hash(input.password, 8);
    }
    const user = await this.userRepo.createUser(input);

    return user;
  }

  async getAllUsers() {
    const users = await this.userRepo.getAllUsers();
    return users.map(({ password, ...rest }) => rest);
  }

  async getUserById(id: string) {
    const user = await this.userRepo.getUserById(id);
    if (!user) return null;
    const { password, ...safeUser } = user;
    return safeUser;
  }

  async updateUser(id: string, data: Prisma.UserUpdateInput) {
    const user = await this.userRepo.updateUser(id, data);
    const { password, ...safeUser } = user;
    return safeUser;
  }

  async deleteUser(id: string) {
    return this.userRepo.deleteUser(id);
  }
}
