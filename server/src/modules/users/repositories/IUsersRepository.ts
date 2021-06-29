import { Admin } from '../infra/typeorm/entities/Admin';

interface IUsersRepository {
  findByEmail(email: string): Promise<Admin | undefined>;
}

export { IUsersRepository };
