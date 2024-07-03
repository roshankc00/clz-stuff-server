import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { BroadcastService } from './broadcast.service';
import { Server, Socket } from 'socket.io';
import { JoinRoomDto } from './dto/joinRoomDto';
@WebSocketGateway({
  cors: '*',
})
export class BroadcastGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  constructor(private readonly broadcastService: BroadcastService) {}

  handleConnection(client: Socket, ...args: any[]) {
    console.log('User connected');
  }
  handleDisconnect(client: Socket, ...args: any[]) {
    console.log('User disconnected');
  }
  @SubscribeMessage('join_room')
  async handleJoinRoom(
    @MessageBody() { userId }: JoinRoomDto,
    @ConnectedSocket() socket: Socket,
  ): Promise<void> {
    socket.join(`chat-${userId}`);
    this.server
      .to(`brodcast-${userId}`)
      .emit('user_joined', { userId, id: socket.id });
  }

  @SubscribeMessage('start_detecting-motion')
  async startDetecting(
    @MessageBody()
    { userId }: { userId: number },
    @ConnectedSocket() socket: Socket,
  ) {
    this.server
      .to(`brodcast-${userId}`)
      .emit('checkDetection', { isMotionDetected: false });
  }

  @SubscribeMessage('detected-motion')
  async motionDetected(
    @MessageBody()
    { userId }: { userId: number },
    @ConnectedSocket() socket: Socket,
  ) {
    this.server
      .to(`brodcast-${userId}`)
      .emit('checkDetection', { isMotionDetected: true });
  }
}
