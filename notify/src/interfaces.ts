export interface Transport {
  // eslint-disable-next-line no-unused-vars
  send: (message: string) => Promise<void>
}

export interface CreateScheduleDTO {
  message: string
  sendAt: Date
}
