/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Dialect } from 'sequelize';
import { Book } from './books/entities/book.entity';
import { AuthModule } from './auth/auth.module';
import { MembersModule } from './members/members.module';
import { LibrariansModule } from './librarians/librarians.module';
import { Member } from './members/entities/member.entity';
import { Librarian } from './librarians/entities/librarian.entity';


@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: process.env.DB_DIALECT as Dialect,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      models: [
        Book,
        Member,
        Librarian,
      ],
      autoLoadModels: true,
      sync: { alter: true },
      // sync: { force: true }, 
    }),
    BooksModule,
    AuthModule,
    MembersModule,
    LibrariansModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
