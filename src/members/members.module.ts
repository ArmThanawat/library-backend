import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Member } from './entities/member.entity';

@Module({
  imports: [SequelizeModule.forFeature([Member])],
  controllers: [MembersController],
  providers: [MembersService],
})
export class MembersModule {}
