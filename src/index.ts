import WebSocket from 'isomorphic-ws';
import EventEmitter from 'events';
const SOCKET_DEBUG = false;
export interface ISubscription {
  callback: string;
}
export interface ICall {
  date: number;
  resolve: (value?: unknown | PromiseLike<unknown>) => void;
  reject: (reason?: Error) => void;
}
export interface IConfig {
  server: string;
  timeout: number;
  autoReconnect: boolean;
}
export interface IPromiseStates {
  state?: 'pending' | 'fulfilled';
}
export type StatefulPromise<T> = Promise<T> & IPromiseStates;

export default class TendermintWS extends EventEmitter {
  public url: string;
  public connected: boolean;
  public closed: boolean;
  private timeout: number;
  private socket: WebSocket;
  private autoReconnect: boolean;
  private isAlive: boolean;
  private subscriptions: Map<number, ISubscription>;
  private calls: Map<number, ICall>;
  private connectPromise: StatefulPromise<TendermintWS> | null;
  private resolveConnect: (value?: TendermintWS | PromiseLike<TendermintWS>) => void;
  private rejectConnect: (reason?: string) => void;
  private waitForConnection: ReturnType<typeof setTimeout>;
  private monitor: ReturnType<typeof setInterval>;
  private reconnecting: boolean;
  private callId: number;

  constructor(
    { server, timeout, autoReconnect }: IConfig = {
      server: 'wss://rpc.cosmos.network/websocket',
      timeout: 15000,
      autoReconnect: true,
    },
  ) {
    super();
    this.url = server;
    this.connected = false;
    this.closed = false;
    this.autoReconnect = autoReconnect;
    this.timeout = timeout;
    this.isAlive = false;
    this.subscriptions = new Map();
    this.connectPromise = null;
    this.calls = new Map();

    return this;
  }

  async connect():Promise<TendermintWS> {
    if (this.connectPromise !== null) {
      if (this.connectPromise.state == 'pending') {
        // If already waiting to connect, do not reattempt;
        return this.connectPromise;
      }

      if (this.connectPromise.state == 'fulfilled') {
        // If already connected in the past
        if (this.connected) {
          // If currently connected, just return
          return this.connectPromise;
        } else {
          // If disconnected, try again

          this.connectPromise = new Promise((res, rej) => {
            this.resolveConnect = res;
            this.rejectConnect = rej;
          });
          this.connectPromise.state = 'pending';
        }
      }
    } else {
      // First connection
      this.connectPromise = new Promise((res, rej) => {
        this.resolveConnect = res;
        this.rejectConnect = rej;
      });

      this.connectPromise.state = 'pending';
    }
    try {
      // Start Timeout
      this.waitForConnection = setTimeout(() => {
        this.connectPromise.state = 'fulfilled';
        this.rejectConnect('Connection timed out');
      }, this.timeout);
      this.socket = new WebSocket(this.url);
      this.socket.onopen = this.onOpen.bind(this);
      this.socket.onerror = this.onError.bind(this);
      this.socket.onmessage = this.onMessage.bind(this);
      this.socket.onclose = this.onClose.bind(this);
      this.socket.on('pong', this.heartbeat.bind(this));
      return this.connectPromise;
    } catch (e) {
      this.socket = {
        readyState: 3,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        close: () => {},
      };
      this.connectPromise.state = 'fulfilled';
      this.rejectConnect('Invalid URL: ' + this.url);
    }
  }

	onMessage(message:MessageEvent):void {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const response:any=JSON.parse(message.data);
		console.log(response);
		if (SOCKET_DEBUG) {
				console.log("CWS-Debug: <<< "+JSON.stringify(response));
		}
	}

  onOpen(): void {
    clearTimeout(this.waitForConnection);
    this.emit('status', { state: 'connected', data: this.url });
    if (this.reconnecting) {
      this.emit('status', { state: 'reconnected', data: this.url });
      this.reconnecting = false;
    }
    this.isAlive = true;
    this.monitor = setInterval(() => {
      if (this.isAlive === false) {
        this.emit('status', { state: 'disconnected', data: 'Keep-alive timed out' });
        // Clean close connectioon
        this.onClose();
      }
      this.socket.ping(this.noop.bind(this));
    }, 5000);
    this.calls = new Map();
    this.callId = 0;
    this.connectPromise.state = 'fulfilled';
    this.resolveConnect(this);
  }

  onError(error:string): void {
    if (this.monitor) {
      clearInterval(this.monitor);
      this.monitor = undefined;
    }
    clearTimeout(this.waitForConnection);
    this.emit('status', { state: 'error', data: error });

    this.connectPromise.state = 'fulfilled';
    this.rejectConnect(error);
  }

  onClose(): void {
    this.closed = true;
    this.connected = false;
    if (this.monitor) {
      clearInterval(this.monitor);
      this.monitor = undefined;
    }
    for (const [, call] of this.calls) {
      call.reject(new Error('connection closed'));
    }
    this.emit('status', { state: 'closed', data: null });
    if (this.autoReconnect) {
      setTimeout(() => {
        this.reconnecting = true;
        try {
          this.connect();
        } catch (e) {
          this.emit('status', { state: 'error', data: e });
        }
      }, 1000);
    }
  }
  close(): Promise<void> {
    return new Promise((res) => {
      clearInterval(this.monitor);
      this.monitor = undefined;
      if (!this.socket) {
        console.log('Websocket already cleared', this);
        return res();
      }

      if (this.socket.terminate) {
        this.socket.terminate();
      } else {
        this.socket.close();
      }

      if (this.socket.readyState === 3) res();
    });
  }
  heartbeat(): void {
    if (SOCKET_DEBUG) {
      console.log('CWS-Debug: <<< PONG');
    }
    this.isAlive = true;
  }

  noop(): void {
    if (SOCKET_DEBUG) {
      console.log('CWS-Debug: >>> PING');
    }
  }
}
