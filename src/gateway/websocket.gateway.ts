import { OnEvent } from '@nestjs/event-emitter';
import {
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000'],
  },
})
export class MessagingGateway implements OnGatewayConnection {
  handleConnection(client: Socket, ...args: any[]) {
    console.log(client.id);
    client.emit('connected', { status: 'good' });
  }
  @WebSocketServer()
  server: Server;
  @SubscribeMessage('createMessage')
  handleCreateMessage(@MessageBody() data: any) {
    console.log('Create Message');
  }
  @OnEvent('message.create')
  handleMessageCreateEvent(payload: any) {
    console.log('Inside message.create');
    console.log(payload, 'payload');
    this.server.emit('onMessage', payload);
  }
}
