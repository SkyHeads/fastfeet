import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { getRepository, Repository } from 'typeorm';

import ICreateAdminDTO from '../../../dtos/ICreateAdminDTO';
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

  public async create(data: ICreateAdminDTO): Promise<Admin> {
    const createAdmin = this.ormRepository.create(data);

    await this.ormRepository.save(createAdmin);

    return createAdmin;
  }
}

export { UsersRepository };
