import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateLocalUserCommand } from '../command/create-local-user.command';
import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../../infrastructure/repository/user.repository';
import * as bcrypt from 'bcryptjs';
import { UserFactory } from '../../domain/interface/user.class';
import { DataSource, EntityManager } from 'typeorm';

@Injectable()
@CommandHandler(CreateLocalUserCommand)
export class CreateLocalUserHandler
  implements ICommandHandler<CreateLocalUserCommand, void>
{
  constructor(
    private readonly userRepository: UserRepository,
    private readonly dataSource: DataSource,
    @Inject(UserFactory) private readonly userFactory: UserFactory,
  ) {}

  async execute(command: CreateLocalUserCommand): Promise<void> {
    await this.transactionCommit(command);
  }

  async transactionCommit(command: CreateLocalUserCommand): Promise<void> {
    await this.dataSource.manager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        const salt = bcrypt.genSaltSync(10);
        const userHashPassword = bcrypt.hashSync(
          command.createLocalUserCommandDTO.userPassword,
          salt,
        );

        const new_user = this.userFactory.create(
          command.createLocalUserCommandDTO.userEmailId,
          userHashPassword,
        );

        await this.userRepository.createUser(
          new_user,
          transactionalEntityManager,
        );
      },
    );
  }
}
