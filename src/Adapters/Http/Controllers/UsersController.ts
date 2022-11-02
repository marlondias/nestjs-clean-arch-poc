import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { default as CreateUserInputBoundary } from 'src/Application/UseCases/User/CreateUser/InputBoundary';
import { default as DeleteUserInputBoundary } from 'src/Application/UseCases/User/DeleteUser/InputBoundary';
import { default as GetAllUsersInputBoundary } from 'src/Application/UseCases/User/GetAllUsers/InputBoundary';
import { default as GetUserInputBoundary } from 'src/Application/UseCases/User/GetUser/InputBoundary';
import { default as UpdateUserInputBoundary } from 'src/Application/UseCases/User/UpdateUser/InputBoundary';
import CreateUserUseCase from 'src/Application/UseCases/User/CreateUser/CreateUserUseCase';
import DeleteUserUseCase from 'src/Application/UseCases/User/DeleteUser/DeleteUserUseCase';
import GetAllUsersUseCase from 'src/Application/UseCases/User/GetAllUsers/GetAllUsersUseCase';
import GetUserUseCase from 'src/Application/UseCases/User/GetUser/GetUserUseCase';
import UpdateUserUseCase from 'src/Application/UseCases/User/UpdateUser/UpdateUserUseCase';
import UserCommandsRepository from 'src/Domain/Contracts/Repository/User/UserCommandsRepository';
import UserQueriesRepository from 'src/Domain/Contracts/Repository/User/UserQueriesRepository';
import StringHashingService from 'src/Domain/Contracts/Services/StringHashingService';

class CreateUserDTO {
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
}

class UpdateUserDTO {
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;

  propsToMap(): Map<string, string> {
    const map = new Map<string, string>();
    Object.keys(this).forEach((propName) => {
      map.set(propName, this[propName]);
    });
    return map;
  }
}

@Controller('api/users')
export class UsersController {
  constructor(
    @Inject('UserCommandsRepository')
    private readonly userCommandsRepository: UserCommandsRepository,
    @Inject('UserQueriesRepository')
    private readonly userQueriesRepository: UserQueriesRepository,
    @Inject('StringHashingService')
    private readonly stringHashingService: StringHashingService,
  ) {}

  @Get()
  async list(): Promise<any> {
    const useCase = new GetAllUsersUseCase(this.userQueriesRepository);
    const response = new Map<string, any>();
    const input = new GetAllUsersInputBoundary();
    const output = await useCase.handle(input);
    response.set('message', output.getMessage());
    response.set('data', output.toMap());
    return Object.fromEntries(response);
  }

  @Get(':id')
  async show(@Param('id') id: string): Promise<any> {
    const useCase = new GetUserUseCase(this.userQueriesRepository);
    const response = new Map<string, any>();
    const input = new GetUserInputBoundary(Number.parseInt(id));
    const output = await useCase.handle(input);
    response.set('message', output.getMessage());
    response.set('data', output.toMap());
    return response;
  }

  @Post()
  async create(@Body() requestBody: CreateUserDTO): Promise<any> {
    const useCase = new CreateUserUseCase(
      this.userCommandsRepository,
      this.userQueriesRepository,
      this.stringHashingService,
    );
    const response = new Map<string, any>();
    try {
      const input = new CreateUserInputBoundary(
        requestBody.firstName,
        requestBody.lastName,
        requestBody.emailAddress,
        requestBody.password,
      );
      const output = await useCase.handle(input);
      response.set('message', output.getMessage());
    } catch (error) {
      response.set('error', error.message);
    }
    return response;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() requestBody: UpdateUserDTO,
  ): Promise<any> {
    const useCase = new UpdateUserUseCase(
      this.userCommandsRepository,
      this.userQueriesRepository,
      this.stringHashingService,
    );
    const response = new Map<string, any>();
    try {
      const input = new UpdateUserInputBoundary(
        Number.parseInt(id),
        requestBody.propsToMap(),
      );
      const output = await useCase.handle(input);
      response.set('message', output.getMessage());
    } catch (error) {
      response.set('error', error.message);
    }
    return response;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<any> {
    const useCase = new DeleteUserUseCase(this.userCommandsRepository);
    const response = new Map<string, any>();
    const input = new DeleteUserInputBoundary(Number.parseInt(id));
    const output = await useCase.handle(input);
    response.set('message', output.getMessage());
    return response;
  }
}
