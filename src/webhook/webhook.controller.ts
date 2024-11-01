import { Controller, Post, Body } from '@nestjs/common';
import { Twilio } from 'twilio';

const twilioClient = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

@Controller('webhook')
export class WebhookController {
  constructor() {
    console.log('WebhookController inicializado');
  }
  
  @Post('whatsapp')
  async handleWhatsAppMessage(@Body() body: any) {
    // Logando o corpo da mensagem recebida
    console.log('Webhook chamado:', JSON.stringify(body, null, 2));
    
    const messageType = body?.messages?.[0]?.type;
    const clientNumber = body?.messages?.[0]?.from;

    if (!clientNumber) {
      console.error('Número do cliente não encontrado.');
      return;
    }

    if (messageType === 'interactive') {
      const serviceId = body.messages[0].interactive.button_id;
      await this.handleServiceSelection(serviceId, clientNumber);
    } else if (messageType === 'text') {
      await this.sendInteractiveMessage(clientNumber);
    } else {
      console.warn('Tipo de mensagem não reconhecido:', messageType);
    }
  }

  async handleServiceSelection(serviceId: string, clientNumber: string) {
    const serviceNames = {
      corte: 'Corte',
      barba: 'Barba',
      corte_barba: 'Corte + Barba',
      sobrancelha: 'Sobrancelha',
    };

    const selectedService = serviceNames[serviceId];
    const followUpMessage = `Você escolheu ${selectedService}. Por favor, informe seu nome e o horário que deseja agendar.`;

    console.log('Enviando mensagem de acompanhamento para:', clientNumber);
    await this.sendWhatsAppMessage(clientNumber, followUpMessage);
  }

  async sendWhatsAppMessage(clientNumber: string, message: string) {
    try {
      await twilioClient.messages.create({
        from: 'whatsapp:+558388599515',
        to: `whatsapp:${clientNumber}`,
        body: message,
      });
      console.log('Mensagem enviada:', message);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    }
  }

  async sendInteractiveMessage(clientNumber: string) {
    const interactiveMessage = "Por favor, escolha um serviço:\n1. Corte\n2. Barba\n3. Corte + Barba\n4. Sobrancelha";
    console.log('Enviando mensagem interativa para:', clientNumber);
    await this.sendWhatsAppMessage(clientNumber, interactiveMessage);
  }
}
