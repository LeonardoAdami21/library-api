import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../books/entities/book.entity';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private readonly authorsRepository: Repository<Author>,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async create(dto: CreateAuthorDto) {
    try {
      const { name, birthDate } = dto;
      if (!name || !birthDate) {
        throw new BadRequestException('name and birthDate are required');
      }
      const author = await this.authorsRepository.create({ name, birthDate });
      await this.authorsRepository.save(author);
      return author;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll() {
    try {
      const authors = await this.authorsRepository.find();
      return authors;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id: number) {
    try {
      const author = await this.authorsRepository.findOneBy({ id: id });
      if (!author) {
        throw new NotFoundException('Author not found');
      }
      return author;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAuthorsByBooks(authorId: number) {
    try {
      const author = await this.authorsRepository.findOne({
        where: { id: authorId },
        relations: ['books'],
      });
      if (!author) {
        throw new NotFoundException('Author not found');
      }
      return author.books;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    try {
      const { name, birthDate } = updateAuthorDto;
      if (!name && !birthDate) {
        throw new BadRequestException('name and birthDate are required');
      }
      const author = await this.authorsRepository.findOneBy({ id: id });
      if (!author) {
        throw new NotFoundException('Author not found');
      }
      await this.authorsRepository.update(id, { name, birthDate });
      return {
        message: 'Author updated successfully',
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async updateAuthorBooks(id: number, dto: { name: string; birthDate: string; books: Partial<Book>[] }) {
    try {
      const author = await this.authorsRepository.findOne({ where: { id: id }, relations: ['books'] });
      if (!author) {
        throw new NotFoundException('Author not found');
      }
      author.name = dto.name ?? author.name;
      author.birthDate = dto.birthDate ?? author.birthDate;
      const updateBooks = dto.books.map((book) => {
        if (book.id) {
          const existingBook = author.books.find((b) => b.id === book.id);
          if (existingBook) {
            return {...existingBook, ...book};
          }
          return this.bookRepository.create({...updateBooks, author});
        }
      })
      author.books = updateBooks;
      await this.authorsRepository.save(author);
      return {
        message: 'Author updated successfully',
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: number) {
    try {
      const author = await this.authorsRepository.findOneBy({ id: id });
      if (!author) {
        throw new NotFoundException('Author not found');
      }
      await this.authorsRepository.delete({
        id: id,
      });
      return {
        message: 'Author deleted successfully',
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
