import typia, { Primitive } from 'typia'
import ErrorHandler from '../helpers/errorHandler'
import { IDoctor } from './model'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export default class DoctorController {
  private readonly errorHandler: ErrorHandler

  constructor() {
    this.errorHandler = new ErrorHandler('AppointmentController')
  }

  public async getById(id: string) {
    const doctor: Primitive<IDoctor> = typia.random<IDoctor>()
    doctor.id = id

    return doctor
  }
}
