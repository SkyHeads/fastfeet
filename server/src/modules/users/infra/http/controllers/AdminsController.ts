import { CreateAdminService } from '@modules/users/services/CreateAdminService';
import { Request, Response } from 'express';
import Joi from 'joi';

import { UsersRepository } from '../../typeorm/repositories/UsersRepository';

class AdminsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    const authSchema = Joi.object({
      name: Joi.string().required(),
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
    const createAdmin = new CreateAdminService(usersRepository);

    const admin = await createAdmin.execute({ name, email, password });

    return res.json(admin);
  }
}

export { AdminsController };
