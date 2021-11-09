import { hash } from 'bcrypt';

import AppError from '@shared/errors/AppError';

import { Admin } from '../infra/typeorm/entities/Admin';
import { IUsersRepository } from '../repositories/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateAdminService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({ name, email, password }: IRequest): Promise<Admin> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const passwordHashed = await hash(password, 8);

    const admin = await this.usersRepository.create({
      name,
      email,
      password: passwordHashed,
    });

    return admin;
  }
}

export { CreateAdminService };
