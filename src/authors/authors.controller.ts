import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateAuthorBooksDto } from './dto/update-author-books.dto';

@Controller('authors')
@ApiTags('Authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @ApiOperation({ summary: 'Create a new author' })
  @ApiCreatedResponse({
    description: 'The author has been successfully created.',
  })
  @ApiBadRequestResponse({ description: 'name and birthDate are required' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorsService.create(createAuthorDto);
  }

  @ApiOperation({ summary: 'Get all authors' })
  @ApiOkResponse({
    description: 'The authors have been successfully fetched.',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get()
  findAll() {
    return this.authorsService.findAll();
  }

  @ApiOperation({ summary: 'Get one author' })
  @ApiOkResponse({
    description: 'The author has been successfully fetched.',
  })
  @ApiNotFoundResponse({ description: 'Author not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authorsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Get authors by books' })
  @ApiOkResponse({
    description: 'The authors have been successfully fetched.',
  })
  @ApiNotFoundResponse({ description: 'Author not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get(':authorId/books')
  findAuthorsByBooks(@Param('authorId') authorId: string) {
    return this.authorsService.findAuthorsByBooks(+authorId);
  }

  @ApiOperation({ summary: 'Update an author' })
  @ApiOkResponse({
    description: 'The author has been successfully updated.',
  })
  @ApiBadRequestResponse({ description: 'name and birthDate are required' })
  @ApiNotFoundResponse({ description: 'Author not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorsService.update(+id, updateAuthorDto);
  }

  @ApiOperation({ summary: 'Update an author' })
  @ApiOkResponse({
    description: 'The author has been successfully updated.',
  })
  @ApiBadRequestResponse({ description: 'name and birthDate are required' })
  @ApiNotFoundResponse({ description: 'Author not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Put(':id/books')
  updateAuthorBooks(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorBooksDto) {
    return this.authorsService.updateAuthorBooks(+id, updateAuthorDto);
  }

  @ApiOperation({ summary: 'Delete an author' })
  @ApiOkResponse({
    description: 'The author has been successfully deleted.',
  })
  @ApiNotFoundResponse({ description: 'Author not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authorsService.remove(+id);
  }
}
