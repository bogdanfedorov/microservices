import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import schedule from 'node-schedule'
import { Transport } from './interfaces'
import BasicTransport from './BasicTransport'
import MessageConstructor from './messageConstructor'
import { AppointmentApiURL, DoctorApiURL, UserApiURL } from '../config'
import axios from 'axios'
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
  public async createSchedule(body) {
    let user, doctor, appointment
    try {
      ;[user, doctor, appointment] = await Promise.all([
        axios.get(`${UserApiURL}/user/${body.user}`),
        axios.get(`${DoctorApiURL}/doctor/${body.doctor}`),
        axios.get(`${AppointmentApiURL}/appointment/${body.appointment}`),
      ])
    } catch (e) {
      this.errorHandler.axiosError(e)
    }

    const reminderInTwoHours = dayjs(body.date).subtract(2, 'hours').toDate()
    schedule.scheduleJob(reminderInTwoHours, async () => {
      try {
        await this.transporter.send(
          this.messageConstructor.sourceTwoHoursBefore(user, doctor, appointment),
        )
      } catch (e) {
        this.errorHandler.axiosError(e)
      }

      /**
       * TODO: update appointment status
       */
    })

    const reminderInDay = dayjs(body.date).subtract(1, 'day').toDate()
    schedule.scheduleJob(reminderInDay, async () => {
      try {
        await this.transporter.send(
          this.messageConstructor.sourceTwoHoursBefore(user, doctor, appointment),
        )
      } catch (e) {
        this.errorHandler.axiosError(e)
      }

      /**
       * TODO: update appointment status
       */
    })
  }
}
