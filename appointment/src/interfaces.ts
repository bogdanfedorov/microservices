export interface CreateAppointmentDto {
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
  time: string
  /**
   * @type uint
   * @minimum 1200000
   * @exclusiveMaximum 7200000
   */
  duration: number
}

export interface FilterAppointment {
  timeStart?: string
  timeEnd?: string
  doctorId?: string
}

export interface CheckAppointmentAvailability {
  timeStart: Date
  timeEnd: Date
  doctorId: string
}
