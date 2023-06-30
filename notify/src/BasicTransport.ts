import { Transport } from './interfaces'

export default class BasicTransport implements Transport {
  public async send(message: string): Promise<void> {
    console.log(message)
  }
}
