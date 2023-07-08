import * as process from 'process'

export const Port = process.env.PORT || 4000

export const DbName = process.env.DB_NAME || 'appointment'
export const MongodbConnectionUrl = `${
  process.env.MONGODB_CONNECTION_URL || 'mongodb://localhost:27017'
}/${DbName}`

export const DoctorsApiURL = process.env.DOCTOR_API_URL || 'http://localhost:4001'
export const UserApiURL = process.env.USER_API_URL || 'http://localhost:4004'
export const NotifyApiURL = process.env.NOTIFY_API_URL || 'http://localhost:4002'
export const DayjsWeekdaysConfig = {
  weekdays: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
}
