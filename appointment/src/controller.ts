import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import updateLocale from 'dayjs/plugin/updateLocale'
import { Appointment, IAppointment } from './model'
import ErrorHandler from '../helpers/errorHandler'
import { DayjsWeekdaysConfig, DoctorsApiURL, NotifyApiURL, UserApiURL } from '../config'
import { CheckAppointmentAvailability, CreateAppointmentDto, FilterAppointment } from './interfaces'
import typia from 'typia'
import axios from 'axios'
import { IDoctor } from './externalModels/doctor'
import { IUser } from './externalModels/user'
import MessageConstructor from './messageConstructor'

dayjs.extend(utc)
dayjs.extend(updateLocale)

dayjs.updateLocale('en', DayjsWeekdaysConfig)

export default class AppointmentController {
  private readonly errorHandler: ErrorHandler
  private readonly messageConstructor: MessageConstructor

  constructor() {
    this.errorHandler = new ErrorHandler('AppointmentController')
    this.messageConstructor = new MessageConstructor()
  }
  public async create(body: CreateAppointmentDto) {
    const validate = typia.validate<CreateAppointmentDto>(body)
    if (!validate.success) {
      throw new Error(JSON.stringify(validate.errors))
    }

    const appointment = {
      userId: body.userId,
      doctorId: body.doctorId,
      timeStart: dayjs(body.time).utc().toDate(),
      timeEnd: dayjs(body.time).add(body.duration, 'milliseconds').utc().toDate(),
    }

    const isAppointmentAvailable = this.checkAppointmentAvailability({
      doctorId: appointment.doctorId,
      timeStart: appointment.timeStart,
      timeEnd: appointment.timeEnd,
    })

    if (!isAppointmentAvailable) {
      throw new Error('Error: This time is already taken.')
    }

    let savedAppointment
    try {
      savedAppointment = await Appointment.create(appointment)
    } catch (e) {
      this.errorHandler.dbError(e)
    }

    let doctor: IDoctor | undefined
    try {
      const doctorRes = await axios.get<IDoctor>(`${DoctorsApiURL}/doctors/${body.doctorId}`)
      doctor = doctorRes.data
    } catch (e) {
      this.errorHandler.axiosError(e)
    }

    let user: IUser | undefined
    try {
      const userRes = await axios.get<IUser>(`${UserApiURL}/user/${body.userId}`)
      user = userRes.data
    } catch (e) {
      this.errorHandler.axiosError(e)
    }

    if (user && doctor) {
      await this.createDeferredNotifications(user, doctor, appointment)
    }

    return savedAppointment
  }

  private async createDeferredNotifications(
    user: IUser,
    doctor: IDoctor,
    appointment: IAppointment,
  ) {
    const reminderInTwoHours = dayjs(appointment.timeStart).subtract(2, 'hours').toDate()
    const messageTwoHoursBefore = this.messageConstructor.sourceTwoHoursBefore(
      user,
      doctor,
      appointment,
    )
    try {
      await axios.post(`${NotifyApiURL}/deferredNotification`, {
        message: messageTwoHoursBefore,
        sendAt: reminderInTwoHours,
      })
    } catch (e) {
      this.errorHandler.dbError(e)
    }

    const reminderInDay = dayjs(appointment.timeStart).subtract(1, 'day').toDate()
    const messageOneDayBefore = this.messageConstructor.sourceOneDayBefore(
      user,
      doctor,
      appointment,
    )
    try {
      await axios.post(`${NotifyApiURL}/deferredNotification`, {
        message: reminderInDay,
        sendAt: messageOneDayBefore,
      })
    } catch (e) {
      this.errorHandler.dbError(e)
    }
  }

  public async getByFilter(filters: FilterAppointment) {
    let appointments: IArguments[] = []
    try {
      appointments = await Appointment.find(filters)
    } catch (e) {
      this.errorHandler.dbError(e)
    }

    return appointments
  }

  public async checkAppointmentAvailability(filters: CheckAppointmentAvailability) {
    let count = 0
    try {
      count = await Appointment.count({
        doctorId: filters.doctorId,
        timeStart: { $gte: filters.timeStart },
        timeEnd: { $lte: filters.timeEnd },
      })
    } catch (e) {
      this.errorHandler.dbError(e)
    }

    return count <= 0

    /**
     * I implemented but did not use the check if the doctor is really working at this time.
     */
    // let doctor: AxiosResponse<IDoctor>
    // try {
    //   doctor = await axios.get<IDoctor>(`${DoctorsApiURL}/doctors/${filters.doctorId}`)
    // } catch (e) {
    //   this.errorHandler.axiosError(e)
    // }
    //
    // if (!doctor.data) {
    //   return false
    // }
    //
    // const dayAtWeek = dayjs(filters.timeStart).utc().format('dddd')
    // return doctor.data.workingHours[dayAtWeek].reduce((isWorked, time) => {
    //   const timeStart = dayjs(time.from).utc().toDate()
    //   const timeEnd = dayjs(time.to).utc().toDate()
    //   if ((filters.timeStart >= timeStart && filters.timeEnd <= timeEnd) || !isWorked) {
    //     return false
    //   }
    // }, true)
  }
}
