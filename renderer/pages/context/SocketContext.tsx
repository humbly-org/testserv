import { createContext } from 'react';
import net from 'net';

export const socket = net.connect({ host: 'localhost', port: 3322 });
export const SocketContext = createContext(null);
