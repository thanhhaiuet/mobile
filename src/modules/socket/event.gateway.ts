import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

const namespace = 'chat';
@WebSocketGateway({
	pingInterval: 10000,
	pingTimeout: 2000,
	namespace,
	cors: {
		origin: '*',

		methods: ['GET', 'POST', 'OPTIONS'],

		allowedHeaders: ['Authorization'],

		credentials: true,

		optionsSuccessStatus: 200,
	},
})
export class EventGateWay {
	@WebSocketServer() server;

	@SubscribeMessage('message')
	handleMessage(@MessageBody() message: string): void {
		this.server.emit('message', message);
	}
}
