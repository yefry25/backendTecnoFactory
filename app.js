import Server from './model/server.js';
import 'dotenv/config';

const server = new Server();
server.escuchar();