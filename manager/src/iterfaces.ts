import { ExternalBodyDTO } from './dtos'

export type EventSwitcher = { [key: string]: (data: ExternalBodyDTO) => Promise<void> }
