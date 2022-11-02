import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from 'src/Adapters/Http/Controllers/UsersController';
import UserRepositoryImpl from 'src/Adapters/Repositories/UserRepositoryImpl';
import StringHashingServiceImpl from 'src/Adapters/Services/StringHashingServiceImpl';
import { User } from 'typeORM/entities/User';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'clean-laravel-teste',
      entities: [User],
      synchronize: false,
    }),
  ],
  controllers: [UsersController],
  providers: [
    {
      provide: 'UserCommandsRepository',
      useClass: UserRepositoryImpl,
    },
    {
      provide: 'UserQueriesRepository',
      useClass: UserRepositoryImpl,
    },
    {
      provide: 'StringHashingService',
      useClass: StringHashingServiceImpl,
    },
  ],
})
export class AppModule {}
