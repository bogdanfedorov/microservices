import { Schema, model } from 'mongoose'

interface IAppointment {
  /**
   * @format uuid
   */
  userId: string
  /**
   * @format uuid
   */
  doctorId: string
  /**
   * @format date-time
   */
  timeStart: Date
  /**
   * @format date-time
   */
  timeEnd: Date
}

const appointmentSchema = new Schema<IAppointment>(
  {
    userId: { type: String, required: true },
    doctorId: { type: String, required: true },
    timeStart: { type: Date, required: true },
    timeEnd: { type: Date, required: true },
  },
  { timestamps: true, versionKey: false },
)

const Appointment = model<IAppointment>('Appointment', appointmentSchema)

export { IAppointment, Appointment }
