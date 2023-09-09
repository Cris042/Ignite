import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ email, name }: IRequest): User {
    const emailAlreadyExist = this.usersRepository.findByEmail(email);

    if (emailAlreadyExist) {
      throw new Error("Email already registred");
    }

    const user = this.usersRepository.create({ email, name });
    return user;
  }
}

export { CreateUserUseCase };