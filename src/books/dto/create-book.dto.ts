import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'The title of the book',
  })
  title: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'The description of the book',
  })
  description: string;

  @ApiProperty({
    type: String,
    required: true,
    example: '2000-01-01',
    description: 'The publication date of the book',
  })
  publicationDate: string;

  @ApiProperty({
    type: Number,
    required: true,
    description: 'The ID of the author',
  })
  authorId?: number

}
