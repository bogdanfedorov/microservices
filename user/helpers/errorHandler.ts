export default class ErrorHandler {
  private readonly className: string
  constructor(className: string) {
    this.className = className
  }

  dbError(error) {
    console.error(`:${this.className}:DBError: `, error)
  }

  axiosError(error) {
    console.error(`:${this.className}:HttpError: `, error)
  }
}
