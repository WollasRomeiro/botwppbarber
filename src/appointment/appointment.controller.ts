// src/appointment/appointment.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AppointmentService } from './appointment.service';

@Controller('appointment') // Rota base
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post('schedule') // Rota específica
  async scheduleAppointment(@Body() body: { customerName: string; service: string; dateTime: Date }) {
    return this.appointmentService.createAppointment(body.customerName, body.service, body.dateTime);
  }
}
