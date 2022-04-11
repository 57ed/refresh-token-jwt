import { compare } from 'bcryptjs';
import { client } from '../../prisma/client';
import { GenerateRefreshToken } from '../../provider/GenerateRefreshToken';
import { GenerateTokenProvider } from '../../provider/GenerateTokenProvider';

interface IRequest {
  username: string;
  password: string;
}

class AuthenticaUserUseCase {
  async execute({ username, password }: IRequest) {
    // Verificar se usuário existe
    const userAlreadyExists = await client.user.findFirst({
      where: {
        username
      }
    });
    if (!userAlreadyExists) {
      throw new Error('Usuário ou Senha incorreto!');
    }
    // Verificar se a senha está correta
    const passwordMatch = await compare(password, userAlreadyExists.password);
    if (!passwordMatch) {
      throw new Error('Usuário ou Senha incorreto!');
    }
    // Gerar token do usuário
    const generationTokenProvider = new GenerateTokenProvider();
    const token = await generationTokenProvider.execute(userAlreadyExists.id);

    await client.refreshToken.deleteMany({
      where: {
        userId: userAlreadyExists.id
      }
    });

    const generateRefreshToken = new GenerateRefreshToken();
    const refreshToken = await generateRefreshToken.execute(
      userAlreadyExists.id
    );

    return { token, refreshToken };
  }
}

export { AuthenticaUserUseCase };
