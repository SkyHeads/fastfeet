import { AuthenticateUserService } from '@modules/users/services/AuthenticateUserService';
import { Request, Response } from 'express';
import Joi from 'joi';

import { UsersRepository } from '../../typeorm/repositories/UsersRepository';

class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const authSchema = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .lowercase()
        .required(),
      password: Joi.string()
        .min(6)
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
    });

    try {
      await authSchema.validateAsync(req.body);
    } catch (err) {
      console.error(err);
    }

    const usersRepository = new UsersRepository();
    const authenticateUser = new AuthenticateUserService(usersRepository);

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    delete user.created_at;
    delete user.updated_at;
    delete user.password;
    delete user.id;

    return res.json({ user, token });
  }
}

export { SessionsController };
