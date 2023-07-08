import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import schedule from 'node-schedule'
import { Transport, CreateScheduleDTO } from './interfaces'
import BasicTransport from './BasicTransport'
import MessageConstructor from '../../appointment/src/messageConstructor'
import ErrorHandler from '../helpers/errorHandler'

dayjs.extend(utc)

export default class NotifyController {
  private readonly transporter: Transport
  private readonly messageConstructor: MessageConstructor
  private readonly errorHandler: ErrorHandler

  constructor() {
    this.transporter = new BasicTransport()
    this.messageConstructor = new MessageConstructor()
  }

  public async createSchedule(body: CreateScheduleDTO) {
    schedule.scheduleJob(body.sendAt, async () => {
      try {
        await this.transporter.send(body.message)
      } catch (e) {
        this.errorHandler.axiosError(e)
      }
    })

    return 'Success'
  }
}
