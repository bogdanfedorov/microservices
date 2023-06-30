import { Event } from './enums'
export interface CreateAppointmentDTO {
  userId: string
  doctorId: string
  time: string
}

export type ExternalBodyDTO = CreateAppointmentDTO

export interface createRedirectionDTO {
  event: Event
  data: ExternalBodyDTO
}
