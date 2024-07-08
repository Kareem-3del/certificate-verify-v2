import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DATABASE_URL'),
        applicationName: 'Certification API',
        autoLoadEntities: true,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
        autoSave: true,
        logging: true,
        logger: 'simple-console',
        logNotifications: true,

        /*
         // Only For SSL Connection
          ssl: true,
            extra: {
               ssl: {
                       rejectUnauthorized: false
               }
           },

         */
      }),
    }),
  ],
})
export class DatabaseModule {}
