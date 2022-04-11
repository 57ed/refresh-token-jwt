import { hash } from 'bcryptjs';
import { client } from '../../prisma/client';

interface IUserRequest {
  name: string;
  password: string;
  username: string;
}

class CreateUserUseCase {
  async execute({ name, username, password }: IUserRequest) {
    // verificar se o usuário existe
    const userAlreadyExists = await client.user.findFirst({
      where: {
        username
      }
    });
    if (userAlreadyExists) {
      throw new Error('Usuário existente.');
    }
    // cadastro o usuário
    const passwordHash = await hash(password, 8);
    // console.log(passwordHash);
    const user = await client.user.create({
      data: {
        name,
        username,
        password: passwordHash
      }
    });
    return user;
  }
}
export { CreateUserUseCase };
