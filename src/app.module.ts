import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Appointment } from './appointment/appointment.entity';
import { AppointmentService } from './appointment/appointment.service';
import { AppointmentController } from './appointment/appointment.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Appointment],
      synchronize: true,
      ssl: {
        rejectUnauthorized: false, 
      },
    }),
    TypeOrmModule.forFeature([Appointment]),
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService],
})
export class AppModule {}






