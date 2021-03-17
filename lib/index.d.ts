/// <reference types="node" />
import EventEmitter from 'events';
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
export declare type StatefulPromise<T> = Promise<T> & IPromiseStates;
export default class TendermintWS extends EventEmitter {
    url: string;
    connected: boolean;
    closed: boolean;
    private timeout;
    private socket;
    private autoReconnect;
    private isAlive;
    private subscriptions;
    private calls;
    private connectPromise;
    private resolveConnect;
    private rejectConnect;
    private waitForConnection;
    private monitor;
    private reconnecting;
    private callId;
    constructor({ server, timeout, autoReconnect }?: IConfig);
    connect(): Promise<TendermintWS>;
    onMessage(message: MessageEvent): void;
    onOpen(): void;
    onError(error: string): void;
    onClose(): void;
    close(): Promise<void>;
    heartbeat(): void;
    noop(): void;
}
