import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import updateLocale from 'dayjs/plugin/updateLocale'
import { Appointment } from './model'
import ErrorHandler from '../helpers/errorHandler'
import { DayjsWeekdaysConfig, ManagerApiURL } from '../config'
import { CheckAppointmentAvailability, CreateAppointmentDto, FilterAppointment } from './interfaces'
import typia from 'typia'
import axios from 'axios'

dayjs.extend(utc)
dayjs.extend(updateLocale)

dayjs.updateLocale('en', DayjsWeekdaysConfig)

export default class AppointmentController {
  private readonly errorHandler: ErrorHandler
  constructor() {
    this.errorHandler = new ErrorHandler('AppointmentController')
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

    try {
      await axios.post(`${ManagerApiURL}/event`, {
        event: 'CreateAppointment',
        data: {
          userId: appointment.userId,
          doctorId: appointment.doctorId,
          time: appointment.timeStart,
        },
      })
    } catch (e) {
      this.errorHandler.axiosError(e)
    }

    return Appointment.create(appointment)
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

    if (count > 0) {
      return false
    }

    return true
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
