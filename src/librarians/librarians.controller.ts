import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LibrariansService } from './librarians.service';
import { CreateLibrarianDto } from './dto/create-librarian.dto';
import { UpdateLibrarianDto } from './dto/update-librarian.dto';

@Controller('librarians')
export class LibrariansController {
  constructor(private readonly librariansService: LibrariansService) {}

  @Post()
  create(@Body() createLibrarianDto: CreateLibrarianDto) {
    return this.librariansService.create(createLibrarianDto);
  }

  @Get()
  findAll() {
    return this.librariansService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.librariansService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLibrarianDto: UpdateLibrarianDto) {
    return this.librariansService.update(+id, updateLibrarianDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.librariansService.remove(+id);
  }
}
