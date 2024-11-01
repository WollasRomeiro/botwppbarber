// src/appointment/appointment.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './appointment.entity';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
  ) {}

  async createAppointment(customerName: string, service: string, dateTime: Date) {
    const existingAppointment = await this.appointmentRepository.findOne({
      where: { dateTime },
    });

    if (existingAppointment) {
      return { success: false, message: 'Horário já está ocupado!' };
    }

    const appointment = this.appointmentRepository.create({
      customerName,
      service,
      dateTime,
    });

    await this.appointmentRepository.save(appointment);
    return { success: true, appointment };
  }
}
