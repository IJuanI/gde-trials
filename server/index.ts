import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

import { authRouter, storageRouter, rankingsRouter } from './routes';
import { init } from './sql';

dotenv.config();
init();

class Server {
  public app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.angular();
  }
  public config(): void {
    this.app.set('port', process.env.PORT || 8080);
    this.app.use(cors());
    // this.app.use(morgan('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.get(process.env.STORAGE, express.static('storage'));
  }
  public angular(): void {
    this.app.get('/*', express.static(__dirname + '/client/'));
    const indexPath = __dirname + '/client/index.html';
    this.app.get('/*', (_, res) => res.sendFile(indexPath));
  }
  public routes(): void {
    this.app.use('/api/auth', authRouter);
    this.app.use('/api/rankings', rankingsRouter);
    this.app.use(process.env.STORAGE, storageRouter);
  }
  public start(): void {
    this.app.listen(this.app.get('port'), () => console.log('Server started at port ', this.app.get('port')));
  }
}

const server = new Server();
server.start();
