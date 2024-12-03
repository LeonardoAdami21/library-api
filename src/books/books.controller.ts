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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@Controller('books')
@ApiTags('Books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @ApiOperation({ summary: 'Create a new book' })
  @ApiCreatedResponse({
    description: 'The book has been successfully created.',
  })
  @ApiBadRequestResponse({
    description: 'title, description and publicationDate are required',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @ApiOperation({ summary: 'Get all books' })
  @ApiOkResponse({
    description: 'The books have been successfully returned.',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @ApiOperation({ summary: 'Get book by id' })
  @ApiOkResponse({
    description: 'The book has been successfully returned.',
  })
  @ApiNotFoundResponse({ description: 'Book not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.booksService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update book by id' })
  @ApiOkResponse({
    description: 'The book has been successfully updated.',
  })
  @ApiBadRequestResponse({
    description: 'title, description and publicationDate are required',
  })
  @ApiNotFoundResponse({ description: 'Book not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  @ApiOperation({ summary: 'Delete book by id' })
  @ApiOkResponse({
    description: 'The book has been successfully deleted.',
  })
  @ApiNotFoundResponse({ description: 'Book not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.booksService.remove(+id);
  }
}
