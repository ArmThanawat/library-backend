import { Module } from '@nestjs/common';
import { LibrariansService } from './librarians.service';
import { LibrariansController } from './librarians.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Librarian } from './entities/librarian.entity';

@Module({
  imports: [SequelizeModule.forFeature([Librarian])],
  controllers: [LibrariansController],
  providers: [LibrariansService],
})
export class LibrariansModule {}
