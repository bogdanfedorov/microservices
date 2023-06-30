import axios from 'axios'
import { NotifyApiURL } from '../config'
import { Event } from './enums'
import { CreateAppointmentDTO, createRedirectionDTO } from './dtos'
import ErrorHandler from '../helpers/errorHandler'
import { EventSwitcher } from './iterfaces'

export default class ManagerController {
  private readonly errorHandler: ErrorHandler
  constructor() {
    this.errorHandler = new ErrorHandler('ManagerController')
  }

  public async createRedirection(body: createRedirectionDTO) {
    const eventSwitcher: EventSwitcher = {
      [Event.CreateAppointment]: async (data: CreateAppointmentDTO) => {
        await axios.post(`${NotifyApiURL}/deferredNotification`, data)
      },
    }

    try {
      await eventSwitcher[body.event](body.data)
    } catch (e) {
      this.errorHandler.axiosError(e)
    }
  }
}
