import { ApolloDriver } from '@nestjs/apollo';
import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GlossariesModule } from './modules/glossaries/glossaries.module';
import { Glossary } from './modules/glossaries/glossary.entity';
import { Notification } from './modules/notifications/notification.entity';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { Patient } from './modules/patients/patient.entity';
import { PatientsModule } from './modules/patients/patients.module';
import { Provider } from './modules/providers/provider.entity';
import { ProvidersModule } from './modules/providers/providers.module';
import { Role } from './modules/roles/role.entity';
import { RolesModule } from './modules/roles/roles.module';
import { User } from './modules/users/user.entity';
import { UsersModule } from './modules/users/users.module';
import { GlossaryPatientStatus } from './modules/glossaries/glossary-patient-status.entity';
import { GlossaryUserTypeSetting } from './modules/glossaries/glossary-user-type-setting.entity';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [
        User,
        Role,
        Provider,
        Patient,
        Notification,
        Glossary,
        GlossaryPatientStatus,
        GlossaryUserTypeSetting,
      ],
      synchronize: true, // Till first release to QA this field value is going to be true
    }),
    // TypeOrmModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) => {
    //     return {
    //       type: 'postgres',
    //       host: config.get<string>('DB_HOST'),
    //       port: config.get<number>('DB_PORT'),
    //       username: config.get<string>('DB_USERNAME'),
    //       password: config.get<string>('DB_PASSWORD'),
    //       database: config.get<string>('DB_NAME'),
    //       entities: [
    //         User,
    //         Role,
    //         Provider,
    //         Patient,
    //         Notification,
    //         Glossary,
    //         GlossaryPatientStatus,
    //         GlossaryUserTypeSetting,
    //       ],
    //       autoLoadEntities: true,
    //       synchronize: true,
    //     };
    //   },
    // }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      // cors: {
      //   origin: 'http://localhost:5001',
      //   credentials: false,
      // },
    }),
    GlossariesModule,
    UsersModule,
    RolesModule,
    ProvidersModule,
    PatientsModule,
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {}
