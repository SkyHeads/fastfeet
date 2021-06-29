import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { getRepository, Repository } from 'typeorm';

import { Admin } from '../entities/Admin';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<Admin>;
  constructor() {
    this.ormRepository = getRepository(Admin);
  }

  public async findByEmail(email: string): Promise<Admin | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } });

    return user;
  }
}

export { UsersRepository };
