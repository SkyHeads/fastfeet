import ICreateAdminDTO from '../dtos/ICreateAdminDTO';
import { Admin } from '../infra/typeorm/entities/Admin';

interface IUsersRepository {
  findByEmail(email: string): Promise<Admin | undefined>;
  create(data: ICreateAdminDTO): Promise<Admin>;
}

export { IUsersRepository };
