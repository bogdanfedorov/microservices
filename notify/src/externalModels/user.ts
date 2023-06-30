export default interface IUser {
  /**
   * @format uuid
   */
  id: string
  /**
   * @minLength 5
   * @maxLength 20
   */
  phone: string
  name: string
  timezone: string
}
