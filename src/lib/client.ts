import { Client, Options } from 'tmi.js';

export class TwitchMessenger {
  private static instance: Client;
  constructor() {}
  public static getInstance() {
    if (!TwitchMessenger.instance) {
      const opts: Options = {
        identity: {},
        connection: {
          reconnect: true,
          secure: true,
        },
        channels: [],
      };
      TwitchMessenger.instance = new Client(opts);
    }
    return TwitchMessenger.instance;
  }
}
