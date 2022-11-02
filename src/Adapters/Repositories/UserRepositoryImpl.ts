import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import UserCommandsRepository from 'src/Domain/Contracts/Repository/User/UserCommandsRepository';
import UserQueriesRepository from 'src/Domain/Contracts/Repository/User/UserQueriesRepository';
import User from 'src/Domain/Entities/User';
import EmailAddress from 'src/Domain/ValueObjects/EmailAddress';
import { User as UserOrm } from 'typeORM/entities/User';

@Injectable()
export default class UserRepositoryImpl
  implements UserCommandsRepository, UserQueriesRepository
{
  private dataSource: DataSource;

  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
  }

  async insert(user: User): Promise<void> {
    const userAttributes = {
      name: user.getName().getFullName(),
      email: user.getEmail().getFullAddress(),
      password: user.getHashedPassword(),
    };
    if (user.getEmailVerifiedAt()) {
      userAttributes['email_verified_at'] = user.getEmailVerifiedAt();
    }

    await this.dataSource
      .createQueryBuilder()
      .insert()
      .into(UserOrm)
      .values([userAttributes])
      .execute();
  }

  async update(user: User): Promise<void> {
    //TODO
  }

  async deleteById(id: number): Promise<void> {
    await this.dataSource
      .createQueryBuilder()
      .delete()
      .from(UserOrm)
      .where('id = :id', { id: id })
      .execute();
  }

  async findById(id: number): Promise<User> {
    const userRepository = this.dataSource.getRepository(UserOrm);
    const userOrm = await userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id: id })
      .getOneOrFail();

    return this.getUserFromUserOrm(userOrm);
  }

  async findByEmail(emailAddress: EmailAddress): Promise<User> {
    const userRepository = this.dataSource.getRepository(UserOrm);
    const userOrm = await userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email: emailAddress.getFullAddress() })
      .getOneOrFail();

    return this.getUserFromUserOrm(userOrm);
  }

  async getAll(): Promise<User[]> {
    const userRepository = this.dataSource.getRepository(UserOrm);
    const usersOrm = await userRepository.createQueryBuilder('user').getMany();

    return usersOrm.map((userOrm) => {
      return this.getUserFromUserOrm(userOrm);
    });
  }

  private getUserFromUserOrm(userOrm: UserOrm): User {
    const user = new User();
    user.setId(userOrm.id);
    user.setPersonName(userOrm.name, '');
    user.setEmailAddress(userOrm.email);
    user.setHashedPassword(userOrm.password);
    if (userOrm.email_verified_at instanceof Date) {
      user.setEmailVerifiedAt(userOrm.email_verified_at);
    }
    if (userOrm.created_at instanceof Date) {
      user.setCreatedAt(userOrm.created_at);
    }
    if (userOrm.updated_at instanceof Date) {
      user.setUpdatedAt(userOrm.updated_at);
    }
    return user;
  }
}
