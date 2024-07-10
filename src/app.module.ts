import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import "reflect-metadata";



@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true, // Rendre le ConfigModule global
  }),TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
      type: 'postgres',
      host: configService.get('DB_HOST'),
      port: +configService.get('DB_PORT'),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_DATABASE'),
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
      retryAttempts: 10,
      retryDelay: 5000,
      autoLoadEntities: false,
    }),
    inject: [ConfigService],
  }), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
