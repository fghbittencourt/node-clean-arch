import express from 'express';
import os from 'os';
import { container } from 'tsyringe';
import App from '../infrastructure/base/api/app';
import Logger from '../infrastructure/log/logger';
import bootstrapper from './bootstrapper';
import routes from './router';

export default class WebApp implements App {
  constructor(appName: string, startListening = true) {
    this.#startListening = startListening;
    this.#appName = appName;
  }

  #appName: string;

  #startListening: boolean;

  #expressApp!: express.Application;

  public get getApp(): unknown {
    return this.#expressApp;
  }

  start = async (): Promise<void> => {
    await bootstrapper(container);

    await this.#proceedInitialization();
  };

  #listen = async (): Promise<void> => {
    const port = process.env.APP_PORT || 4500;

    this.#expressApp.listen(port, async () => {
      Logger.info(
        `App ${this.#appName} listening on http://${os.hostname}:${port} 🤟🤟🤟`
      );
    });
  };

  #proceedInitialization = async (): Promise<void> => {
    this.#expressApp = express();
    this.#expressApp.use(express.json());
    this.#expressApp.use(await routes());

    if (this.#startListening) await this.#listen();
  };
}
