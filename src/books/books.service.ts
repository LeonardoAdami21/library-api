import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { AuthorsService } from '../authors/authors.service';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
    @Inject(forwardRef(() => AuthorsService))
    private readonly authorsService: AuthorsService,
  ) {}

  async create(dto: CreateBookDto) {
    try {
      const { title, description, publicationDate } = dto;
      if (!title || !description || !publicationDate) {
        throw new BadRequestException(
          'title, description and publicationDate are required',
        );
      }

      const author = await this.authorsService.findOne(dto.authorId);
      if (!author) {
        throw new NotFoundException('Author not found');
      }

      const book = this.bookRepository.create({
        title,
        description,
        publicationDate,
        authors: {
          id: author.id,
        },
      });
      await this.bookRepository.save(book);
      return book;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll() {
    try {
      const books = await this.bookRepository.find({
        relations: ['authors'],
      });
      return books;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id: number) {
    try {
      const book = await this.bookRepository.findOne({
        where: { id: id },
        relations: ['authors'],
      });
      if (!book) {
        throw new NotFoundException('Book not found');
      }
      return book;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: number, dto: UpdateBookDto) {
    const { title, description, publicationDate, authorId } = dto;
    if (!title || !description || !publicationDate) {
      throw new BadRequestException(
        'title, description and publicationDate are required',
      );
    }
    const book = await this.bookRepository.findOneBy({ id: id });
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    await this.bookRepository.update(id, {
      title,
      description,
      publicationDate,
      authors: {
        id: authorId,
      },
    });
    return {
      message: 'Book updated successfully',
    };
  }

  async remove(id: number) {
    try {
      const book = await this.bookRepository.findOneBy({ id: id });
      if (!book) {
        throw new NotFoundException('Book not found');
      }
      await this.bookRepository.delete({
        id: id,
      });
      return {
        message: 'Book deleted successfully',
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
