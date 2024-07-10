import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import "reflect-metadata";



@Module({
  imports: [
    // Configure TypeORM for database connection using environment variables
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],// Import ConfigModule to access environment variables
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        synchronize: true, // Automatically sync the database schema (disable in production)
        entities: [__dirname + '/**/*.entity{.ts,.js}'], // Path to the entities
      }),
      inject: [ConfigService],// Inject ConfigService to access environment variables
    }),
  UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
