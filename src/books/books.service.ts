/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book)
    private bookModel: typeof Book,
  ) {}

  async create(createBookDto: CreateBookDto) {
    return await this.bookModel.create(createBookDto as Partial<Book>);
  }

  async findAll() {
    return await this.bookModel.findAll();
  }

  async findOne(book_id: number) {
    return await this.bookModel.findByPk(book_id);
  }

  async findByTitle(title: string) {
    return await this.bookModel.findOne({ where: { title } });
  }

  async update(book_id: number, updateBookDto: UpdateBookDto) {
    await this.bookModel.update(updateBookDto, {
      where: { book_id },
    });
    return this.bookModel.findByPk(book_id);
  }

  async remove(book_id: number) {
    return await this.bookModel.destroy({ where: { book_id } });
  }
}
