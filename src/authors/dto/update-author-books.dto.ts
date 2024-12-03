import { ApiProperty } from '@nestjs/swagger';

export class UpdateAuthorBooksDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'The name of the author',
  })
  name: string;

  @ApiProperty({
    type: String,
    required: true,
    example: '2000-01-01',
    description: 'The birth date of the author',
  })
  birthDate: string;

  @ApiProperty({
    type: Array,
    example: [{ title: 'Book 1', description: 'Description 1', publicationDate: '2000-01-01' }],
    description: 'The books of the author',
  })
  books: BookDto[];
}

export class BookDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'The title of the book',
  })
  title: string;

  @ApiProperty({
    type: String,
  })
  description: string;

  @ApiProperty({
    type: String,
    example: '2000-01-01',
    description: 'The publication date of the book',
  })
  publicationDate: string;
}
