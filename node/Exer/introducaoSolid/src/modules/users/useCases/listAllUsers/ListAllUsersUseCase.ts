import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const auth = this.usersRepository.findById(user_id);

    if (!auth?.admin) {
      throw new Error(`
        Should not be able to a non existing user get list of all users
      `);
    }

    const users = this.usersRepository.list();

    return users;
  }
}

export { ListAllUsersUseCase };