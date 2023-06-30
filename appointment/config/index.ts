export const Port = process.env.PORT || 4000

export const DbName = process.env.DB_NAME || 'appointment'
export const MongodbConnectionUrl = `${
  process.env.MONGODB_CONNECTION_URL || 'mongodb://localhost:27017'
}/${DbName}`

export const DoctorsApiURL = process.env.DOCTOR_API_URL || 'http://localhost:4001'
export const ManagerApiURL = process.env.MANAGER_API_URL || 'http://localhost:4003'
export const DayjsWeekdaysConfig = {
  weekdays: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
}
