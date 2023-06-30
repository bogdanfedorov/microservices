import IUser from './externalModels/user'
import IDoctor from './externalModels/doctor'
import IAppointment from './externalModels/apointment'
import dayjs, { Dayjs } from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

export default class MessageConstructor {
  public sourceOneDayBefore(user: IUser, doctor: IDoctor, appointment: IAppointment) {
    const time = this.userTimeView(appointment.timeStart, user.timezone)
    return `Hello, ${user.name}! Remember that you have an appointment to ${doctor.speciality} tomorrow at ${time}!`
  }

  public sourceTwoHoursBefore(user: IUser, doctor: IDoctor, appointment: IAppointment) {
    const time = this.userTimeView(appointment.timeStart, user.timezone)
    return `Hello ${user.name}! You have an appointment to ${doctor.speciality} in 2 hours at ${time}!`
  }

  private userTimeView(
    date: string | number | Date | Dayjs | null | undefined,
    userTimezone: string,
  ) {
    return dayjs.tz(date, userTimezone).format('HH:mm')
  }
}
