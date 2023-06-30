export default interface IAppointment {
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
