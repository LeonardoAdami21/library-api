import { Module } from '@nestjs/common';
import { databaseProviders } from './config/database.provider';
import { ConfigModule } from '@nestjs/config';
import { AuthorsModule } from './authors/authors.module';
import { BooksModule } from './books/books.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthorsModule, BooksModule],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class AppModule {}
