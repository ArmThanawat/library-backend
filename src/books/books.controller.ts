import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':book_id')
  findOne(@Param('book_id') book_id: string) {
    return this.booksService.findOne(+book_id);
  }

  @Patch(':book_id')
  update(
    @Param('book_id') book_id: string,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return this.booksService.update(+book_id, updateBookDto);
  }

  @Delete(':book_id')
  remove(@Param('book_id') book_id: string) {
    return this.booksService.remove(+book_id);
  }
}
