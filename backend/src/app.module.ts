import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PatientsModule } from './modules/patients/patients.module';
import { ReferencesModule } from './modules/references/references.module';
import { User } from './modules/users/user.entity';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User],
      synchronize: true, // Till first release to QA going to have this value as true
    }),
    // TypeOrmModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) => {
    //     return {
    //       type: 'postgres',
    //       host: config.get<string>('HOST'),
    //       port: config.get<number>('PORT'),
    //       username: config.get<string>('USERNAME'),
    //       password: config.get<string>('PASSWORD'),
    //       database: config.get<string>('DATABASE'),
    //       entities: [],
    //       autoLoadEntities: true,
    //       synchronize: true,
    //     };
    //   },
    // }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
    UsersModule,
    PatientsModule,
    ReferencesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
