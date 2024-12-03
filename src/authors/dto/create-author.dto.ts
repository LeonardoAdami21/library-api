import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthorDto {
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


}
