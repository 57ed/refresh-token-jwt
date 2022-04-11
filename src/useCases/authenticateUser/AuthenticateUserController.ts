import { Request, Response } from 'express';
import { AuthenticaUserUseCase } from './AuthenticateUserUseCase';

class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body;

    const authenticateUserUseCase = new AuthenticaUserUseCase();

    const token = await authenticateUserUseCase.execute({
      username,
      password
    });
    return response.json(token);
  }
}

export { AuthenticateUserController };
