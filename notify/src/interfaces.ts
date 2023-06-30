export interface Transport {
  send: (message: string) => Promise<void>
}
