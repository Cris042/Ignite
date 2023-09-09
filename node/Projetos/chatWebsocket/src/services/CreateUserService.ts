import { injectable } from "tsyringe";
import { User } from "../schemas/User"

interface CrateUserDTO {
  email: string;
  socket_id: string;
  avatar: string;
  name: string;
}

@injectable()
class CreateUserService {

  async execute({ email, socket_id, avatar, name }: CrateUserDTO) {
    const userAlreadyExists = await User.findOne({
      email
    }).exec();

    if(userAlreadyExists) {
      const user = await User.findOneAndUpdate({
        _id: userAlreadyExists._id
      }, {
        $set: { socket_id, avatar, name }
      },
      {
        new: true
      });

      return user;
    } else {
      const user = await User.create({
        email,
        socket_id,
        avatar,
        name
      });

      return user;
    }
  }

}

export { CreateUserService }