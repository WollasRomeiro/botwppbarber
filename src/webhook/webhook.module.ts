import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebhookController } from './webhook.controller'; // Importando o controlador
import { Appointment } from 'src/appointment/appointment.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Appointment])],
  controllers: [WebhookController], // Registrando o controlador
})
export class AppModule {
  constructor() {
    console.log('AppModule inicializado');
  }
}

